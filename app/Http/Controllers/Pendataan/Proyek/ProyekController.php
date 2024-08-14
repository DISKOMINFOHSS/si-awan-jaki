<?php

namespace App\Http\Controllers\Pendataan\Proyek;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Http\Resources\Pendataan\ProyekKonstruksiCollection;
use App\Http\Resources\Pendataan\ProyekKonstruksiResource;
use App\Services\FileService;
use App\Services\Usaha\PendataanUsahaService;
use App\Services\Usaha\PendataanBUJKService;
use App\Services\Penyelenggaraan\PendataanProyekService;
use Illuminate\Http\Request;

class ProyekController extends Controller
{
    protected $usahaService;
    protected $fileService;
    protected $bujkService;
    protected $proyekService;

    public function __construct(
        PendataanUsahaService $usahaService,
        FileService $fileService,
        PendataanBUJKService $bujkService,
        PendataanProyekService $proyekService,
    ) {
        $this->usahaService = $usahaService;
        $this->fileService = $fileService;
        $this->bujkService = $bujkService;
        $this->proyekService = $proyekService;
    }

    public function index()
    {
        $daftarProyek = $this->proyekService->getDaftarProyekKonstruksi();

        return Inertia::render('Pendataan/Proyek/Index', [
            'data' => [
                'daftarProyek' => new ProyekKonstruksiCollection($daftarProyek),
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Pendataan/Proyek/Create');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'namaPaket'      => 'required',
            'sumberDana'     => 'required',
            'tanggalMulai'   => 'nullable|date',
            'tanggalSelesai' => 'nullable|date|after_or_equal:tanggalMulai',
            'tanggalKontrak' => 'nullable|date',
            'tahunAnggaran'  => 'nullable|digits:4',
            'nilaiKontrak'   => 'nullable|decimal:0,2',
            'nilaiPagu'      => 'nullable|decimal:0,2',
        ]);
        $userId = auth()->user()->id;

        $proyekId = $this->proyekService->addProyekKonstruksi([
            'nama_paket'          => $validatedData['namaPaket'],
            'nomor_kontrak'       => $request->input('nomorKontrak'),
            'sumber_dana'         => $validatedData['sumberDana'],
            'tahun_anggaran'      => $validatedData['tahunAnggaran'],
            'nilai_pagu'          => $validatedData['nilaiPagu'],
            'nilai_kontrak'       => $validatedData['nilaiKontrak'],
            'tanggal_kontrak'     => $validatedData['tanggalKontrak'],
            'mulai_pelaksanaan'   => $validatedData['tanggalMulai'],
            'selesai_pelaksanaan' => $validatedData['tanggalSelesai'],
            'created_by'          => $userId,
        ]);

        return redirect("/admin/pendataan/proyek-konstruksi/$proyekId/edit");
    }

    public function show(string $id)
    {
        $proyekKonstruksi = $this->proyekService->getProyekKonstruksiById($id);

        return Inertia::render('Pendataan/Proyek/Show', [
            'data' => [
                'proyekKonstruksi' => new ProyekKonstruksiResource($proyekKonstruksi),
            ],
        ]);
    }

    public function edit(string $id, Request $request)
    {
        $proyekKonstruksi = $this->proyekService->getProyekKonstruksiById($id);
        $daftarUsaha = $this->usahaService->getDaftarUsahaByJenisUsaha('Badan Usaha Jasa Konstruksi');

        return Inertia::render('Pendataan/Proyek/Edit', [
            'data' => [
                'proyekKonstruksi' => new ProyekKonstruksiResource($proyekKonstruksi),
                'daftarUsaha' => $daftarUsaha,
            ],
        ]);
    }

    public function update(string $id, Request $request)
    {
        if (!$this->proyekService->checkProyekKonstruksiExists($id))
        {
            return back()->withErrors(['message' => 'Proyek konstruksi tidak ditemukan.']);
        }

        $validatedData = $request->validate([
            'namaPaket'      => 'required',
            'sumberDana'     => 'required',
            'tanggalMulai'   => 'nullable|date',
            'tanggalSelesai' => 'nullable|date|after_or_equal:tanggalMulai',
            'tanggalKontrak' => 'nullable|date',
            'tahunAnggaran'  => 'nullable|digits:4',
            'nilaiKontrak'   => 'nullable|decimal:0,2',
            'nilaiPagu'      => 'nullable|decimal:0,2',
        ]);

        $this->proyekService->updateProyekKonstruksi(
            $id,
        [
            'nama_paket'          => $validatedData['namaPaket'],
            'nomor_kontrak'       => $request->input('nomorKontrak'),
            'sumber_dana'         => $validatedData['sumberDana'],
            'tahun_anggaran'      => $validatedData['tahunAnggaran'],
            'nilai_pagu'          => $validatedData['nilaiPagu'],
            'nilai_kontrak'       => $validatedData['nilaiKontrak'],
            'tanggal_kontrak'     => $validatedData['tanggalKontrak'],
            'mulai_pelaksanaan'   => $validatedData['tanggalMulai'],
            'selesai_pelaksanaan' => $validatedData['tanggalSelesai'],
        ]);

        return back();
    }

    public function storePenyediaJasa(string $id, Request $request)
    {
        if (!$this->proyekService->checkProyekKonstruksiExists($id))
        {
            return back()->withErrors(['message' => 'Proyek Konstruksi tidak ditemukan.']);
        }

        $userId = auth()->user()->id;
        $penyediaJasaId = '';

        if ($request->filled('usahaId'))
        {
            if (!$this->usahaService->checkUsahaExists($request->input('usahaId')))
            {
                return back()->withErrors(['message' => 'Usaha tidak ditemukan.']);
            }
            $penyediaJasaId = $request->input('usahaId');
        } else
        {
            $validatedData = $request->validate([
                'usaha'      => 'required',
                'nib'        => 'required',
                'dokumenNIB' => 'nullable|file|max:2048',
                'pjbu'       => 'required',
            ]);

            $dokumenNIB = $validatedData['dokumenNIB'] ? $this->fileService->addFile([
                'file'       => $validatedData['dokumenNIB'],
                'path'       => 'public/files/usaha/nib',
                'created_by' => $userId,
            ]) : null;

            $penyediaJasaId = $this->usahaService->addUsaha([
                'nama'           => $validatedData['usaha'],
                'nib'            => $validatedData['nib'],
                'dokumen_nib'    => $dokumenNIB,
                'pjbu'           => $validatedData['pjbu'],
                'alamat'         => $request->input('alamat'),
                'jenis_usaha_id' => $this->usahaService->getJenisUsahaByJenisUsaha('Badan Usaha Jasa Konstruksi')->id,
                'created_by'     => $userId,
            ]);
        }

        $oldPenyediaJasaId = $this->proyekService->getPenyediaJasaIdById($id);
        $proyekKonstruksi  = $this->proyekService->addPenyediaJasaToProyekKonstruksi($id, $penyediaJasaId);
        // dd($oldPenyediaJasaId, $penyediaJasaId);

        // jika null, tambah paket pakerjaan
        // jika old dan current berbeda, tambah paket pekerjaan di current, hapus di old

        if ($oldPenyediaJasaId !== $penyediaJasaId)
        {
            $paketPekerjaan = $this->bujkService->getPaketPekerjaanByNamaPaketAndUsahaId($proyekKonstruksi->nama_paket, $oldPenyediaJasaId);
            if (!$paketPekerjaan)
            {
                $this->bujkService->addPaketPekerjaan([
                    'nama_paket'           => $proyekKonstruksi->nama_paket,
                    'tahun_anggaran'       => $proyekKonstruksi->tahun_anggaran,
                    'jenis_usaha'          => '-',
                    'sifat_usaha'          => '-',
                    'subklasifikasi_usaha' => '-',
                    'layanan_usaha'        => '-',
                    'bentuk_usaha'         => '-',
                    'kualifikasi_usaha'    => '-',
                    'usaha_id'             => $penyediaJasaId,
                    'created_by'           => $userId,
                ]);
            } else
            {
                $this->bujkService->updateUsahaIdFromPaketPekerjaan($paketPekerjaan->id, $penyediaJasaId);
            }
        }

        return back();
    }
}
