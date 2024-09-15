<?php

namespace App\Http\Controllers\Pengawasan\Penyelenggaraan\APBD;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Http\Resources\Pengawasan\TertibPenyelenggaraan\PengawasanInsidentalAPBDResource;
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
                'pengawasan' => new PengawasanInsidentalAPBDResource($pengawasan),
            ],
        ]);
    }

    public function store(string $id, Request $request)
    {
        if (!$this->pengawasanService->checkPengawasanExists($id)) {
            return back()->withErrors(['message' => 'Pengawasan tidak ditemukan.']);
        }

        $validatedData = $request->validate([
            'indikatorId' => 'required|exists:master_indikator_pengawasan_penyelenggaraan_dana_apbd,id',
            'hasil'       => 'required|array',
            'catatan'     => 'required|array',
        ]);
        $userId = auth()->user()->id;

        $this->pengawasanInsidentalService->addPemeriksaanPengawasan(
            $id,
            $validatedData['indikatorId'],
            [
                'kesimpulan_pemeriksaan' => json_encode($validatedData['hasil']),
                'catatan_pemeriksaan'    => json_encode($validatedData['catatan']),
                'created_by'             => $userId,
            ],
        );

        return back();
    }

    public function recommendation(string $id)
    {
        $pengawasan = $this->pengawasanService->getPengawasanById($id);

        return Inertia::render('Pengawasan/Penyelenggaraan/APBD/Rekomendasi', [
            'data' => [
                'pengawasan' => new PengawasanInsidentalAPBDResource($pengawasan),
            ],
        ]);
    }
}
