<?php

namespace App\Http\Controllers\Pengawasan\Usaha;

use Inertia\Inertia;
use App\Helpers\DateTimeHelper;
use App\Http\Controllers\Controller;
use App\Http\Resources\Pengawasan\PengawasanBUJKLingkup4Collection;
use App\Http\Resources\Pengawasan\PengawasanRutinBUJKLingkup4Resource;
use App\Services\JenisPengawasan\PengawasanRutinTertibUsahaService;
use App\Services\Usaha\PendataanBUJKService;
use App\Services\Usaha\PendataanUsahaService;
use App\Services\Usaha\PengawasanUsahaService;
use App\Services\Usaha\PengawasanLingkup2Service;
use App\Services\Usaha\PengawasanLingkup3Service;
use App\Services\Usaha\PengawasanLingkup4Service;
use App\Services\Usaha\PengawasanLingkup5Service;
use Illuminate\Http\Request;

class Lingkup4Controller extends Controller
{
    protected $usahaService;
    protected $bujkService;
    protected $pengawasanService;
    protected $pengawasanLingkup2Service;
    protected $pengawasanLingkup3Service;
    protected $pengawasanLingkup4Service;
    protected $pengawasanLingkup5Service;
    protected $pengawasanRutinService;

    public function __construct(
        PendataanUsahaService $usahaService,
        PendataanBUJKService $bujkService,
        PengawasanUsahaService $pengawasanService,
        PengawasanLingkup2Service $pengawasanLingkup2Service,
        PengawasanLingkup3Service $pengawasanLingkup3Service,
        PengawasanLingkup4Service $pengawasanLingkup4Service,
        PengawasanLingkup5Service $pengawasanLingkup5Service,
        PengawasanRutinTertibUsahaService $pengawasanRutinService,
    )
    {
        $this->usahaService = $usahaService;
        $this->bujkService = $bujkService;
        $this->pengawasanService = $pengawasanService;
        $this->pengawasanLingkup2Service = $pengawasanLingkup2Service;
        $this->pengawasanLingkup3Service = $pengawasanLingkup3Service;
        $this->pengawasanLingkup4Service = $pengawasanLingkup4Service;
        $this->pengawasanLingkup5Service = $pengawasanLingkup5Service;
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

        // $data = [
        //     'jenis_pengawasan'    => $validatedData['jenis'],
        //     'tanggal_pengawasan'  => $validatedData['tanggal'],
        //     'usaha_id'            => $validatedData['usahaId'],
        //     'created_by'          => $userId,
        // ];

        if ($jenisUsaha->jenisUsaha === "Badan Usaha Jasa Konstruksi")
        {
            $data = [
                'jenis_pengawasan'      => $validatedData['jenis'],
                'tanggal_pengawasan'    => $validatedData['tanggal'],
                'usaha_id'              => $validatedData['usahaId'],
                'status_izin_usaha'     => "Aktif",
                'status_verifikasi_nib' => true,
                'created_by'            => $userId,
            ];

            if ($validatedData['jenis'] === 'Rutin')
            {
                $pengawasanRutin = $this->pengawasanRutinService->getPengawasanRutinBUJK(
                    $validatedData['usahaId'],
                    // DateTimeHelper::getHalfYearDateRange($validatedData['tanggal'])
                    DateTimeHelper::getYearDateRange($validatedData['tanggal'])
                );

                if ($pengawasanRutin->pengawasan_lingkup_4) {
                    return back()->withErrors(['message' => 'Pengawasan pada semester ini sudah ada.']);
                }

                if (!$pengawasanRutin->pengawasan_lingkup_2) {
                    $pengawasan['pengawasan_lingkup_2'] = $this->pengawasanLingkup2Service->addPengawasanBUJK($data);
                }

                if (!$pengawasanRutin->pengawasan_lingkup_3) {
                    $pengawasan['pengawasan_lingkup_3'] = $this->pengawasanLingkup3Service->addPengawasanBUJK($data);
                }

                if (!$pengawasanRutin->pengawasan_lingkup_5) {
                    $pengawasan['pengawasan_lingkup_5'] = $this->pengawasanLingkup5Service->addPengawasanBUJK($data);
                }
            }

            $pengawasanId = $this->pengawasanLingkup4Service->addPengawasanBUJK($data);

            if ($validatedData['jenis'] === 'Rutin')
            {
                // $this->pengawasanRutinService->updatePengawasanRutinBUJK($pengawasanRutin->id, ['pengawasan_lingkup_4' => $pengawasanId]);
                $pengawasan['tanggal_pengawasan'] = $validatedData['tanggal'];
                $pengawasan['pengawasan_lingkup_4'] = $pengawasanId;
                $this->pengawasanRutinService->updatePengawasanRutinBUJK($pengawasanRutin->id, $pengawasan);
            }
        }

        $jenisPengawasan = strtolower($validatedData['jenis']);
        return redirect("/admin/pengawasan/usaha/4/$jenisUsaha->slug/$pengawasanId/$jenisPengawasan");
    }

    public function update(string $id, Request $request)
    {
        if (!$this->pengawasanLingkup4Service->checkPengawasanBUJKExists($id)) {
            return back()->withErrors(['message' => 'Pengawasan tidak ditemukan.']);
        }

        $validatedData = $request->validate(['tanggal' => 'required|date']);

        $pengawasan = $this->pengawasanLingkup4Service->getPengawasan($id);
        $jenisUsaha = $pengawasan->usaha->jenisUsaha;

        if ($jenisUsaha->jenis_usaha === "Badan Usaha Jasa Konstruksi")
        {
            if ($pengawasan->jenis_pengawasan === "Rutin")
            {
                $pengawasanRutin = $this->pengawasanRutinService->getPengawasanRutinBUJKByLingkup4Id($pengawasan->id);
                // $range = DateTimeHelper::getHalfYearDateRange($validatedData['tanggal']);
                $range = DateTimeHelper::getYearDateRange($validatedData['tanggal']);

                if ($pengawasanRutin->start !== $range['start'] || $pengawasanRutin->end !== $range['end'])
                {
                    $pengawasanRutin2 = $this->pengawasanRutinService->getPengawasanRutinBUJK($pengawasan->usaha_id, $range);

                    if ($pengawasanRutin2->pengawasan_lingkup_4)
                    {
                        return back()->withErrors(['message' => 'Pengawasan pada semester ini sudah ada.']);
                    }

                    $this->pengawasanRutinService->updatePengawasanRutinBUJK(
                        $pengawasanRutin->id,
                        ['pengawasan_lingkup_4' => null]
                    );
                    $this->pengawasanRutinService->updatePengawasanRutinBUJK(
                        $pengawasanRutin2->id,
                        ['pengawasan_lingkup_4' => $pengawasan->id]
                    );
                }
            }

            $this->pengawasanLingkup4Service->updatePengawasan(
                $id,
                [
                    'tanggal_pengawasan'    => $validatedData['tanggal'],
                ]
            );
        }

        $jenisPengawasan = strtolower($pengawasan->jenis_pengawasan);
        return redirect("/admin/pengawasan/usaha/4/$jenisUsaha->slug/$pengawasan->id/$jenisPengawasan");
    }

    public function destroy(string $id)
    {
        if (!$this->pengawasanLingkup4Service->checkPengawasanBUJKExists($id)) {
            return back()->withErrors(['message' => 'Pengawasan tidak ditemukan.']);
        }

        $pengawasan = $this->pengawasanLingkup4Service->getPengawasan($id);
        $jenisUsaha = $pengawasan->usaha->jenisUsaha;

        if ($jenisUsaha->jenis_usaha === "Badan Usaha Jasa Konstruksi")
        {
            if ($pengawasan->jenis_pengawasan === "Rutin")
            {
                $pengawasanRutin = $this->pengawasanRutinService->getPengawasanRutinBUJKByLingkup4Id($pengawasan->id);
                $this->pengawasanRutinService->updatePengawasanRutinBUJK(
                    $pengawasanRutin->id,
                    ['pengawasan_lingkup_4' => null]
                );
            }

            $this->pengawasanLingkup4Service->deletePengawasanBUJK($id);
        }

        return redirect("/admin/pengawasan/usaha/4/$jenisUsaha->slug");
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

        if ($pengawasan->jenis_pengawasan === 'Rutin') {
            $pengawasan['pengawasan_rutin_id'] = $this->pengawasanRutinService->getPengawasanRutinBUJKByLingkup4Id($pengawasan->id)->id;
        }

        return Inertia::render('Pengawasan/Usaha/BUJK/Lingkup4/Rutin/Show', [
            'data' => [
                'lingkupPengawasan' => $lingkupPengawasan,
                'pengawasan'        => new PengawasanRutinBUJKLingkup4Resource($pengawasan),
            ],
        ]);
    }

    public function verifyPengawasanBUJK(string $id, Request $request)
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

        // return redirect("/admin/pengawasan/usaha/4/bujk/$id/rutin");
        return back();
    }
}
