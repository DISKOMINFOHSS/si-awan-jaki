<?php

namespace App\Http\Controllers\Rekapitulasi;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Http\Resources\Rekapitulasi\ProyekKonstruksiCollection;
use App\Services\Rekapitulasi\TertibPenyelenggaraanService;
use Illuminate\Http\Request;

class TertibPenyelenggaraanController extends Controller
{
    protected $rekapPengawasanService;

    public function __construct(
        TertibPenyelenggaraanService $rekapPengawasanService,
    ) {
        $this->rekapPengawasanService = $rekapPengawasanService;
    }

    public function index(?string $tahun = '2024')
    {
        $daftarProyekKonstruksi = $this->rekapPengawasanService->getDaftarProyekKonstruksi($tahun);

        return Inertia::render('Rekapitulasi/TertibPenyelenggaraan/Index', [
            'data' => [
                'daftarProyekKonstruksi' => new ProyekKonstruksiCollection($daftarProyekKonstruksi),
            ],
        ]);
    }
}
