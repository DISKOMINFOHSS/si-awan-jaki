<?php

namespace App\Http\Controllers\Pendataan\Proyek;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Services\Usaha\PendataanUsahaService;
use Illuminate\Http\Request;

class ProyekController extends Controller
{
    protected $usahaService;

    public function __construct(PendataanUsahaService $usahaService) {
        $this->usahaService = $usahaService;
    }

    public function index()
    {
        return Inertia::render('Pendataan/Proyek/Index');
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
}
