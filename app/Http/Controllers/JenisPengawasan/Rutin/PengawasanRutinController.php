<?php

namespace App\Http\Controllers\JenisPengawasan\Rutin;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Http\Resources\Rekapitulasi\PengawasanBUJKRutinResource;
use App\Http\Resources\Rekapitulasi\PengawasanTertibUsahaBUJKResource;
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

        return Inertia::render('JenisPengawasan/Rutin/Index', [
            'data' => [
                'daftarTertibUsaha' => [
                    'daftarTertibBUJK' => PengawasanBUJKRutinResource::collection($daftarTertibUsahaBUJK),
                ],
            ],
        ]);
    }
}
