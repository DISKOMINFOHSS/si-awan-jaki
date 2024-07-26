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

        $validatedData = $request->validate(['dokumenSBU.*' => 'required|file|max:2048']);
        $userId = auth()->user()->id;

        foreach($request->file('dokumenSBU') as $dokumen) {
            $dokumenSBU = $this->fileService->addFile([
                'file'       => $dokumen,
                'path'       => 'public/files/usaha/sbu',
                'created_by' => $userId,
            ]);

            $this->bujkService->addSertifikatStandarBUJK([
                'sertifikat_id' => $dokumenSBU,
                'usaha_id'      => $id,
                'created_by'    => $userId,
            ]);
        }

        return redirect("/admin/pendataan/usaha/bujk/$id");
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

        $this->bujkService->addPaketPekerjaan([
            'nama_paket'           => $validatedData['namaPaket'],
            'tahun_anggaran'       => $validatedData['tahun'],
            'jenis_usaha'          => $validatedData['jenis'],
            'sifat_usaha'          => $validatedData['sifat'],
            'subklasifikasi_usaha' => $validatedData['subklasifikasi'],
            'layanan_usaha'        => $validatedData['layanan'],
            'bentuk_usaha'         => $validatedData['bentuk'],
            'kualifikasi_usaha'    => $validatedData['kualifikasi'],
            'usaha_id'             => $id,
            'created_by'           => $userId,
        ]);

        return redirect("/admin/pendataan/usaha/bujk/$id");
    }
}
