<?php

namespace App\Http\Controllers\Pengawasan\Usaha;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Services\Usaha\PendataanUsahaService;
use App\Services\Usaha\PengawasanUsahaService;
use App\Services\Usaha\PengawasanLingkup1Service;
use Illuminate\Http\Request;

class UsahaRantaiPasokController extends Controller
{
    protected $usahaService;
    protected $pengawasanService;
    protected $pengawasanLingkup1Service;

    public function __construct(
        PendataanUsahaService $usahaService,
        PengawasanUsahaService $pengawasanService,
        PengawasanLingkup1Service $pengawasanLingkup1Service,
    ) {
        $this->usahaService = $usahaService;
        $this->pengawasanService = $pengawasanService;
        $this->pengawasanLingkup1Service = $pengawasanLingkup1Service;
    }

    public function category()
    {
        $lingkupPengawasan = $this->pengawasanService->getLingkupPengawasan(1);
        $daftarObjek = $this->usahaService->getDaftarJenisRantaiPasok();

        return Inertia::render('Pengawasan/Usaha/Category', [
            'data' => [
                'lingkupPengawasan'     => $lingkupPengawasan,
                'daftarObjekPengawasan' => $daftarObjek,
            ],
        ]);
    }

    public function index(string $jenis_rantai_pasok)
    {
        $lingkupPengawasan = $this->pengawasanService->getLingkupPengawasan(1);
        $jenisRantaiPasok = $this->usahaService->getJenisRantaiPasokBySlug($jenis_rantai_pasok);

        $daftarUsaha = $this->usahaService->getDaftarUsahaRantaiPasokBySlug($jenis_rantai_pasok);

        return Inertia::render('Pengawasan/Usaha/UsahaRantaiPasok/Index', [
            'data' => [
                'lingkupPengawasan' => $lingkupPengawasan,
                'jenisRantaiPasok'  => $jenisRantaiPasok,
                'daftarUsaha'       => $daftarUsaha,
            ],
        ]);
    }

    public function store(string $jenis_rantai_pasok, Request $request)
    {
        $validatedData = $request->validate([
            'usahaId'                        => 'required|exists:usaha,id',
            'tanggal'                        => 'required|date',
            'jenis'                          => 'required',
            'kepemilikanPerizinanBerusaha'   => 'required|boolean',
            'keabsahanPerizinanBerusaha'     => 'required|boolean',
            'kapasitasTerpasang'             => 'nullable|boolean',
            'kepemilikanPerizinanPenggunaan' => 'nullable|boolean',
            'keabsahanPerizinanPenggunaan'   => 'nullable|boolean',
        ]);
        $userId = auth()->user()->id;

        $pengawasanId = $this->pengawasanLingkup1Service->addPengawasan([
            'jenis_pengawasan'                 => $validatedData['jenis'],
            'tanggal_pengawasan'               => $validatedData['tanggal'],
            'usaha_id'                         => $validatedData['usahaId'],
            'kepemilikan_perizinan_berusaha'   => $validatedData['kepemilikanPerizinanBerusaha'],
            'keabsahan_perizinan_berusaha'     => $validatedData['keabsahanPerizinanBerusaha'],
            'kapasitas_terpasang'              => $request->input('kapasitasTerpasang'),
            'kepemilikan_perizinan_penggunaan' => $request->input('kepemilikanPerizinanPenggunaan'),
            'keabsahan_perizinan_penggunaan'   => $request->input('keabsahanPerizinanPenggunaan'),
            'created_by'                       => $userId,
        ]);

        return redirect("/admin/pengawasan/usaha/1/$jenis_rantai_pasok/$pengawasanId");
    }

    public function show(string $jenis_rantai_pasok, string $id)
    {
        $lingkupPengawasan = $this->pengawasanService->getLingkupPengawasan(1);
        $jenisRantaiPasok = $this->usahaService->getJenisRantaiPasokBySlug($jenis_rantai_pasok);

        return Inertia::render('Pengawasan/Usaha/UsahaRantaiPasok/Show', [
            'data' => [
                'lingkupPengawasan' => $lingkupPengawasan,
                'jenisRantaiPasok'  => $jenisRantaiPasok,
            ],
        ]);
    }
}
