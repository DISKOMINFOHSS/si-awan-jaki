<?php

namespace App\Http\Controllers\JenisPengawasan\Progress;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Services\Penyelenggaraan\PendataanProyekService;
use Illuminate\Http\Request;

class PengawasanProgressController extends Controller
{
    protected $proyekService;

    public function __construct(
        PendataanProyekService $proyekService,
    )
    {
        $this->proyekService = $proyekService;
    }

    public function index(string $tahun)
    {
        $daftarProyekKonstruksi = $this->proyekService->getDaftarProyekKonstruksiByTahunAnggaran($tahun);

        return Inertia::render('JenisPengawasan/Progress/Index', [
            'data' => [
                'daftarProyekKonstruksi' => $daftarProyekKonstruksi,
            ],
        ]);
    }
}
