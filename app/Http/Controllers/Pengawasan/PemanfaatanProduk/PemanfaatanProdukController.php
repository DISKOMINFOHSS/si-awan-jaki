<?php

namespace App\Http\Controllers\Pengawasan\PemanfaatanProduk;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Http\Resources\Pendataan\BangunanCollection;
use App\Http\Resources\Pengawasan\PengawasanPemanfaatanProdukCollection;
use App\Http\Resources\Pengawasan\PengawasanPemanfaatanProdukResource;
use App\Services\PemanfaatanProduk\PendataanBangunanService;
use App\Services\PemanfaatanProduk\PengawasanPemanfaatanProdukService;
use Illuminate\Http\Request;

class PemanfaatanProdukController extends Controller
{
    protected $bangunanService;
    protected $pengawasanService;

    public function __construct(
        PendataanBangunanService $bangunanService,
        PengawasanPemanfaatanProdukService $pengawasanService,
    )
    {
        $this->bangunanService = $bangunanService;
        $this->pengawasanService = $pengawasanService;
    }

    public function index()
    {
        $daftarBangunan = $this->bangunanService->getDaftarBangunan();
        $daftarPengawasan = $this->pengawasanService->getDaftarPengawasan();

        return Inertia::render('Pengawasan/PemanfaatanProduk/Index', [
            'data' => [
                'daftarBangunan'   => new BangunanCollection($daftarBangunan),
                // 'daftarPengawasan' => $daftarPengawasan,
                'daftarPengawasan' => new PengawasanPemanfaatanProdukCollection($daftarPengawasan),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'tanggal'    => 'required|date',
            'jenis'      => 'required',
            'bangunanId' => 'required|exists:bangunan,id',
        ]);
        $userId = auth()->user()->id;

        $pengawasanId = $this->pengawasanService->addPengawasan([
            'jenis_pengawasan'   => $validatedData['jenis'],
            'tanggal_pengawasan' => $validatedData['tanggal'],
            'bangunan_id'        => $validatedData['bangunanId'],
            'created_by'         => $userId,
        ]);

        return redirect("/admin/pengawasan/pemanfaatan-produk");
    }

    public function show(string $id)
    {
        $daftarLingkupPengawasan = $this->pengawasanService->getDaftarLingkupPengawasan();
        $pengawasan = $this->pengawasanService->getPengawasanById($id);

        // $pengawasan['daftarLingkupPengawasan'] = $daftarLingkupPengawasan;
        $pengawasan['daftarPemeriksaan'] = $daftarLingkupPengawasan;

        return Inertia::render('Pengawasan/PemanfaatanProduk/Show', [
            'data' => [
                'pengawasan' => new PengawasanPemanfaatanProdukResource($pengawasan),
            ],
        ]);
    }
}
