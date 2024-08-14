<?php

namespace App\Http\Controllers\Pendataan\Proyek;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Http\Resources\Pendataan\ProyekKonstruksiCollection;
use App\Http\Resources\Pendataan\ProyekKonstruksiResource;
use App\Services\Usaha\PendataanUsahaService;
use App\Services\Penyelenggaraan\PendataanProyekService;
use Illuminate\Http\Request;

class ProyekController extends Controller
{
    protected $usahaService;
    protected $proyekService;

    public function __construct(
        PendataanUsahaService $usahaService,
        PendataanProyekService $proyekService,
    ) {
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

        return Inertia::render('Pendataan/Proyek/Create', [
            'data' => [
                'daftarUsaha' => $daftarUsaha,
            ],
        ]);
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
}
