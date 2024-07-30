<?php

namespace App\Http\Controllers\Pengawasan\Usaha;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Services\Usaha\PendataanBUJKService;
use App\Services\Usaha\PengawasanUsahaService;
use Illuminate\Http\Request;

class Lingkup3Controller extends Controller
{
    protected $bujkService;
    protected $pengawasanService;

    public function __construct(
        PendataanBUJKService $bujkService,
        PengawasanUsahaService $pengawasanService,
    )
    {
        $this->bujkService = $bujkService;
        $this->pengawasanService = $pengawasanService;
    }

    public function index()
    {
        $lingkupPengawasan = $this->pengawasanService->getLingkupPengawasan(3);
        $daftarUsaha = $this->bujkService->getDaftarBUJK();

        return Inertia::render('Pengawasan/Usaha/BUJK/Lingkup3/Index', [
            'data' => [
                'lingkupPengawasan' => $lingkupPengawasan,
                'daftarUsaha'       => $daftarUsaha,
            ],
        ]);
    }
}
