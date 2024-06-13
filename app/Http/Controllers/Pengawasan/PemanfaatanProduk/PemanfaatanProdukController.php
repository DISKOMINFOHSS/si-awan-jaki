<?php

namespace App\Http\Controllers\Pengawasan\PemanfaatanProduk;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Http\Resources\Pendataan\BangunanCollection;
use App\Services\PemanfaatanProduk\PendataanBangunanService;
use Illuminate\Http\Request;

class PemanfaatanProdukController extends Controller
{
    protected $bangunanService;

    public function __construct(PendataanBangunanService $bangunanService)
    {
        $this->bangunanService = $bangunanService;
    }

    public function index()
    {
        $daftarBangunan = $this->bangunanService->getDaftarBangunan();

        return Inertia::render('Pengawasan/PemanfaatanProduk/Index', [
            'data' => [
                'daftarBangunan' => new BangunanCollection($daftarBangunan),
            ],
        ]);
    }
}
