<?php

namespace App\Http\Controllers\Pengawasan\Usaha\Lingkup4;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Services\Usaha\PendataanUsahaService;
use App\Services\Usaha\PengawasanUsahaService;
use App\Services\Usaha\PengawasanLingkup4Service;
use Illuminate\Http\Request;

class UsahaPerseoranganController extends Controller
{
    protected $usahaService;
    protected $pengawasanService;

    public function __construct(
        PendataanUsahaService $usahaService,
        PengawasanUsahaService $pengawasanService,
        PengawasanLingkup4Service $pengawasanLingkup4Service,
    ) {
        $this->usahaService = $usahaService;
        $this->pengawasanService = $pengawasanService;
        $this->pengawasanLingkup4Service = $pengawasanLingkup4Service;
    }

    public function index()
    {
        $lingkupPengawasan = $this->pengawasanService->getLingkupPengawasan(4);
        $daftarUsaha = $this->usahaService->getDaftarUsahaByJenisUsaha('Usaha Orang Perseorangan');

        $daftarPengawasan = $this->pengawasanLingkup4Service->getDaftarPengawasanUsahaPerseorangan();

        return Inertia::render('Pengawasan/Usaha/UsahaPerseorangan/Index', [
            'data' => [
                'lingkupPengawasan' => $lingkupPengawasan,
                'daftarUsaha'       => $daftarUsaha,
                'daftarPengawasan'  => $daftarPengawasan,
            ]
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'usahaId' => 'required|exists:usaha,id',
            'tanggal' => 'required|date',
            'jenis'   => 'required',
        ]);
        $userId = auth()->user()->id;

        $pengawasanId = $this->pengawasanLingkup4Service->addPengawasanUsahaPerseorangan([
            'jenis_pengawasan'      => $validatedData['jenis'],
            'tanggal_pengawasan'    => $validatedData['tanggal'],
            'usaha_id'              => $validatedData['usahaId'],
            'created_by'            => $userId,
        ]);

        return redirect("/admin/pengawasan/usaha/4/usaha-perseorangan/$pengawasanId");
    }
}
