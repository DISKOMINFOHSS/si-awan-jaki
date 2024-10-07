<?php

namespace App\Http\Controllers\Pendataan\Usaha;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Http\Resources\Pendataan\Usaha\UsahaPerseoranganResource;
use App\Services\FileService;
use App\Services\Usaha\PendataanUsahaService;
use App\Services\Usaha\PendataanUsahaPerseoranganService;
use Illuminate\Http\Request;

class UsahaPerseoranganController extends Controller
{
    protected $fileService;
    protected $usahaService;
    protected $usahaPerseoranganService;

    public function __construct(
        PendataanUsahaService $usahaService,
        FileService $fileService,
        PendataanUsahaPerseoranganService $usahaPerseoranganService,
    ) {
        $this->fileService = $fileService;
        $this->usahaService = $usahaService;
        $this->usahaPerseoranganService = $usahaPerseoranganService;
    }

    public function show(string $id)
    {
        $usaha = $this->usahaService->getUsahaById($id);
        $usaha['sertifikat_standar'] = $this->usahaPerseoranganService->getDaftarSertifikatStandar($id);

        return Inertia::render('Pendataan/Usaha/UsahaPerseorangan/Show', [
            'data' => [
                'usaha' => new UsahaPerseoranganResource($usaha),
            ],
        ]);
    }

    public function sertifikat(string $id, Request $request)
    {
        if (!$this->usahaService->checkUsahaExists($id)) {
            return back()->withErrors(['message' => 'Usaha tidak ditemukan.']);
        }

        $validatedData = $request->validate([
            'nomorSertifikat' => 'required',
            'pemegang'        => 'required',
            'subklasifikasi'  => 'required'
        ]);
        $userId = auth()->user()->id;

        $data = [
            'nomor_sertifikat' => $validatedData['nomorSertifikat'],
            'pemegang'         => $validatedData['pemegang'],
            'subklasifikasi'   => $validatedData['subklasifikasi'],
            'usaha_id'         => $id,
            'created_by'       => $userId,
        ];

        if ($request->hasFile('dokumenSKK')) {
            $request->validate(['dokumenSKK' => 'nullable|file|max:2048']);

            $data['sertifikat_id'] = $this->fileService->addFile([
                'file'       => $request->file('dokumenSKK'),
                'path'       => 'public/files/usaha/skk',
                'created_by' => $userId,
            ]);
        } elseif (!$request->filled('dokumenSKK')) {
            $data['sertifikat_id'] = null;
        }

        if ($request->filled('id')) {
            $sertifikat = $this->usahaPerseoranganService->getSertifikatStandarById($request->input('id'));

            if ($request->filled('dokumenSKK') && $sertifikat->sertifikat_id) $data['sertifikat_id'] = $sertifikat->sertifikat_id;
            $this->usahaPerseoranganService->updateSertifikatStandar($sertifikat->id, $data);

            if (!$request->filled('dokumenSKK') && $sertifikat->sertifikat_id) {
                $this->fileService->deleteFile($sertifikat->sertifikat_id);
            }
        } else {
            $this->usahaPerseoranganService->addSertifikatStandar($data);
        }

        return back();
    }

    public function destroySertifikat(string $id, string $sertifikat_id)
    {
        if (!$this->usahaService->checkUsahaExists($id)) {
            return back()->withErrors(['message' => 'Usaha tidak ditemukan.']);
        }

        if (!$this->usahaPerseoranganService->checkSertifikatStandarExists($sertifikat_id)) {
            return back()->withErrors(['message' => 'Sertifikat tidak ditemukan.']);
        }

        $sertifikat = $this->usahaPerseoranganService->getSertifikatStandarById($sertifikat_id);
        $this->usahaPerseoranganService->deleteSertifikatStandar($sertifikat->id);

        if ($sertifikat->sertifikat_id) $this->fileService->deleteFile($sertifikat->sertifikat_id);

        return back();
    }
}
