<?php

namespace App\Http\Controllers\Pendataan\Usaha;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Http\Resources\Pendataan\BUJKResource;
use App\Http\Resources\Pendataan\UsahaResource;
use App\Services\FileService;
use App\Services\Usaha\PendataanBUJKService;
use App\Services\Usaha\PendataanUsahaService;
use Illuminate\Http\Request;

class BUJKController extends Controller
{
    protected $fileService;
    protected $usahaService;
    protected $bujkService;

    public function __construct(
        PendataanUsahaService $usahaService,
        FileService $fileService,
        PendataanBUJKService $bujkService,
    )
    {
        $this->fileService = $fileService;
        $this->usahaService = $usahaService;
        $this->bujkService = $bujkService;
    }

    public function show(string $id)
    {
        $usaha = $this->usahaService->getUsahaById($id);

        $usaha['sertifikat_standar'] = $this->bujkService->getDaftarSertifikatStandarBUJK($id);
        $usaha['laporan'] = $this->bujkService->getDaftarLaporanBUJK($id);
        $usaha['daftar_paket_pekerjaan'] = $this->bujkService->getDaftarPaketPekerjaanByUsahaId($id);

        return Inertia::render('Pendataan/Usaha/BUJK/Show', [
            'data' => [
                'usaha' => new BUJKResource($usaha),
            ],
        ]);
    }

    public function storeSertifikat(string $id, Request $request)
    {
        if (!$this->usahaService->checkUsahaExists($id)) {
            return back()->withErrors(['message' => 'Usaha tidak ditemukan.']);
        }

        $validatedData = $request->validate([
            'nomorSertifikat' => 'required',
            'dokumenSBU'      => 'nullable|file|max:2048',
            'jenis'           => 'required',
            'subklasifikasi'  => 'required'
        ]);

        $userId = auth()->user()->id;

        $data = [
            'nomor_sertifikat' => $validatedData['nomorSertifikat'],
            'jenis_usaha'      => $validatedData['jenis'],
            'usaha_id'         => $id,
            'created_by'       => $userId,
        ];

        if ($request->hasFile('dokumenSBU')) {
            $data['sertifikat_id'] = $this->fileService->addFile([
                'file'       => $request->file('dokumenSBU'),
                'path'       => 'public/files/usaha/sbu',
                'created_by' => $userId,
            ]);
        }

        $sbuId = $this->bujkService->addSertifikatStandarBUJK($data);

        $this->bujkService->addRincianSertifikatStandarBUJK([
            'sertifikat_standar_id' => $sbuId,
            'subklasifikasi'        => $validatedData['subklasifikasi'],
            'created_by'            => $userId,
        ]);

        return back();
    }

    public function updateSertifikat(string $id, string $sertifikat_id, Request $request)
    {
        if (!$this->usahaService->checkUsahaExists($id)) {
            return back()->withErrors(['message' => 'Usaha tidak ditemukan.']);
        }

        if (!$this->bujkService->checkSertifikatStandarBUJKExists($sertifikat_id)) {
            return back()->withErrors(['message' => 'Sertifikat tidak ditemukan.']);
        }

        $validatedData = $request->validate([
            'nomorSertifikat' => 'required',
            'jenis'           => 'required',
            'subklasifikasi'  => 'required'
        ]);

        $sertifikat = $this->bujkService->getSertifikatStandarBUJKById($sertifikat_id);
        $userId = auth()->user()->id;

        if ($request->hasFile('dokumenSBU')) {
            $request->validate(['dokumenSBU' => 'nullable|file|max:2048']);

            $dokumenSBU = $this->fileService->addFile([
                'file'       => $request->file('dokumenSBU'),
                'path'       => 'public/files/usaha/sbu',
                'created_by' => $userId,
            ]);

            $this->bujkService->updateFileSertifikatIdSertifikatStandarBUJK($sertifikat_id, $dokumenSBU);
            if ($sertifikat->sertifikat_id) $this->fileService->deleteFile($sertifikat->sertifikat_id);

        } elseif (!$request->filled('dokumenSBU') && $sertifikat->sertifikat_id) {
            $this->bujkService->updateFileSertifikatIdSertifikatStandarBUJK($sertifikat_id, null);
            $this->fileService->deleteFile($sertifikat->sertifikat_id);
        }

        $this->bujkService->updateSertifikatStandarBUJK($sertifikat_id, [
            'nomor_sertifikat' => $validatedData['nomorSertifikat'],
            'jenis_usaha'      => $validatedData['jenis'],
        ]);

        $this->bujkService->updateRincianSertifikatStandarBUJK($sertifikat_id, [
            'subklasifikasi' => $validatedData['subklasifikasi'],
            'created_by'     => $userId,
        ]);

        return back();
    }

    public function storeLaporan(string $id, Request $request)
    {
        if (!$this->usahaService->checkUsahaExists($id)) {
            return back()->withErrors(['message' => 'Usaha tidak ditemukan.']);
        }

        $validatedData = $request->validate([
            'tahun' => 'required|digits:4',
            'label' => 'required',
            'url'   => 'required|url:http,https',
        ]);
        $userId = auth()->user()->id;

        $data = [
            'tahun' => $validatedData['tahun'],
            'label' => $validatedData['label'],
            'url'   => $validatedData['url'],
        ];

        if ($request->has('id')){
            $data['id'] = $request->input('id');
            $this->bujkService->updateLaporanBUJK($data);
        } else {
            $data['usaha_id'] = $id;
            $data['created_by'] = $userId;

            $this->bujkService->addLaporanBUJK($data);
        }

        return redirect("/admin/pendataan/usaha/bujk/$id");
    }

    public function destroySertifikat(string $id, string $sertifikat_id)
    {
        if (!$this->usahaService->checkUsahaExists($id)) {
            return back()->withErrors(['message' => 'Usaha tidak ditemukan.']);
        }

        if (!$this->bujkService->checkSertifikatStandarBUJKExists($sertifikat_id)) {
            return back()->withErrors(['message' => 'Sertifikat tidak ditemukan.']);
        }

        $sertifikat = $this->bujkService->getSertifikatStandarBUJKById($sertifikat_id);

        $this->bujkService->deleteRincianSertifikatStandarBUJK($sertifikat->id);
        $this->bujkService->deleteSertifikatStandarBUJK($sertifikat->id);

        if ($sertifikat->sertifikat_id) $this->fileService->deleteFile($sertifikat->sertifikat_id);

        return back();
    }

    public function storePaketPekerjaan(string $id, Request $request)
    {
        if (!$this->usahaService->checkUsahaExists($id)) {
            return back()->withErrors(['message' => 'Usaha tidak ditemukan.']);
        }

        $validatedData = $request->validate([
            'namaPaket'      => 'required',
            'tahun'          => 'required|digits:4',
            'jenis'          => 'required',
            'sifat'          => 'required',
            'subklasifikasi' => 'required',
            'layanan'        => 'required',
            'bentuk'         => 'required',
            'kualifikasi'    => 'required',
        ]);
        $userId = auth()->user()->id;

        $data = [
            'nama_paket'           => $validatedData['namaPaket'],
            'tahun_anggaran'       => $validatedData['tahun'],
            'jenis_usaha'          => $validatedData['jenis'],
            'sifat_usaha'          => $validatedData['sifat'],
            'subklasifikasi_usaha' => $validatedData['subklasifikasi'],
            'layanan_usaha'        => $validatedData['layanan'],
            'bentuk_usaha'         => $validatedData['bentuk'],
            'kualifikasi_usaha'    => $validatedData['kualifikasi'],
        ];

        if ($request->has('id')){
            $data['id'] = $request->input('id');
            $this->bujkService->updatePaketPekerjaan($data);
        } else {
            $data['usaha_id'] = $id;
            $data['created_by'] = $userId;
            $this->bujkService->addPaketPekerjaan($data);
        }

        return redirect("/admin/pendataan/usaha/bujk/$id");
    }
}
