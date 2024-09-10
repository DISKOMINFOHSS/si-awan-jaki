<?php

namespace App\Http\Controllers\Rekapitulasi;

use Inertia\Inertia;
use App\Helpers\RekapitulasiHelper;
use App\Http\Controllers\Controller;
use App\Services\Rekapitulasi\TertibUsahaService;
use App\Services\Rekapitulasi\TertibPenyelenggaraanService;
use App\Services\Rekapitulasi\TertibPemanfaatanProdukService;
use Illuminate\Http\Request;

class RekapitulasiController extends Controller
{
    protected $rekapTertibUsahaService;
    protected $rekapTertibPenyelenggaraanService;
    protected $rekapTertibPemanfaatanProdukService;

    public function __construct(
        TertibUsahaService $rekapTertibUsahaService,
        TertibPenyelenggaraanService $rekapTertibPenyelenggaraanService,
        TertibPemanfaatanProdukService $rekapTertibPemanfaatanProdukService,
    ) {
        $this->rekapTertibUsahaService = $rekapTertibUsahaService;
        $this->rekapTertibPenyelenggaraanService = $rekapTertibPenyelenggaraanService;
        $this->rekapTertibPemanfaatanProdukService = $rekapTertibPemanfaatanProdukService;
    }

    public function index(string $tahun)
    {
        $tertibUsahaBUJK = RekapitulasiHelper::getTotalTertibPengawasan($this->rekapTertibUsahaService->getTertibUsahaBUJKCount($tahun));
        $tertibPenyelenggaraan = RekapitulasiHelper::getTotalTertibPengawasan($this->rekapTertibPenyelenggaraanService->getTertibPenyelenggaraanCount($tahun));
        $tertibPemanfaatanProduk = RekapitulasiHelper::getTotalTertibPengawasan($this->rekapTertibPemanfaatanProdukService->getTertibPemanfaatanProdukCount($tahun));

        return Inertia::render('Rekapitulasi/Index', [
            'data' => [
                'tertibUsaha'             => $tertibUsahaBUJK,
                'tertibPenyelenggaraan'   => $tertibPenyelenggaraan,
                'tertibPemanfaatanProduk' => $tertibPemanfaatanProduk,
            ],
        ]);
    }
}
