<?php

namespace App\Http\Controllers\JenisPengawasan\Progress;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Http\Resources\Pengawasan\PengawasanProgressResource;
use App\Services\Penyelenggaraan\PendataanProyekService;
use App\Services\JenisPengawasan\PengawasanProgressService;
use Illuminate\Http\Request;

class PengawasanProgressController extends Controller
{
    protected $proyekService;

    public function __construct(
        PendataanProyekService $proyekService,
        PengawasanProgressService $pengawasanService,
    )
    {
        $this->proyekService = $proyekService;
        $this->pengawasanService = $pengawasanService;
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

    public function store(string $tahun, Request $request)
    {
        $validatedData = $request->validate(['proyekId' => 'required|exists:proyek_konstruksi,id']);
        $userId = auth()->user()->id;

        $pengawasanId = $this->pengawasanService->addPengawasan([
            'proyek_konstruksi_id' => $validatedData['proyekId'],
            'tahun_pengawasan'     => $tahun,
            'created_by'           => $userId,
        ]);

        return redirect("/admin/jenis-pengawasan/progress/$tahun/$pengawasanId");
    }

    public function show(string $tahun, string $id)
    {
        $pengawasan = $this->pengawasanService->getPengawasanById($id, $tahun);

        return Inertia::render('JenisPengawasan/Progress/Show', [
            'data' => [
                'pengawasan' => new PengawasanProgressResource($pengawasan),
            ],
        ]);
    }
}
