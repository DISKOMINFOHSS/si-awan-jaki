<?php

namespace App\Http\Controllers\Pengawasan\Usaha;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Services\Usaha\PendataanUsahaService;
use App\Services\Usaha\PengawasanUsahaService;
use Illuminate\Http\Request;

class UsahaRantaiPasokController extends Controller
{
    protected $usahaService;
    protected $pengawasanService;

    public function __construct(PendataanUsahaService $usahaService, PengawasanUsahaService $pengawasanService)
    {
        $this->usahaService = $usahaService;
        $this->pengawasanService = $pengawasanService;
    }

    public function category()
    {
        $lingkupPengawasan = $this->pengawasanService->getLingkupPengawasan(1);
        $daftarObjek = $this->usahaService->getDaftarJenisRantaiPasok();

        return Inertia::render('Pengawasan/Usaha/Category', [
            'data' => [
                'lingkupPengawasan'     => $lingkupPengawasan,
                'daftarObjekPengawasan' => $daftarObjek,
            ],
        ]);
    }
}
