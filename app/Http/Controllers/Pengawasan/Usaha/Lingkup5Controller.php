<?php

namespace App\Http\Controllers\Pengawasan\Usaha;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Http\Resources\Pengawasan\PengawasanBUJKLingkup5Collection;
use App\Http\Resources\Pengawasan\PengawasanBUJKLingkup5Resource;
use App\Services\Usaha\PendataanBUJKService;
use App\Services\Usaha\PengawasanUsahaService;
use App\Services\Usaha\PengawasanLingkup5Service;
use Illuminate\Http\Request;

class Lingkup5Controller extends Controller
{
    protected $bujkService;
    protected $pengawasanService;

    public function __construct(
        PendataanBUJKService $bujkService,
        PengawasanUsahaService $pengawasanService,
        PengawasanLingkup5Service $pengawasanLingkup5Service,
    )
    {
        $this->bujkService = $bujkService;
        $this->pengawasanService = $pengawasanService;
        $this->pengawasanLingkup5Service = $pengawasanLingkup5Service;
    }

    public function index()
    {
        $lingkupPengawasan = $this->pengawasanService->getLingkupPengawasan(5);
        $daftarUsaha = $this->bujkService->getDaftarBUJK();

        $daftarPengawasan = $this->pengawasanLingkup5Service->getDaftarPengawasanBUJK();

        return Inertia::render('Pengawasan/Usaha/BUJK/Lingkup5/Index', [
            'data' => [
                'lingkupPengawasan' => $lingkupPengawasan,
                'daftarPengawasan'  => new PengawasanBUJKLingkup5Collection($daftarPengawasan),
                'daftarUsaha'       => $daftarUsaha,
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'usahaId'         => 'required',
            'tanggal'         => 'required|date',
            'jenis'           => 'required',
        ]);
        $userId = auth()->user()->id;

        $pengawasanId = $this->pengawasanLingkup5Service->addPengawasanBUJK([
            'jenis_pengawasan'      => $validatedData['jenis'],
            'tanggal_pengawasan'    => $validatedData['tanggal'],
            'usaha_id'              => $validatedData['usahaId'],
            'created_by'            => $userId,
        ]);

        return redirect("/admin/pengawasan/usaha/5");
    }

    public function show(string $id)
    {
        $lingkupPengawasan = $this->pengawasanService->getLingkupPengawasan(5);

        $pengawasan = $this->pengawasanLingkup5Service->getPengawasanBUJKById($id);
        $pengawasan['daftar_pemeriksaan'] = $this->pengawasanLingkup5Service->getDaftarPemeriksaan();

        return Inertia::render('Pengawasan/Usaha/BUJK/Lingkup5/Show', [
            'data' => [
                'lingkupPengawasan' => $lingkupPengawasan,
                'pengawasan'        => new PengawasanBUJKLingkup5Resource($pengawasan),
            ],
        ]);
    }

    // public function storePemeriksaan(string $id, string $pemeriksaan_id, Request $request)
    // {

    // }
}
