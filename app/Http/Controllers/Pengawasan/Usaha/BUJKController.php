<?php

namespace App\Http\Controllers\Pengawasan\Usaha;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Services\Usaha\PendataanBUJKService;
use App\Services\Usaha\PengawasanUsahaService;
use Illuminate\Http\Request;

class BUJKController extends Controller
{
    protected $bujkService;
    protected $pengawasanService;

    public function __construct(
        PendataanBUJKService $bujkService,
        PengawasanUsahaService $pengawasanService
    ) {
        $this->bujkService = $bujkService;
        $this->pengawasanService = $pengawasanService;
    }

    public function index()
    {
        $daftarLingkup = $this->pengawasanService->getDaftarLingkupPengawasan();
        $daftarUsaha = $this->bujkService->getDaftarBUJK();

        return Inertia::render('Pengawasan/Usaha/BUJK/Index', [
            'data' => [
                'daftarUsaha'             => $daftarUsaha,
                'daftarLingkupPengawasan' => $daftarLingkup,
            ],
        ]);
    }
}
