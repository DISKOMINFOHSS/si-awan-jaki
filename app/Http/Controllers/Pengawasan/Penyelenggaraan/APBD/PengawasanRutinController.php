<?php

namespace App\Http\Controllers\Pengawasan\Penyelenggaraan\APBD;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Http\Resources\Pengawasan\PengawasanPenyelenggaraanAPBDResource;
use App\Services\Penyelenggaraan\PengawasanPenyelenggaraanService;
use App\Services\Penyelenggaraan\PengawasanRutinPenyelenggaraanAPBDService;
use Illuminate\Http\Request;

class PengawasanRutinController extends Controller
{
    protected $pengawasanService;
    protected $pengawasanRutinService;

    public function __construct(
        PengawasanPenyelenggaraanService $pengawasanService,
        PengawasanRutinPenyelenggaraanAPBDService $pengawasanRutinService,
    ) {
        $this->pengawasanService = $pengawasanService;
        $this->pengawasanRutinService = $pengawasanRutinService;
    }

    public function show(string $id)
    {
        $pengawasan = $this->pengawasanService->getPengawasanById($id);
        $proyekId = $pengawasan->proyekKonstruksi->id;

        $pengawasan['daftar_lingkup_pengawasan'] = $this->pengawasanRutinService->getDaftarLingkupPengawasan($id, $proyekId);
        $pengawasan['rekomendasi'] = $this->pengawasanService->getRekomendasiPengawasanByPengawasanId($id);

        return Inertia::render('Pengawasan/Penyelenggaraan/APBD/Rutin/Show', [
            'data' => [
                'pengawasan' => new PengawasanPenyelenggaraanAPBDResource($pengawasan),
            ],
        ]);
    }

    public function store(string $id, Request $request)
    {
        if (!$this->pengawasanService->checkPengawasanExists($id)) {
            return back()->withErrors(['message' => 'Pengawasan tidak ditemukan.']);
        }

        $validatedData = $request->validate([
            'lingkupId'    => 'required|exists:master_lingkup_pengawasan_penyelenggaraan,id',
            'kesimpulan.*' => 'required|boolean',
        ]);
        $userId = auth()->user()->id;

        // dd($request->all());
        $this->pengawasanRutinService->addPemeriksaanPengawasan([
            'pengawasan_id'          => $id,
            'lingkup_id'             => $validatedData['lingkupId'],
            'kesimpulan_pemeriksaan' => json_encode($validatedData['kesimpulan']),
            'catatan_pemeriksaan'    => json_encode($request->input('catatan')),
            'created_by'             => $userId,
        ]);

        return redirect("/admin/pengawasan/penyelenggaraan/APBD/rutin/$id");
    }

    public function recommendation(string $id)
    {
        $pengawasan = $this->pengawasanService->getPengawasanById($id);
        $pengawasan['rekomendasi'] = $this->pengawasanService->getRekomendasiPengawasanByPengawasanId($id);

        return Inertia::render('Pengawasan/Penyelenggaraan/APBD/Rekomendasi', [
            'data' => [
                'pengawasan' => new PengawasanPenyelenggaraanAPBDResource($pengawasan),
            ],
        ]);
    }

    public function showSimak(string $id)
    {
        $pengawasan = $this->pengawasanService->getPengawasanById($id);
        $proyekId = $pengawasan->proyekKonstruksi->id;

        $pengawasan['daftar_lingkup_pengawasan'] = $this->pengawasanRutinService->getDaftarLingkupPengawasan($id, $proyekId);

        return Inertia::render('Pengawasan/Penyelenggaraan/APBD/Rutin/Simak', [
            'data' => [
                'pengawasan' => new PengawasanPenyelenggaraanAPBDResource($pengawasan),
            ],
        ]);
    }
}
