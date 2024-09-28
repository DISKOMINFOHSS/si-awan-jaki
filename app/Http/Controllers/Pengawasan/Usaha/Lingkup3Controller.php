<?php

namespace App\Http\Controllers\Pengawasan\Usaha;

use Inertia\Inertia;
use App\Helpers\DateTimeHelper;
use App\Http\Controllers\Controller;
use App\Http\Resources\Pengawasan\PengawasanBUJKLingkup3Collection;
use App\Http\Resources\Pengawasan\PengawasanBUJKLingkup3Resource;
use App\Services\JenisPengawasan\PengawasanRutinTertibUsahaService;
use App\Services\Usaha\PendataanBUJKService;
use App\Services\Usaha\PengawasanUsahaService;
use App\Services\Usaha\PengawasanLingkup3Service;
use Illuminate\Http\Request;

class Lingkup3Controller extends Controller
{
    protected $bujkService;
    protected $pengawasanService;
    protected $pengawasanLingkup3Service;
    protected $pengawasanRutinService;

    public function __construct(
        PendataanBUJKService $bujkService,
        PengawasanUsahaService $pengawasanService,
        PengawasanLingkup3Service $pengawasanLingkup3Service,
        PengawasanRutinTertibUsahaService $pengawasanRutinService,
    )
    {
        $this->bujkService = $bujkService;
        $this->pengawasanService = $pengawasanService;
        $this->pengawasanLingkup3Service = $pengawasanLingkup3Service;
        $this->pengawasanRutinService = $pengawasanRutinService;
    }

    public function index()
    {
        $lingkupPengawasan = $this->pengawasanService->getLingkupPengawasan(3);
        $daftarUsaha = $this->bujkService->getDaftarBUJK();

        $daftarPengawasan = $this->pengawasanLingkup3Service->getDaftarPengawasanBUJK();

        return Inertia::render('Pengawasan/Usaha/BUJK/Lingkup3/Index', [
            'data' => [
                'lingkupPengawasan' => $lingkupPengawasan,
                'daftarPengawasan'  => new PengawasanBUJKLingkup3Collection($daftarPengawasan),
                'daftarUsaha'       => $daftarUsaha,
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'usahaId'         => 'required|exists:usaha,id',
            'tanggal'         => 'required|date',
            'jenis'           => 'required',
            'statusIzinUsaha' => 'required',
            'statusNIB'       => 'required|boolean',
        ]);
        $userId = auth()->user()->id;

        if ($validatedData['jenis'] === 'Rutin')
        {
            $pengawasanRutin = $this->pengawasanRutinService->getPengawasanRutinBUJK(
                $validatedData['usahaId'],
                // DateTimeHelper::getHalfYearDateRange($validatedData['tanggal'])
                DateTimeHelper::getYearDateRange($validatedData['tanggal']),
            );

            if ($pengawasanRutin->pengawasan_lingkup_3) {
                return back()->withErrors(['message' => 'Pengawasan pada semester ini sudah ada.']);
            }
        }

        $pengawasanId = $this->pengawasanLingkup3Service->addPengawasanBUJK([
            'jenis_pengawasan'      => $validatedData['jenis'],
            'tanggal_pengawasan'    => $validatedData['tanggal'],
            'usaha_id'              => $validatedData['usahaId'],
            'status_izin_usaha'     => $validatedData['statusIzinUsaha'],
            'status_verifikasi_nib' => $validatedData['statusNIB'],
            'created_by'            => $userId,
        ]);

        if ($validatedData['jenis'] === 'Rutin')
        {
            $this->pengawasanRutinService->updatePengawasanRutinBUJK($pengawasanRutin->id, ['pengawasan_lingkup_3' => $pengawasanId]);
        }

        return redirect("/admin/pengawasan/usaha/3/$pengawasanId");
    }

    public function show(string $id)
    {
        $lingkupPengawasan = $this->pengawasanService->getLingkupPengawasan(3);

        $pengawasan = $this->pengawasanLingkup3Service->getPengawasanBUJKById($id);
        $pengawasan['usaha']['sertifikat_standar'] = $this->bujkService->getDaftarSertifikatStandarBUJKAktif($pengawasan->usaha->id);
        $pengawasan['usaha']['daftar_paket_pekerjaan'] = $this->bujkService->getDaftarPaketPekerjaanByUsahaId($pengawasan->usaha->id);

        if ($pengawasan->jenis_pengawasan === 'Rutin') {
            $pengawasan['pengawasan_rutin_id'] = $this->pengawasanRutinService->getPengawasanRutinBUJKByLingkup3Id($pengawasan->id)->id;
        }

        return Inertia::render('Pengawasan/Usaha/BUJK/Lingkup3/Show', [
            'data' => [
                'lingkupPengawasan' => $lingkupPengawasan,
                'pengawasan'        => new PengawasanBUJKLingkup3Resource($pengawasan),
            ],
        ]);
    }

    public function update(string $id, Request $request)
    {
        if (!$this->pengawasanLingkup3Service->checkPengawasanBUJKExists($id)) {
            return back()->withErrors(['message' => 'Pengawasan tidak ditemukan.']);
        }

        $validatedData = $request->validate([
            'tanggal'         => 'required|date',
            'statusIzinUsaha' => 'required',
            'statusNIB'       => 'required|boolean',
        ]);

        $pengawasan = $this->pengawasanLingkup3Service->getPengawasanBUJK($id);

        if ($pengawasan->jenis_pengawasan === "Rutin")
        {
            $pengawasanRutin = $this->pengawasanRutinService->getPengawasanRutinBUJKByLingkup3Id($pengawasan->id);
            // $range = DateTimeHelper::getHalfYearDateRange($validatedData['tanggal']);
            $range = DateTimeHelper::getYearDateRange($validatedData['tanggal']);

            if ($pengawasanRutin->start !== $range['start'] || $pengawasanRutin->end !== $range['end'])
            {
                $pengawasanRutin2 = $this->pengawasanRutinService->getPengawasanRutinBUJK($pengawasan->usaha_id, $range);

                if ($pengawasanRutin2->pengawasan_lingkup_3)
                {
                    return back()->withErrors(['message' => 'Pengawasan pada semester ini sudah ada.']);
                }

                $this->pengawasanRutinService->updatePengawasanRutinBUJK(
                    $pengawasanRutin->id,
                    ['pengawasan_lingkup_3' => null]
                );
                $this->pengawasanRutinService->updatePengawasanRutinBUJK(
                    $pengawasanRutin2->id,
                    ['pengawasan_lingkup_3' => $pengawasan->id]
                );
            }
        }

        $this->pengawasanLingkup3Service->updatePengawasanBUJK(
            $id,
            [
                'tanggal_pengawasan'    => $validatedData['tanggal'],
                'status_izin_usaha'     => $validatedData['statusIzinUsaha'],
                'status_verifikasi_nib' => $validatedData['statusNIB'],
            ]
        );

        return redirect("/admin/pengawasan/usaha/3/$pengawasan->id");
    }

    public function verify(string $id, Request $request)
    {
        if (!$this->pengawasanLingkup3Service->checkPengawasanBUJKExists($id)) {
            return back()->withErrors(['message' => 'Pengawasan tidak ditemukan.']);
        }

        $validatedData = $request->validate([
            'bentukUsaha'      => 'required|boolean',
            'kualifikasiUsaha' => 'required|boolean',
            'tertibPengawasan' => 'required|boolean',
            'catatan'          => 'nullable',
        ]);
        $userId = auth()->user()->id;

        $this->pengawasanLingkup3Service->verifyPengawasanBUJK(
            $id,
        [
            'tertib_bentuk_usaha'      => $validatedData['bentukUsaha'],
            'tertib_kualifikasi_usaha' => $validatedData['kualifikasiUsaha'],
            'tertib_pengawasan'        => $validatedData['tertibPengawasan'],
            'catatan'                  => $validatedData['catatan'],
            'verified_by'              => $userId,
        ]);

        return redirect("/admin/pengawasan/usaha/3/$id");
    }

    public function destroy(string $id)
    {
        if (!$this->pengawasanLingkup3Service->checkPengawasanBUJKExists($id)) {
            return back()->withErrors(['message' => 'Pengawasan tidak ditemukan.']);
        }

        $pengawasan = $this->pengawasanLingkup3Service->getPengawasanBUJK($id);

        if ($pengawasan->jenis_pengawasan === "Rutin")
        {
            $pengawasanRutin = $this->pengawasanRutinService->getPengawasanRutinBUJKByLingkup3Id($pengawasan->id);
            $this->pengawasanRutinService->updatePengawasanRutinBUJK(
                $pengawasanRutin->id,
                ['pengawasan_lingkup_3' => null]
            );
        }

        $this->pengawasanLingkup3Service->deletePengawasanBUJK($id);

        return redirect("/admin/pengawasan/usaha/3");
    }

    public function storeKesesuaianKegiatan(string $id, Request $request)
    {
        if (!$this->pengawasanLingkup3Service->checkPengawasanBUJKExists($id)) {
            return back()->withErrors(['message' => 'Pengawasan tidak ditemukan.']);
        }

        $validatedData = $request->validate([
            'paketId'               => 'required|exists:paket_pekerjaan,id',
            'kesesuaianBentuk'      => 'required|boolean',
            'kesesuaianKualifikasi' => 'required|boolean',
        ]);
        $userId = auth()->user()->id;

        $data = [
            'pengawasan_id'          => $id,
            'paket_id'               => $validatedData['paketId'],
            'kesesuaian_bentuk'      => $validatedData['kesesuaianBentuk'],
            'kesesuaian_kualifikasi' => $validatedData['kesesuaianKualifikasi'],
        ];

        if ($request->filled('id')) {
            $data['id'] = $request->input('id');
            $this->pengawasanLingkup3Service->updateKesesuaianKegiatan($data);
        } else {
            if ($this->pengawasanLingkup3Service->checkKesesuaianKegiatanExists($id, $validatedData['paketId'])) {
                return back()->withErrors(['message' => 'Kesesuaian kegiatan sudah ada']);
            }

            $data['created_by'] = $userId;
            $this->pengawasanLingkup3Service->addKesesuaianKegiatan($data);
        }

        return redirect("/admin/pengawasan/usaha/3/$id");
    }

    public function destroyKesesuaianKegiatan(string $id, string $kesesuaian_id)
    {
        if (!$this->pengawasanLingkup3Service->checkPengawasanBUJKExists($id)) {
            return back()->withErrors(['message' => 'Pengawasan tidak ditemukan.']);
        }

        if (!$this->pengawasanLingkup3Service->checkKesesuaianKegiatanExistsById($kesesuaian_id)) {
            return back()->withErrors(['message' => 'Kesesuaian kegiatan tidak ditemukan.']);
        }

        $this->pengawasanLingkup3Service->deleteKesesuaianKegiatan($kesesuaian_id);

        return redirect("/admin/pengawasan/usaha/3/$id");
    }

    public function recommendation(string $id)
    {
        $lingkupPengawasan = $this->pengawasanService->getLingkupPengawasan(3);
        $pengawasan = $this->pengawasanLingkup3Service->getPengawasanBUJKById($id);

        if ($pengawasan->jenis_pengawasan === 'Rutin') {
            $pengawasanRutinId = $this->pengawasanRutinService->getPengawasanRutinBUJKByLingkup3Id($pengawasan->id)->id;
            return redirect("/admin/pengawasan/usaha/bujk/rutin/$pengawasanRutinId/rekomendasi");
        }

        return Inertia::render('Pengawasan/Usaha/BUJK/Lingkup3/Rekomendasi', [
            'data' => [
                'lingkupPengawasan' => $lingkupPengawasan,
                'pengawasan'        => new PengawasanBUJKLingkup3Resource($pengawasan),
            ],
        ]);
    }

    public function recommend(string $id, Request $request)
    {
        if (!$this->pengawasanLingkup3Service->checkPengawasanBUJKExists($id)) {
            return back()->withErrors(['message' => 'Pengawasan tidak ditemukan.']);
        }

        $validatedData = $request->validate([
            'rekomendasi'   => 'required',
            'keterangan'    => 'nullable',
        ]);
        $userId = auth()->user()->id;

        $this->pengawasanLingkup3Service->addRekomendasiPengawasanInsidental(
            $id,
            [
                'rekomendasi'    => $validatedData['rekomendasi'],
                'keterangan'     => $validatedData['keterangan'],
                'created_by'     => $userId,
            ],
        );

        return back();
    }

    public function print(string $id)
    {
        $pengawasan = $this->pengawasanLingkup3Service->getPengawasanBUJKById($id);

        return Inertia::render('Pengawasan/Usaha/BUJK/Lingkup3/Simak', [
            'data' => [
                'pengawasan'        => new PengawasanBUJKLingkup3Resource($pengawasan),
            ],
        ]);
    }
}
