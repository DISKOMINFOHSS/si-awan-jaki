<?php

namespace App\Http\Controllers\JenisPengawasan\Rutin;

use Inertia\Inertia;
use App\Helpers\RekapitulasiHelper;
use App\Http\Controllers\Controller;
use App\Http\Resources\Rekapitulasi\PengawasanBUJKRutinResource;
use App\Http\Resources\Rekapitulasi\PengawasanTertibUsahaBUJKResource;
use App\Http\Resources\Pengawasan\TertibPenyelenggaraan\PengawasanPenyelenggaraanAPBDResource;
use App\Http\Resources\Pengawasan\TertibPemanfaatanProduk\PengawasanPemanfaatanProdukResource;
use App\Services\Rekapitulasi\TertibUsahaService;
use App\Services\Rekapitulasi\TertibPenyelenggaraanService;
use App\Services\Rekapitulasi\TertibPemanfaatanProdukService;
use Illuminate\Http\Request;

class PengawasanRutinController extends Controller
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
        $daftarTertibUsahaBUJK = $this->rekapTertibUsahaService->getDaftarPengawasanRutinBUJK($tahun);

        $daftarTertibPenyelenggaraan = $this->rekapTertibPenyelenggaraanService->getDaftarPengawasanRutin($tahun);
        $tertibPenyelenggaraan = RekapitulasiHelper::getTotalTertibPengawasan($this->rekapTertibPenyelenggaraanService->getPengawasanRutinCount($tahun));

        $daftarTertibPemanfaatan = $this->rekapTertibPemanfaatanProdukService->getDaftarPengawasanRutin($tahun);
        $tertibPemanfaatanProduk = RekapitulasiHelper::getTotalTertibPengawasan($this->rekapTertibPemanfaatanProdukService->getPengawasanRutinCount($tahun));

        return Inertia::render('JenisPengawasan/Rutin/Index', [
            'data' => [
                'daftarTertibUsaha'             => [
                    'daftarTertibBUJK'              => PengawasanBUJKRutinResource::collection($daftarTertibUsahaBUJK),
                ],
                'daftarTertibPenyelenggaraan'   => PengawasanPenyelenggaraanAPBDResource::collection($daftarTertibPenyelenggaraan),
                'daftarTertibPemanfaatanProduk' => PengawasanPemanfaatanProdukResource::collection($daftarTertibPemanfaatan),
                'totalTertibPengawasan'         => [
                    'tertibPenyelenggaraan'         => $tertibPenyelenggaraan,
                    'tertibPemanfaatanProduk'       => $tertibPemanfaatanProduk,
                ],
            ],
        ]);
    }

    public function show(string $tahun, string $file_name)
    {
        $daftarTertibPenyelenggaraan = $this->rekapTertibPenyelenggaraanService->getDaftarPengawasanRutinOrderByNamaPaket($tahun);
        $daftarTertibPemanfaatan = $this->rekapTertibPemanfaatanProdukService->getDaftarPengawasanRutinOrderByBangunanNama($tahun);

        return Inertia::render('JenisPengawasan/Rutin/Show', [
            'data' => [
                'daftarTertibPenyelenggaraan'   => PengawasanPenyelenggaraanAPBDResource::collection($daftarTertibPenyelenggaraan),
                'daftarTertibPemanfaatanProduk' => PengawasanPemanfaatanProdukResource::collection($daftarTertibPemanfaatan),
            ],
        ]);
    }
}
