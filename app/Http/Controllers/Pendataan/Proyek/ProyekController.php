<?php

namespace App\Http\Controllers\Pendataan\Proyek;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Http\Resources\Pendataan\ProyekKonstruksiCollection;
use App\Services\FileService;
use App\Services\Usaha\PendataanUsahaService;
use App\Services\Penyelenggaraan\PendataanProyekService;
use Illuminate\Http\Request;

class ProyekController extends Controller
{
    protected $fileService;
    protected $usahaService;
    protected $proyekService;

    public function __construct(
        FileService $fileService,
        PendataanUsahaService $usahaService,
        PendataanProyekService $proyekService
    ) {
        $this->fileService = $fileService;
        $this->usahaService = $usahaService;
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
        $daftarUsaha = $this->usahaService->getDaftarUsahaByJenisUsaha('Badan Usaha Jasa Konstruksi');

        Inertia::share('proyekId', fn (Request $request) => $request->session()->get('proyekId')
            ? $request->session()->get('proyekId') : null
        );

        return Inertia::render('Pendataan/Proyek/Create', [
            'data' => [
                'daftarUsaha' => $daftarUsaha,
            ],
        ]);
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

        return back()->with('proyekId', $proyekId);
    }

    public function storePenyediaJasa(string $id, Request $request)
    {
        if (!$this->proyekService->checkProyekKonstruksiExists($id)) {
            return back()->withErrors(['message' => 'Proyek Konstruksi tidak ditemukan.']);
        }

        $userId = auth()->user()->id;
        $penyediaJasaId = '';

        $request->session()->put('proyekId', $id);

        if ($request->filled('usahaId')) {
            if (!$this->usahaService->checkUsahaExists($request->input('usahaId'))) {
                return back()->withErrors(['message' => 'Usaha tidak ditemukan.']);
            }
            $penyediaJasaId = $request->input('usahaId');
        } else {
            $validatedData = $request->validate([
                'usaha'      => 'required',
                'nib'        => 'required',
                'dokumenNIB' => 'nullable|file|max:2048',
                'pjbu'       => 'required',
            ]);

            $dokumenNIB = $validatedData['dokumenNIB'] ?
            $this->fileService->addFile([
                'file'       => $validatedData['dokumenNIB'],
                'path'       => 'public/files/usaha/nib',
                'created_by' => $userId,
            ]) : null;

            $jenisUsaha = $this->usahaService->getJenisUsahaByJenisUsaha('Badan Usaha Jasa Konstruksi');

            $penyediaJasaId = $this->usahaService->addUsaha([
                'nama'           => $validatedData['usaha'],
                'nib'            => $validatedData['nib'],
                'dokumen_nib'    => $dokumenNIB,
                'pjbu'           => $validatedData['pjbu'],
                'alamat'         => $request->input('alamat'),
                'jenis_usaha_id' => $jenisUsaha->id,
                'created_by'     => $userId,
            ]);
        }

        $proyekId = $this->proyekService->addPenyediaJasaToProyekKonstruksi($id, $penyediaJasaId);

        return back();
    }

    public function storePenggunaJasa(string $id, Request $request)
    {
        if (!$this->proyekService->checkProyekKonstruksiExists($id)) {
            return back()->withErrors(['message' => 'Proyek Konstruksi tidak ditemukan.']);
        }

        $request->session()->put('proyekId', $id);

        $validatedData = $request->validate([
            'nama'            => 'required',
            'pelakuPengadaan' => 'required',
        ]);
        $userId = auth()->user()->id;

        $penggunaJasaId = $this->proyekService->addPenggunaJasa([
            'nama'             => $validatedData['nama'],
            'pelaku_pengadaan' => $validatedData['pelakuPengadaan'],
            'nip'              => $request->input('nip'),
            'jabatan'          => $request->input('jabatan'),
            'sk'               => $request->input('sk'),
            'instansi'         => $request->input('instansi'),
            'alamat'           => $request->input('alamat'),
            'created_by'       => $userId,
        ]);

        $this->proyekService->addPenggunaJasaToProyekKonstruksi($id, $penggunaJasaId);

        return redirect("/admin/pendataan/proyek");
    }
}
