<?php

namespace App\Http\Controllers\JenisPengawasan\Insidental;

use Inertia\Inertia;
use App\Helpers\RekapitulasiHelper;
use App\Http\Controllers\Controller;
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
        $tertibPenyelenggaraan = RekapitulasiHelper::getTotalTertibPengawasan($this->rekapTertibPenyelenggaraanService->getPengawasanCount($tahun, 'Insidental'));
        $tertibPemanfaatanProduk = RekapitulasiHelper::getTotalTertibPengawasan($this->rekapTertibPemanfaatanProdukService->getPengawasanCount($tahun, 'Insidental'));

        return Inertia::render('JenisPengawasan/Insidental/TertibUsaha/Index', [
            'data' => [
                'totalTertibPengawasan'       => [
                    'tertibPenyelenggaraan'     => $tertibPenyelenggaraan,
                    'tertibPemanfaatanProduk'   => $tertibPemanfaatanProduk,
                ],
            ],
        ]);
    }

    public function penyelenggaraan(string $tahun)
    {
        $daftarTertibPenyelenggaraan = $this->rekapTertibPenyelenggaraanService->getDaftarPengawasanByJenisPengawasan($tahun, 'Insidental');

        $tertibPenyelenggaraan = RekapitulasiHelper::getTotalTertibPengawasan($this->rekapTertibPenyelenggaraanService->getPengawasanCount($tahun, 'Insidental'));
        $tertibPemanfaatanProduk = RekapitulasiHelper::getTotalTertibPengawasan($this->rekapTertibPemanfaatanProdukService->getPengawasanCount($tahun, 'Insidental'));

        return Inertia::render('JenisPengawasan/Insidental/TertibPenyelenggaraan/Index', [
            'data' => [
                'daftarTertibPenyelenggaraan' => PengawasanPenyelenggaraanAPBDResource::collection($daftarTertibPenyelenggaraan),
                'totalTertibPengawasan'       => [
                    'tertibPenyelenggaraan'     => $tertibPenyelenggaraan,
                    'tertibPemanfaatanProduk'   => $tertibPemanfaatanProduk,
                ],
            ],
        ]);
    }

    public function pemanfaatan(string $tahun)
    {
        $daftarTertibPemanfaatan = $this->rekapTertibPemanfaatanProdukService->getDaftarPengawasanByJenisPengawasan($tahun, 'Insidental');

        $tertibPenyelenggaraan = RekapitulasiHelper::getTotalTertibPengawasan($this->rekapTertibPenyelenggaraanService->getPengawasanCount($tahun, 'Insidental'));
        $tertibPemanfaatanProduk = RekapitulasiHelper::getTotalTertibPengawasan($this->rekapTertibPemanfaatanProdukService->getPengawasanCount($tahun, 'Insidental'));

        return Inertia::render('JenisPengawasan/Insidental/TertibPemanfaatanProduk/Index', [
            'data' => [
                'daftarTertibPemanfaatanProduk' => PengawasanPemanfaatanProdukResource::collection($daftarTertibPemanfaatan),
                'totalTertibPengawasan'         => [
                    'tertibPenyelenggaraan'        => $tertibPenyelenggaraan,
                    'tertibPemanfaatanProduk'      => $tertibPemanfaatanProduk,
                ],
            ],
        ]);
    }
}
