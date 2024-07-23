<?php

namespace App\Http\Controllers\Pendataan\Usaha;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
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
}
