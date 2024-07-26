<?php

namespace App\Http\Controllers\Pengawasan\Usaha;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Services\Usaha\PengawasanUsahaService;
use Illuminate\Http\Request;

class UsahaController extends Controller
{
    protected $pengawasanService;

    public function __construct(PengawasanUsahaService $pengawasanService)
    {
        $this->pengawasanService = $pengawasanService;
    }

    public function scope()
    {
        $daftarLingkup = $this->pengawasanService->getDaftarLingkupPengawasan();

        return Inertia::render('Pengawasan/Usaha/Scope', [
            'data' => [
                'daftarLingkupPengawasan' => $daftarLingkup,
            ],
        ]);
    }
}
