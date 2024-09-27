<?php

namespace App\Http\Controllers\Pengawasan\Usaha\Lingkup4;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Http\Resources\Pengawasan\TertibUsaha\PengawasanInsidentalBUJKLingkup4Resource;
use App\Services\Usaha\PengawasanUsahaService;
use App\Services\Usaha\PengawasanLingkup4Service;
use Illuminate\Http\Request;

class BUJKController extends Controller
{
    protected $pengawasanService;
    protected $pengawasanLingkup4Service;

    public function __construct(
        PengawasanUsahaService $pengawasanService,
        PengawasanLingkup4Service $pengawasanLingkup4Service,
    ) {
        $this->pengawasanService = $pengawasanService;
        $this->pengawasanLingkup4Service = $pengawasanLingkup4Service;
    }

    public function insidental(string $id)
    {
        $lingkupPengawasan = $this->pengawasanService->getLingkupPengawasan(4);
        $pengawasan = $this->pengawasanLingkup4Service->getPengawasanBUJKById($id);

        return Inertia::render('Pengawasan/Usaha/BUJK/Lingkup4/Insidental/Show', [
            'data' => [
                'lingkupPengawasan' => $lingkupPengawasan,
                'pengawasan'        => new PengawasanInsidentalBUJKLingkup4Resource($pengawasan),
            ],
        ]);
    }
}
