<?php

namespace App\Http\Controllers\Pendataan\Usaha;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Http\Resources\Pendataan\JenisUsahaResource;
use App\Services\FileService;
use App\Services\Usaha\PendataanUsahaService;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UsahaController extends Controller
{
    protected $fileService;
    protected $usahaService;

    public function __construct(FileService $fileService, PendataanUsahaService $usahaService)
    {
        $this->fileService = $fileService;
        $this->usahaService = $usahaService;
    }

    public function category()
    {
        $daftarJenisUsaha = $this->usahaService->getDaftarJenisUsaha();

        return Inertia::render('Pendataan/Usaha/Category', [
            'data' => [
                'daftarJenisUsaha' => $daftarJenisUsaha,
            ],
        ]);
    }

    public function index(string $jenis_usaha)
    {
        $jenisUsaha = $this->usahaService->getJenisUsahaWithDaftarUsahaBySlug($jenis_usaha);

        if ($jenisUsaha->jenis_usaha == "Usaha Rantai Pasok") {
            $jenisUsaha['daftar_jenis_rantai_pasok'] = $this->usahaService->getDaftarJenisRantaiPasok();
        }

        return Inertia::render('Pendataan/Usaha/Index', [
            'data' => [
                'jenisUsaha' => new JenisUsahaResource($jenisUsaha),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $jenisUsaha = $this->usahaService->getJenisUsahaById($request->input('jenisUsahaId'));
        if (!$jenisUsaha) {
            return back()->withErrors(['message' => 'Jenis Usaha tidak ditemukan.']);
        }

        $validatedData = $request->validate([
            'nama'               => 'required',
            'dokumenNIB'         => 'nullable|file|max:2048',
            'jenisUsahaId'       => 'required',
            'jenisRantaiPasokId' => [[Rule::requiredIf($jenisUsaha->jenis_usaha == 'Usaha Rantai Pasok')]],
        ]);
        $userId = auth()->user()->id;

        $dokumenNIB = $validatedData['dokumenNIB'] ?
            $this->fileService->addFile([
                'file'       => $validatedData['dokumenNIB'],
                'path'       => 'public/files/usaha/nib',
                'created_by' => $userId,
            ]) : null;

        $usahaId = $this->usahaService->addUsaha([
            'nama'           => $validatedData['nama'],
            'nib'            => $request->input('nib'),
            'dokumen_nib'    => $dokumenNIB,
            'pjbu'           => $request->input('pjbu'),
            'alamat'         => $request->input('alamat'),
            'jenis_usaha_id' => $validatedData['jenisUsahaId'],
            'created_by'     => $userId,
        ]);

        if ($jenisUsaha->jenis_usaha == 'Usaha Rantai Pasok') {
            $this->usahaService->addUsahaRantaiPasok($usahaId, $validatedData['jenisRantaiPasokId']);
        }

        return redirect("/admin/pendataan/usaha/$jenisUsaha->slug/$usahaId");
    }

    public function storeDokumenNIB(string $id, Request $request)
    {
        if (!$this->usahaService->checkUsahaExists($id)) {
            return back()->withErrors(['message' => 'Usaha tidak ditemukan.']);
        }

        $validatedData = $request->validate(['dokumenNIB' => 'required|file|max:2048']);
        $userId = auth()->user()->id;

        $dokumenNIB = $this->fileService->addFile([
            'file'       => $validatedData['dokumenNIB'],
            'path'       => 'public/files/usaha/nib',
            'created_by' => $userId,
        ]);

        $this->usahaService->addDokumenNIB($id, $dokumenNIB);

        return back();
    }

    public function destroyDokumenNIB(string $id, string $file_id)
    {
        if (!$this->usahaService->checkUsahaExists($id)) {
            return back()->withErrors(['message' => 'Usaha tidak ditemukan.']);
        }

        if (!$this->fileService->checkFileExists($file_id)) {
            return back()->withErrors(['message' => 'File Dokumen NIB tidak ditemukan.']);
        }

        $fileId = $this->usahaService->deleteDokumenNIB($id);

        if ($file_id == $fileId) {
            $this->fileService->deleteFile($fileId);
        }

        return back();
    }
}
