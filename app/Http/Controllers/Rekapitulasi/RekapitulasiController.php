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
        $tertibUsahaPerseorangan = RekapitulasiHelper::getTotalTertibPengawasan($this->rekapTertibUsahaService->getTertibUsahaPerseoranganCount($tahun));
        $tertibPenyelenggaraan = RekapitulasiHelper::getTotalTertibPengawasan($this->rekapTertibPenyelenggaraanService->getTertibPenyelenggaraanCount($tahun));
        $tertibPemanfaatanProduk = RekapitulasiHelper::getTotalTertibPengawasan($this->rekapTertibPemanfaatanProdukService->getTertibPemanfaatanProdukCount($tahun));

        $daftarTertibUsahaBUJK = $this->rekapTertibUsahaService->getDaftarPengawasanRutinBUJKByTahun($tahun);
        $tertibBUJKRutin = [
            'totalTertib'      => 0,
            'totalBelumTertib' => 0,
        ];
        foreach($daftarTertibUsahaBUJK as $tertib)
        {
            if (
                $tertib->tertib_pengawasan_lingkup_2 &&
                $tertib->tertib_pengawasan_lingkup_3 &&
                $tertib->tertib_pengawasan_lingkup_4 &&
                $tertib->tertib_pengawasan_lingkup_5
            ) {
                $tertibBUJKRutin['totalTertib'] += 1;
            } elseif (
                $tertib->tertib_pengawasan_lingkup_2 === null ||
                $tertib->tertib_pengawasan_lingkup_3 === null ||
                $tertib->tertib_pengawasan_lingkup_4 === null ||
                $tertib->tertib_pengawasan_lingkup_5 === null
            ) {
                continue;
            } else {
                $tertibBUJKRutin['totalBelumTertib'] += 1;
            }
        }
        $tertibPenyelenggaraanRutin = RekapitulasiHelper::getTotalTertibPengawasan($this->rekapTertibPenyelenggaraanService->getPengawasanCount($tahun, 'Rutin'));
        $tertibPemanfaatanProdukRutin = RekapitulasiHelper::getTotalTertibPengawasan($this->rekapTertibPemanfaatanProdukService->getPengawasanCount($tahun, 'Rutin'));

        // $pengawasanInsidental = $this->pengawasanProgressService->getTotalPengawasanCount($tahun);
        $totalPengawasanInsidental =
            $this->rekapTertibUsahaService->getTotalPengawasanCount($tahun, 'Insidental') +
            $this->rekapTertibPenyelenggaraanService->getTotalPengawasanCount($tahun, 'Insidental') +
            $this->rekapTertibPemanfaatanProdukService->getTotalPengawasanCount($tahun, 'Insidental');
        $pengawasanProgress = $this->pengawasanProgressService->getTotalPengawasanCount($tahun);

        return Inertia::render('Rekapitulasi/Index', [
            'data' => [
                'totalPengawasanRutin'      => [
                    'tertibUsaha'               => [
                        'tertibBUJK' => $tertibBUJKRutin,
                    ],
                    'tertibPenyelenggaraan'     => $tertibPenyelenggaraanRutin,
                    'tertibPemanfaatanProduk'   => $tertibPemanfaatanProdukRutin,
                ],
                'totalPengawasanInsidental' => $totalPengawasanInsidental,
                'totalPengawasanProgress'   => $pengawasanProgress,
                'tertibUsaha'               => [
                    'tertibUsahaBUJK'         => $tertibUsahaBUJK,
                    'tertibUsahaPerseorangan' => $tertibUsahaPerseorangan,
                ],
                'tertibPenyelenggaraan'     => $tertibPenyelenggaraan,
                'tertibPemanfaatanProduk'   => $tertibPemanfaatanProduk,
            ],
        ]);
    }
}
