<?php

namespace App\Http\Controllers\Rekapitulasi;

use Inertia\Inertia;
use App\Helpers\RekapitulasiHelper;
use App\Http\Controllers\Controller;
use App\Services\JenisPengawasan\PengawasanProgressService;
use App\Services\Rekapitulasi\TertibUsahaService;
use App\Services\Rekapitulasi\TertibPenyelenggaraanService;
use App\Services\Rekapitulasi\TertibPemanfaatanProdukService;
use Illuminate\Http\Request;

class RekapitulasiController extends Controller
{
    protected $rekapTertibUsahaService;
    protected $rekapTertibPenyelenggaraanService;
    protected $rekapTertibPemanfaatanProdukService;
    protected $pengawasanProgressService;

    public function __construct(
        TertibUsahaService $rekapTertibUsahaService,
        TertibPenyelenggaraanService $rekapTertibPenyelenggaraanService,
        TertibPemanfaatanProdukService $rekapTertibPemanfaatanProdukService,
        PengawasanProgressService $pengawasanProgressService,
    ) {
        $this->rekapTertibUsahaService = $rekapTertibUsahaService;
        $this->rekapTertibPenyelenggaraanService = $rekapTertibPenyelenggaraanService;
        $this->rekapTertibPemanfaatanProdukService = $rekapTertibPemanfaatanProdukService;
        $this->pengawasanProgressService = $pengawasanProgressService;
    }

    public function index(string $tahun)
    {
        $tertibUsahaBUJK = RekapitulasiHelper::getTotalTertibPengawasan($this->rekapTertibUsahaService->getTertibUsahaBUJKCount($tahun));
        $tertibPenyelenggaraan = RekapitulasiHelper::getTotalTertibPengawasan($this->rekapTertibPenyelenggaraanService->getTertibPenyelenggaraanCount($tahun));
        $tertibPemanfaatanProduk = RekapitulasiHelper::getTotalTertibPengawasan($this->rekapTertibPemanfaatanProdukService->getTertibPemanfaatanProdukCount($tahun));

        // $pengawasanInsidental = $this->pengawasanProgressService->getTotalPengawasanCount($tahun);
        $totalPengawasanInsidental =
            $this->rekapTertibUsahaService->getTotalPengawasanCount($tahun, 'Insidental') +
            $this->rekapTertibPenyelenggaraanService->getTotalPengawasanCount($tahun, 'Insidental') +
            $this->rekapTertibPemanfaatanProdukService->getTotalPengawasanCount($tahun, 'Insidental');
        $pengawasanProgress = $this->pengawasanProgressService->getTotalPengawasanCount($tahun);

        return Inertia::render('Rekapitulasi/Index', [
            'data' => [
                'totalPengawasanInsidental' => $totalPengawasanInsidental,
                'totalPengawasanProgress'   => $pengawasanProgress,
                'tertibUsaha'               => $tertibUsahaBUJK,
                'tertibPenyelenggaraan'     => $tertibPenyelenggaraan,
                'tertibPemanfaatanProduk'   => $tertibPemanfaatanProduk,
            ],
        ]);
    }
}
