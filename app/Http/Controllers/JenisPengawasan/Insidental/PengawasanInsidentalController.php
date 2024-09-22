<?php

namespace App\Http\Controllers\JenisPengawasan\Insidental;

use Inertia\Inertia;
use App\Helpers\RekapitulasiHelper;
use App\Http\Controllers\Controller;
use App\Http\Resources\Pengawasan\TertibUsaha\PengawasanBUJKResource;
use App\Http\Resources\Pengawasan\TertibPenyelenggaraan\PengawasanPenyelenggaraanAPBDResource;
use App\Http\Resources\Pengawasan\TertibPemanfaatanProduk\PengawasanPemanfaatanProdukResource;
use App\Services\Rekapitulasi\TertibUsahaService;
use App\Services\Rekapitulasi\TertibPenyelenggaraanService;
use App\Services\Rekapitulasi\TertibPemanfaatanProdukService;
use Illuminate\Http\Request;

class PengawasanInsidentalController extends Controller
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

    public function usaha(string $tahun)
    {
        $daftarPengawasanLingkup2 = $this->rekapTertibUsahaService->getDaftarPengawasanBUJKLingkup2ByJenisPengawasan($tahun, 'Insidental');
        $daftarPengawasanLingkup3 = $this->rekapTertibUsahaService->getDaftarPengawasanBUJKLingkup3ByJenisPengawasan($tahun, 'Insidental');
        $daftarPengawasanLingkup4 = $this->rekapTertibUsahaService->getDaftarPengawasanBUJKLingkup4ByJenisPengawasan($tahun, 'Insidental');
        $daftarPengawasanLingkup5 = $this->rekapTertibUsahaService->getDaftarPengawasanBUJKLingkup5ByJenisPengawasan($tahun, 'Insidental');

        $tertibBUJKLingkup2 = RekapitulasiHelper::getTotalTertibPengawasan($this->rekapTertibUsahaService->getPengawasanBUJKLingkup2Count($tahun, 'Insidental'));
        $tertibBUJKLingkup3 = RekapitulasiHelper::getTotalTertibPengawasan($this->rekapTertibUsahaService->getPengawasanBUJKLingkup3Count($tahun, 'Insidental'));
        $tertibBUJKLingkup4 = RekapitulasiHelper::getTotalTertibPengawasan($this->rekapTertibUsahaService->getPengawasanBUJKLingkup4Count($tahun, 'Insidental'));
        $tertibBUJKLingkup5 = RekapitulasiHelper::getTotalTertibPengawasan($this->rekapTertibUsahaService->getPengawasanBUJKLingkup5Count($tahun, 'Insidental'));

        $tertibPenyelenggaraan = RekapitulasiHelper::getTotalTertibPengawasan($this->rekapTertibPenyelenggaraanService->getPengawasanCount($tahun, 'Insidental'));
        $tertibPemanfaatanProduk = RekapitulasiHelper::getTotalTertibPengawasan($this->rekapTertibPemanfaatanProdukService->getPengawasanCount($tahun, 'Insidental'));

        return Inertia::render('JenisPengawasan/Insidental/TertibUsaha/Index', [
            'data' => [
                'daftarTertibUsaha'      => [
                    'daftarPengawasanBUJKLingkup2' => PengawasanBUJKResource::collection($daftarPengawasanLingkup2),
                    'daftarPengawasanBUJKLingkup3' => PengawasanBUJKResource::collection($daftarPengawasanLingkup3),
                    'daftarPengawasanBUJKLingkup4' => PengawasanBUJKResource::collection($daftarPengawasanLingkup4),
                    'daftarPengawasanBUJKLingkup5' => PengawasanBUJKResource::collection($daftarPengawasanLingkup5),
                ],
                'totalTertibPengawasan'  => [
                    'tertibUsaha'               => [
                        'tertibBUJKLingkup2'    => $tertibBUJKLingkup2,
                        'tertibBUJKLingkup3'    => $tertibBUJKLingkup3,
                        'tertibBUJKLingkup4'    => $tertibBUJKLingkup4,
                        'tertibBUJKLingkup5'    => $tertibBUJKLingkup5,
                    ],
                    'tertibPenyelenggaraan'     => $tertibPenyelenggaraan,
                    'tertibPemanfaatanProduk'   => $tertibPemanfaatanProduk,
                ],
            ],
        ]);
    }

    public function penyelenggaraan(string $tahun)
    {
        $daftarTertibPenyelenggaraan = $this->rekapTertibPenyelenggaraanService->getDaftarPengawasanByJenisPengawasan($tahun, 'Insidental');

        $tertibBUJKLingkup2 = RekapitulasiHelper::getTotalTertibPengawasan($this->rekapTertibUsahaService->getPengawasanBUJKLingkup2Count($tahun, 'Insidental'));
        $tertibBUJKLingkup3 = RekapitulasiHelper::getTotalTertibPengawasan($this->rekapTertibUsahaService->getPengawasanBUJKLingkup3Count($tahun, 'Insidental'));
        $tertibBUJKLingkup4 = RekapitulasiHelper::getTotalTertibPengawasan($this->rekapTertibUsahaService->getPengawasanBUJKLingkup4Count($tahun, 'Insidental'));
        $tertibBUJKLingkup5 = RekapitulasiHelper::getTotalTertibPengawasan($this->rekapTertibUsahaService->getPengawasanBUJKLingkup5Count($tahun, 'Insidental'));

        $tertibPenyelenggaraan = RekapitulasiHelper::getTotalTertibPengawasan($this->rekapTertibPenyelenggaraanService->getPengawasanCount($tahun, 'Insidental'));
        $tertibPemanfaatanProduk = RekapitulasiHelper::getTotalTertibPengawasan($this->rekapTertibPemanfaatanProdukService->getPengawasanCount($tahun, 'Insidental'));

        return Inertia::render('JenisPengawasan/Insidental/TertibPenyelenggaraan/Index', [
            'data' => [
                'daftarTertibPenyelenggaraan' => PengawasanPenyelenggaraanAPBDResource::collection($daftarTertibPenyelenggaraan),
                'totalTertibPengawasan'       => [
                    'tertibUsaha'               => [
                        'tertibBUJKLingkup2'    => $tertibBUJKLingkup2,
                        'tertibBUJKLingkup3'    => $tertibBUJKLingkup3,
                        'tertibBUJKLingkup4'    => $tertibBUJKLingkup4,
                        'tertibBUJKLingkup5'    => $tertibBUJKLingkup5,
                    ],
                    'tertibPenyelenggaraan'     => $tertibPenyelenggaraan,
                    'tertibPemanfaatanProduk'   => $tertibPemanfaatanProduk,
                ],
            ],
        ]);
    }

    public function pemanfaatan(string $tahun)
    {
        $daftarTertibPemanfaatan = $this->rekapTertibPemanfaatanProdukService->getDaftarPengawasanByJenisPengawasan($tahun, 'Insidental');

        $tertibBUJKLingkup2 = RekapitulasiHelper::getTotalTertibPengawasan($this->rekapTertibUsahaService->getPengawasanBUJKLingkup2Count($tahun, 'Insidental'));
        $tertibBUJKLingkup3 = RekapitulasiHelper::getTotalTertibPengawasan($this->rekapTertibUsahaService->getPengawasanBUJKLingkup3Count($tahun, 'Insidental'));
        $tertibBUJKLingkup4 = RekapitulasiHelper::getTotalTertibPengawasan($this->rekapTertibUsahaService->getPengawasanBUJKLingkup4Count($tahun, 'Insidental'));
        $tertibBUJKLingkup5 = RekapitulasiHelper::getTotalTertibPengawasan($this->rekapTertibUsahaService->getPengawasanBUJKLingkup5Count($tahun, 'Insidental'));

        $tertibPenyelenggaraan = RekapitulasiHelper::getTotalTertibPengawasan($this->rekapTertibPenyelenggaraanService->getPengawasanCount($tahun, 'Insidental'));
        $tertibPemanfaatanProduk = RekapitulasiHelper::getTotalTertibPengawasan($this->rekapTertibPemanfaatanProdukService->getPengawasanCount($tahun, 'Insidental'));

        return Inertia::render('JenisPengawasan/Insidental/TertibPemanfaatanProduk/Index', [
            'data' => [
                'daftarTertibPemanfaatanProduk' => PengawasanPemanfaatanProdukResource::collection($daftarTertibPemanfaatan),
                'totalTertibPengawasan'         => [
                    'tertibUsaha'               => [
                        'tertibBUJKLingkup2'    => $tertibBUJKLingkup2,
                        'tertibBUJKLingkup3'    => $tertibBUJKLingkup3,
                        'tertibBUJKLingkup4'    => $tertibBUJKLingkup4,
                        'tertibBUJKLingkup5'    => $tertibBUJKLingkup5,
                    ],
                    'tertibPenyelenggaraan'        => $tertibPenyelenggaraan,
                    'tertibPemanfaatanProduk'      => $tertibPemanfaatanProduk,
                ],
            ],
        ]);
    }
}
