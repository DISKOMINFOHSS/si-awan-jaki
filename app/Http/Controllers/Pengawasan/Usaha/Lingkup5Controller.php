<?php

namespace App\Http\Controllers\Pengawasan\Usaha;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Services\Usaha\PendataanBUJKService;
use App\Services\Usaha\PengawasanUsahaService;
use Illuminate\Http\Request;

class Lingkup5Controller extends Controller
{
    protected $bujkService;
    protected $pengawasanService;

    public function __construct(
        PendataanBUJKService $bujkService,
        PengawasanUsahaService $pengawasanService,
        // PengawasanLingkup2Service $pengawasanLingkup2Service,
    )
    {
        $this->bujkService = $bujkService;
        $this->pengawasanService = $pengawasanService;
        // $this->pengawasanLingkup2Service = $pengawasanLingkup2Service;
    }

    public function index()
    {
        $lingkupPengawasan = $this->pengawasanService->getLingkupPengawasan(5);
        $daftarUsaha = $this->bujkService->getDaftarBUJK();

        return Inertia::render('Pengawasan/Usaha/BUJK/Lingkup5/Index', [
            'data' => [
                'lingkupPengawasan' => $lingkupPengawasan,
                'daftarUsaha'       => $daftarUsaha,
            ],
        ]);
    }
}
