<?php

namespace App\Http\Controllers\Pengawasan\Penyelenggaraan\APBD;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Services\Penyelenggaraan\PengawasanPenyelenggaraanService;
use App\Services\Penyelenggaraan\PengawasanInsidentalPenyelenggaraanAPBDService;
use Illuminate\Http\Request;

class PengawasanInsidentalController extends Controller
{
    protected $pengawasanService;
    protected $pengawasanInsidentalService;

    public function __construct(
        PengawasanPenyelenggaraanService $pengawasanService,
        PengawasanInsidentalPenyelenggaraanAPBDService $pengawasanInsidentalService,
    ) {
        $this->pengawasanService = $pengawasanService;
        $this->pengawasanInsidentalService = $pengawasanInsidentalService;
    }

    public function show(string $id)
    {
        $pengawasan = $this->pengawasanService->getPengawasanById($id);
        // $proyekId = $pengawasan->proyekKonstruksi->id;

        $pengawasan['daftar_lingkup_pengawasan'] = $this->pengawasanInsidentalService->getDaftarLingkupPengawasan($id);

        return Inertia::render('Pengawasan/Penyelenggaraan/APBD/Insidental/Show', [
            'data' => [
                'pengawasan' => $pengawasan,
            ],
        ]);
    }
}
