<?php

namespace App\Http\Controllers\Pengawasan\Usaha;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Http\Resources\Pengawasan\PengawasanBUJKLingkup4Collection;
use App\Http\Resources\Pengawasan\PengawasanRutinBUJKLingkup4Resource;
use App\Services\JenisPengawasan\PengawasanRutinTertibUsahaService;
use App\Services\Usaha\PendataanBUJKService;
use App\Services\Usaha\PendataanUsahaService;
use App\Services\Usaha\PengawasanUsahaService;
use App\Services\Usaha\PengawasanLingkup4Service;
use Illuminate\Http\Request;

class Lingkup4Controller extends Controller
{
    protected $usahaService;
    protected $bujkService;
    protected $pengawasanService;
    protected $pengawasanLingkup4Service;
    protected $pengawasanRutinService;

    public function __construct(
        PendataanUsahaService $usahaService,
        PendataanBUJKService $bujkService,
        PengawasanUsahaService $pengawasanService,
        PengawasanLingkup4Service $pengawasanLingkup4Service,
        PengawasanRutinTertibUsahaService $pengawasanRutinService,
    )
    {
        $this->usahaService = $usahaService;
        $this->bujkService = $bujkService;
        $this->pengawasanService = $pengawasanService;
        $this->pengawasanLingkup4Service = $pengawasanLingkup4Service;
        $this->pengawasanRutinService = $pengawasanRutinService;
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'usahaId' => 'required|exists:usaha,id',
            'tanggal' => 'required|date',
            'jenis'   => 'required',
        ]);
        $userId = auth()->user()->id;

        $usaha = $this->usahaService->getUsahaById($validatedData['usahaId']);
        $jenisUsaha = $usaha->jenisUsaha;
        $pengawasanId;

        $data = [
            'jenis_pengawasan'    => $validatedData['jenis'],
            'tanggal_pengawasan'  => $validatedData['tanggal'],
            'usaha_id'            => $validatedData['usahaId'],
            'created_by'          => $userId,
        ];

        if ($jenisUsaha->jenisUsaha === "Badan Usaha Jasa Konstruksi")
        {
            $pengawasanId = $this->pengawasanLingkup4Service->addPengawasanBUJK($data);

            if ($validatedData['jenis'] === 'Rutin')
            {
                $tanggalPengawasan = strtotime($validatedData['tanggal']);
                $tahunPengawasan = date('Y', $tanggalPengawasan);

                $this->pengawasanRutinService->addPengawasanRutinBUJK(
                    $validatedData['usahaId'],
                    [
                        'start' => ($tanggalPengawasan >= strtotime($tahunPengawasan . '-01-01')) && ($tanggalPengawasan <= strtotime($tahunPengawasan . '-06-30')) ? ($tahunPengawasan . '-01-01') : ($tahunPengawasan . '-07-01'),
                        'end'   => ($tanggalPengawasan >= strtotime($tahunPengawasan . '-01-01')) && ($tanggalPengawasan <= strtotime($tahunPengawasan . '-06-30')) ? ($tahunPengawasan . '-06-30') : ($tahunPengawasan . '-12-31'),
                    ],
                    [
                        'pengawasan_lingkup_4' => $pengawasanId,
                        // 'created_at'           => now(),
                        // 'updated_at'           => now(),
                    ],
                );
            }
        }

        $jenisPengawasan = strtolower($validatedData['jenis']);
        return redirect("/admin/pengawasan/usaha/4/$jenisUsaha->slug/$pengawasanId/$jenisPengawasan");
    }

    public function indexBUJK()
    {
        $lingkupPengawasan = $this->pengawasanService->getLingkupPengawasan(4);
        $daftarUsaha = $this->bujkService->getDaftarBUJK();

        $daftarPengawasan = $this->pengawasanLingkup4Service->getDaftarPengawasanBUJK();

        return Inertia::render('Pengawasan/Usaha/BUJK/Lingkup4/Index', [
            'data' => [
                'lingkupPengawasan' => $lingkupPengawasan,
                'daftarPengawasan'  => new PengawasanBUJKLingkup4Collection($daftarPengawasan),
                'daftarUsaha'       => $daftarUsaha,
            ],
        ]);
    }

    public function showPengawasanRutinBUJK(string $id)
    {
        $lingkupPengawasan = $this->pengawasanService->getLingkupPengawasan(4);

        $pengawasan = $this->pengawasanLingkup4Service->getPengawasanBUJKById($id);
        $pengawasan['usaha']['sertifikat_standar'] = $this->bujkService->getDaftarSertifikatStandarBUJKAktif($pengawasan->usaha->id);

        return Inertia::render('Pengawasan/Usaha/BUJK/Lingkup4/Rutin/Show', [
            'data' => [
                'lingkupPengawasan' => $lingkupPengawasan,
                'pengawasan'        => new PengawasanRutinBUJKLingkup4Resource($pengawasan),
            ],
        ]);
    }

    public function verifyPengawasanRutinBUJK(string $id, Request $request)
    {
        if (!$this->pengawasanLingkup4Service->checkPengawasanBUJKExists($id)) {
            return back()->withErrors(['message' => 'Pengawasan tidak ditemukan.']);
        }

        $validatedData = $request->validate([
            'syaratSBU'        => 'required|boolean',
            'syaratNIB'        => 'required|boolean',
            'tertibPengawasan' => 'required|boolean',
            'catatan'          => 'nullable',
        ]);
        $userId = auth()->user()->id;

        $this->pengawasanLingkup4Service->verifyPengawasanBUJK(
            $id,
        [
            'tertib_persyaratan_sbu' => $validatedData['syaratSBU'],
            'tertib_persyaratan_nib' => $validatedData['syaratNIB'],
            'tertib_pengawasan'      => $validatedData['tertibPengawasan'],
            'catatan'                => $validatedData['catatan'],
            'verified_by'            => $userId,
        ]);

        return redirect("/admin/pengawasan/usaha/4/bujk/$id/rutin");
    }
}
