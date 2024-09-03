<?php

namespace App\Http\Controllers\Rekapitulasi;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Http\Resources\Rekapitulasi\BangunanCollection;
use App\Services\Rekapitulasi\TertibPemanfaatanProdukService;
use Illuminate\Http\Request;

class TertibPemanfaatanProdukController extends Controller
{
    protected $rekapPengawasanService;

    public function __construct(
        TertibPemanfaatanProdukService $rekapPengawasanService,
    ) {
        $this->rekapPengawasanService = $rekapPengawasanService;
    }

    public function index(?string $tahun = '2024')
    {
        $daftarBangunan = $this->rekapPengawasanService->getDaftarBangunan($tahun);

        return Inertia::render('Rekapitulasi/TertibPemanfaatanProduk/Index', [
            'data' => [
                'daftarBangunan' => $daftarBangunan,
                'daftarBangunanv2' => new BangunanCollection($daftarBangunan),
            ],
        ]);
    }

    public function store(string $tahun, Request $request)
    {
        $validatedData = $request->validate([
            'bangunanId'            => 'required|exists:bangunan,id',
            'kesesuaianFungsi'      => 'required|boolean',
            'kesesuaianLokasi'      => 'required|boolean',
            'rencanaUmurKonstruksi' => 'required|boolean',
            'kapasitasBeban'        => 'required|boolean',
            'pemeliharaanBangunan'  => 'required|boolean',
            'programPemeliharaan'   => 'required|boolean',
            'tertibPengawasan'      => 'required|boolean',
            'catatan'               => 'nullable',
        ]);
        $userId = auth()->user()->id;

        $this->rekapPengawasanService->storeVerifikasiPengawasanTahunan(
            $tahun,
            $validatedData['bangunanId'],
            [
                'tertib_kesesuaian_fungsi'       => $validatedData['kesesuaianFungsi'],
                'tertib_kesesuaian_lokasi'       => $validatedData['kesesuaianLokasi'],
                'tertib_rencana_umur_konstruksi' => $validatedData['rencanaUmurKonstruksi'],
                'tertib_kapasitas_beban'         => $validatedData['kapasitasBeban'],
                'tertib_pemeliharaan_bangunan'   => $validatedData['pemeliharaanBangunan'],
                'tertib_program_pemeliharaan'    => $validatedData['programPemeliharaan'],
                'tertib_pengawasan'              => $validatedData['tertibPengawasan'],
                'catatan'                        => $validatedData['catatan'],
                'created_by'                     => $userId,
            ],
        );

        return redirect()->back();
    }

    public function show(string $tahun)
    {
        $daftarBangunan = $this->rekapPengawasanService->getDaftarBangunan($tahun);

        return Inertia::render('Rekapitulasi/TertibPemanfaatanProduk/Show', [
            'data' => [
                'daftarBangunan' => new BangunanCollection($daftarBangunan),
            ],
        ]);
    }
}
