<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Helpers\RekapitulasiHelper;
use App\Services\JenisPengawasan\PengawasanProgressService;
use App\Services\Rekapitulasi\TertibUsahaService;
use App\Services\Rekapitulasi\TertibPenyelenggaraanService;
use App\Services\Rekapitulasi\TertibPemanfaatanProdukService;
use Illuminate\Http\Request;

class DashboardController extends Controller
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

    public function dashboard()
    {
        $tahun = date('Y');

        $totalPengawasanInsidental =
            $this->rekapTertibUsahaService->getTotalPengawasanCount($tahun, 'Insidental') +
            $this->rekapTertibPenyelenggaraanService->getTotalPengawasanCount($tahun, 'Insidental') +
            $this->rekapTertibPemanfaatanProdukService->getTotalPengawasanCount($tahun, 'Insidental');
        $pengawasanProgress = $this->pengawasanProgressService->getTotalPengawasanCount($tahun);

        $tertibPenyelenggaraanRutin = RekapitulasiHelper::getTotalTertibPengawasan($this->rekapTertibPenyelenggaraanService->getPengawasanCount($tahun, 'Rutin'));
        $tertibPemanfaatanProdukRutin = RekapitulasiHelper::getTotalTertibPengawasan($this->rekapTertibPemanfaatanProdukService->getPengawasanCount($tahun, 'Rutin'));

        $totalPengawasanProgressByStatus = $this->pengawasanProgressService->getPengawasanCount($tahun);
        $totalPengawasanProgress = [];
        foreach ($totalPengawasanProgressByStatus as $total)
        {
            switch ($total->status)
            {
                case "Dalam Proses":
                    $totalPengawasanProgress['dalamProses'] = $total->total_pengawasan;
                    break;
                case "Selesai":
                    $totalPengawasanProgress['selesai'] = $total->total_pengawasan;
                    break;
                case "Terlambat":
                    $totalPengawasanProgress['terlambat'] = $total->total_pengawasan;
                    break;
            }
        }

        return Inertia::render('Dashboard', [
            'data' => [
                'totalPengawasanInsidental'  => $totalPengawasanInsidental,
                'totalPengawasanProgress'    => $pengawasanProgress,
                'pengawasanProgress'         => $totalPengawasanProgress,
                'totalTertibPengawasanRutin' => [
                    'tertibPenyelenggaraan'     => $tertibPenyelenggaraanRutin,
                    'tertibPemanfaatanProduk'   => $tertibPemanfaatanProdukRutin,
                ],
            ],
        ]);
    }
}
