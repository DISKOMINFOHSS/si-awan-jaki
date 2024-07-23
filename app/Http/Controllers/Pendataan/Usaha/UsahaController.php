<?php

namespace App\Http\Controllers\Pendataan\Usaha;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Http\Resources\Pendataan\JenisUsahaResource;
use App\Services\Usaha\PendataanUsahaService;
use Illuminate\Http\Request;

class UsahaController extends Controller
{
    protected $usahaService;

    public function __construct(PendataanUsahaService $usahaService)
    {
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

        return Inertia::render('Pendataan/Usaha/Index', [
            'data' => [
                'jenisUsaha' => new JenisUsahaResource($jenisUsaha),
            ],
        ]);
    }
}
