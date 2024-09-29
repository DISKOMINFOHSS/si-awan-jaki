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
        return back();
    }
}
