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
        $pengawasan['daftar_lingkup_pengawasan'] = $this->pengawasanRutinService->getDaftarLingkupPengawasan();

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
            'lingkupId'      => 'required|exists:master_lingkup_pengawasan_penyelenggaraan,id',
            'kesimpulan.*.*' => 'required|boolean',
        ]);

        dd($request->all());

        return redirect("/admin/pengawasan/penyelenggaraan/APBD/rutin/$id");
    }
}
