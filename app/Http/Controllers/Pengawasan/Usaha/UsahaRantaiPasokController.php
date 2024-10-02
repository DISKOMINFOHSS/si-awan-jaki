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

    public function index(string $jenis_rantai_pasok)
    {
        $lingkupPengawasan = $this->pengawasanService->getLingkupPengawasan(1);
        $jenisRantaiPasok = $this->usahaService->getJenisRantaiPasokBySlug($jenis_rantai_pasok);

        $daftarUsaha = $this->usahaService->getDaftarUsahaRantaiPasokBySlug($jenis_rantai_pasok);

        return Inertia::render('Pengawasan/Usaha/UsahaRantaiPasok/Index', [
            'data' => [
                'lingkupPengawasan' => $lingkupPengawasan,
                'jenisRantaiPasok'  => $jenisRantaiPasok,
                'daftarUsaha'       => $daftarUsaha,
            ],
        ]);
    }
}
