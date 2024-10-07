<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Helpers\RekapitulasiHelper;
use App\Http\Resources\Pengawasan\Progress\PengawasanProgressResource;
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

        $daftarTertibUsahaBUJK = $this->rekapTertibUsahaService->getDaftarPengawasanRutinBUJKByTahun($tahun);

        $tertibBUJK = [
            'totalTertib'      => 0,
            'totalBelumTertib' => 0,
        ];
        foreach($daftarTertibUsahaBUJK as $tertibUsahaBUJK)
        {
            if (
                $tertibUsahaBUJK->tertib_pengawasan_lingkup_2 &&
                $tertibUsahaBUJK->tertib_pengawasan_lingkup_3 &&
                $tertibUsahaBUJK->tertib_pengawasan_lingkup_4 &&
                $tertibUsahaBUJK->tertib_pengawasan_lingkup_5
            ) {
                $tertibBUJK['totalTertib'] += 1;
            } elseif (
                $tertibUsahaBUJK->tertib_pengawasan_lingkup_2 === null ||
                $tertibUsahaBUJK->tertib_pengawasan_lingkup_3 === null ||
                $tertibUsahaBUJK->tertib_pengawasan_lingkup_4 === null ||
                $tertibUsahaBUJK->tertib_pengawasan_lingkup_5 === null
            ) {
                continue;
            } else {
                $tertibBUJK['totalBelumTertib'] += 1;
            }
        }

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
        $daftarPengawasanProgress = $this->pengawasanProgressService->getDaftarPengawasanByTahunLimit($tahun, 5);

        return Inertia::render('Dashboard', [
            'data' => [
                'totalPengawasanInsidental'  => $totalPengawasanInsidental,
                'totalPengawasanProgress'    => $pengawasanProgress,
                'pengawasanProgress'         => $totalPengawasanProgress,
                'daftarPengawasanProgress'   => PengawasanProgressResource::collection($daftarPengawasanProgress),
                'totalTertibPengawasanRutin' => [
                    'tertibUsaha'               => [
                        'tertibBUJK' => $tertibBUJK,
                    ],
                    'tertibPenyelenggaraan'     => $tertibPenyelenggaraanRutin,
                    'tertibPemanfaatanProduk'   => $tertibPemanfaatanProdukRutin,
                ],
            ],
        ]);
    }
}
