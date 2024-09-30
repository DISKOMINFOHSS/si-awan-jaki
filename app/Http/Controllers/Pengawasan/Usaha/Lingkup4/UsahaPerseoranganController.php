<?php

namespace App\Http\Controllers\Pengawasan\Usaha\Lingkup4;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Http\Resources\Pengawasan\TertibUsaha\PengawasanUsahaPerseoranganResource;
use App\Services\Usaha\PendataanUsahaService;
use App\Services\Usaha\PendataanUsahaPerseoranganService;
use App\Services\Usaha\PengawasanUsahaService;
use App\Services\Usaha\PengawasanLingkup4Service;
use Illuminate\Http\Request;

class UsahaPerseoranganController extends Controller
{
    protected $usahaService;
    protected $pengawasanService;
    protected $usahaPerseoranganService;

    public function __construct(
        PendataanUsahaService $usahaService,
        PendataanUsahaPerseoranganService $usahaPerseoranganService,
        PengawasanUsahaService $pengawasanService,
        PengawasanLingkup4Service $pengawasanLingkup4Service,
    ) {
        $this->usahaService = $usahaService;
        $this->usahaPerseoranganService = $usahaPerseoranganService;
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

    public function show(string $id)
    {
        $lingkupPengawasan = $this->pengawasanService->getLingkupPengawasan(4);
        $pengawasan = $this->pengawasanLingkup4Service->getPengawasanUsahaPerseoranganById($id);
        $pengawasan['sertifikat_standar'] = $this->usahaPerseoranganService->getDaftarSertifikatStandarAktif($pengawasan->usaha->id);

        return Inertia::render('Pengawasan/Usaha/UsahaPerseorangan/Show', [
            'data' => [
                'lingkupPengawasan' => $lingkupPengawasan,
                'pengawasan'        => new PengawasanUsahaPerseoranganResource($pengawasan),
            ],
        ]);
    }

    public function verify(string $id, Request $request)
    {
        if (!$this->pengawasanLingkup4Service->checkPengawasanUsahaPerseoranganExists($id)) {
            return back()->withErrors(['message' => 'Pengawasan tidak ditemukan.']);
        }

        $validatedData = $request->validate([
            'syaratSKK'        => 'required|boolean',
            'syaratNIB'        => 'required|boolean',
            'tertibPengawasan' => 'required|boolean',
            'catatan'          => 'nullable',
        ]);
        $userId = auth()->user()->id;

        $this->pengawasanLingkup4Service->verifyPengawasanUsahaPerseorangan(
            $id,
        [
            'tertib_persyaratan_skk' => $validatedData['syaratSKK'],
            'tertib_persyaratan_nib' => $validatedData['syaratNIB'],
            'tertib_pengawasan'      => $validatedData['tertibPengawasan'],
            'catatan'                => $validatedData['catatan'],
            'verified_by'            => $userId,
        ]);

        return back();
    }

    // public function destroy(string $id)
    // {
    //     if (!$this->pengawasanLingkup4Service->checkPengawasanUsahaPerseoranganExists($id)) {
    //         return back()->withErrors(['message' => 'Pengawasan tidak ditemukan.']);
    //     }

    //     $this->pengawasan
    // }
}
