<?php

namespace App\Http\Controllers\Rekapitulasi;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Http\Resources\Rekapitulasi\PengawasanTertibUsahaBUJKResource;
use App\Services\Rekapitulasi\TertibUsahaService;
use Illuminate\Http\Request;

class TertibUsahaController extends Controller
{
    protected $rekapPengawasanService;

    public function __construct(
        TertibUsahaService $rekapPengawasanService,
    ) {
        $this->rekapPengawasanService = $rekapPengawasanService;
    }

    public function index(string $tahun)
    {
        $daftarTertibUsahaBUJK = $this->rekapPengawasanService->getDaftarTertibUsahaBUJKTahunanWithPengawasanRutin($tahun);

        return Inertia::render('Rekapitulasi/TertibUsaha/Index', [
            'data' => [
                'daftarTertibUsahaBUJK' => PengawasanTertibUsahaBUJKResource::collection($daftarTertibUsahaBUJK),
            ],
        ]);
    }

    public function show(string $tahun, string $fileName)
    {
        return Inertia::render('Rekapitulasi/TertibUsaha/Show');
    }
}
