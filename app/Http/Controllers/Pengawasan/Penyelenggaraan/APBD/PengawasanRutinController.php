<?php

namespace App\Http\Controllers\Pengawasan\Penyelenggaraan\APBD;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Http\Resources\Pengawasan\PengawasanPenyelenggaraanAPBDResource;
use App\Services\Penyelenggaraan\PengawasanPenyelenggaraanService;
use Illuminate\Http\Request;

class PengawasanRutinController extends Controller
{
    protected $pengawasanService;

    public function __construct(
        PengawasanPenyelenggaraanService $pengawasanService
    ) {
        $this->pengawasanService = $pengawasanService;
    }

    public function show(string $id)
    {
        $pengawasan = new PengawasanPenyelenggaraanAPBDResource($this->pengawasanService->getPengawasanById($id));

        return Inertia::render('Pengawasan/Penyelenggaraan/APBD/Rutin/Show', [
            'data' => [
                'pengawasan' => $pengawasan,
            ],
        ]);
    }
}
