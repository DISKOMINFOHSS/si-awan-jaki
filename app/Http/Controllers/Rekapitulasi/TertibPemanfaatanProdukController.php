<?php

namespace App\Http\Controllers\Rekapitulasi;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Services\Rekapitulasi\TertibPemanfaatanProdukService;
use Illuminate\Http\Request;

class TertibPemanfaatanProdukController extends Controller
{
    protected $rekapPengawasanService;

    public function __construct(
        TertibPemanfaatanProdukService $rekapPengawasanService
    ) {
        $this->rekapPengawasanService = $rekapPengawasanService;
    }

    public function index(?string $tahun = '2024')
    {
        $daftarPengawasan = $this->rekapPengawasanService->getDaftarPengawasan($tahun);

        return Inertia::render('Rekapitulasi/TertibPemanfaatanProduk/Index', [
            'data' => [
                'daftarPengawasan' => $daftarPengawasan,
            ],
        ]);
    }
}
