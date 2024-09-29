<?php

namespace App\Http\Controllers\Pengawasan\Usaha\Lingkup4;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Services\Usaha\PendataanUsahaService;
use App\Services\Usaha\PengawasanUsahaService;
use Illuminate\Http\Request;

class UsahaPerseoranganController extends Controller
{
    protected $usahaService;
    protected $pengawasanService;

    public function __construct(
        PendataanUsahaService $usahaService,
        PengawasanUsahaService $pengawasanService,
    ) {
        $this->usahaService = $usahaService;
        $this->pengawasanService = $pengawasanService;
    }

    public function index()
    {
        $lingkupPengawasan = $this->pengawasanService->getLingkupPengawasan(4);
        $daftarUsaha = $this->usahaService->getDaftarUsahaByJenisUsaha('Usaha Orang Perseorangan');

        return Inertia::render('Pengawasan/Usaha/UsahaPerseorangan/Index', [
            'data' => [
                'lingkupPengawasan' => $lingkupPengawasan,
                'daftarUsaha'       => $daftarUsaha,
            ]
        ]);
    }
}
