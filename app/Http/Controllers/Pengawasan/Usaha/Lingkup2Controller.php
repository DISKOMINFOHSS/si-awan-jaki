<?php

namespace App\Http\Controllers\Pengawasan\Usaha;

use Inertia\Inertia;
use App\Helpers\DateTimeHelper;
use App\Http\Controllers\Controller;
use App\Http\Resources\Pengawasan\PengawasanBUJKLingkup2Collection;
use App\Http\Resources\Pengawasan\PengawasanBUJKLingkup2Resource;
use App\Services\JenisPengawasan\PengawasanRutinTertibUsahaService;
use App\Services\Usaha\PendataanBUJKService;
use App\Services\Usaha\PengawasanUsahaService;
use App\Services\Usaha\PengawasanLingkup2Service;
use Illuminate\Http\Request;

class Lingkup2Controller extends Controller
{
    protected $bujkService;
    protected $pengawasanService;
    protected $pengawasanLingkup2Service;
    protected $pengawasanRutinService;

    public function __construct(
        PendataanBUJKService $bujkService,
        PengawasanUsahaService $pengawasanService,
        PengawasanLingkup2Service $pengawasanLingkup2Service,
        PengawasanRutinTertibUsahaService $pengawasanRutinService,
    )
    {
        $this->bujkService = $bujkService;
        $this->pengawasanService = $pengawasanService;
        $this->pengawasanLingkup2Service = $pengawasanLingkup2Service;
        $this->pengawasanRutinService = $pengawasanRutinService;
    }

    public function index()
    {
        $lingkupPengawasan = $this->pengawasanService->getLingkupPengawasan(2);
        $daftarUsaha = $this->bujkService->getDaftarBUJK();

        $daftarPengawasan = $this->pengawasanLingkup2Service->getDaftarPengawasanBUJK();

        return Inertia::render('Pengawasan/Usaha/BUJK/Lingkup2/Index', [
            'data' => [
                'lingkupPengawasan' => $lingkupPengawasan,
                'daftarPengawasan'  => new PengawasanBUJKLingkup2Collection($daftarPengawasan),
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

            if ($pengawasanRutin->pengawasan_lingkup_2) {
                return back()->withErrors(['message' => 'Pengawasan pada semester ini sudah ada.']);
            }
        }

        $pengawasanId = $this->pengawasanLingkup2Service->addPengawasanBUJK([
            'jenis_pengawasan'      => $validatedData['jenis'],
            'tanggal_pengawasan'    => $validatedData['tanggal'],
            'usaha_id'              => $validatedData['usahaId'],
            'status_izin_usaha'     => $validatedData['statusIzinUsaha'],
            'status_verifikasi_nib' => $validatedData['statusNIB'],
            'created_by'            => $userId,
        ]);

        if ($validatedData['jenis'] === 'Rutin')
        {
            $this->pengawasanRutinService->updatePengawasanRutinBUJK($pengawasanRutin->id, ['pengawasan_lingkup_2' => $pengawasanId]);
        }

        return redirect("/admin/pengawasan/usaha/2/$pengawasanId");
    }

    public function show(string $id)
    {
        $lingkupPengawasan = $this->pengawasanService->getLingkupPengawasan(2);

        $pengawasan = $this->pengawasanLingkup2Service->getPengawasanBUJKById($id);
        $pengawasan['usaha']['sertifikat_standar'] = $this->bujkService->getDaftarSertifikatStandarBUJKAktif($pengawasan->usaha->id);
        $pengawasan['usaha']['daftar_paket_pekerjaan'] = $this->bujkService->getDaftarPaketPekerjaanByUsahaId($pengawasan->usaha->id);

        if ($pengawasan->jenis_pengawasan === 'Rutin') {
            $pengawasan['pengawasan_rutin_id'] = $this->pengawasanRutinService->getPengawasanRutinBUJKByLingkup2Id($pengawasan->id)->id;
        }

        return Inertia::render('Pengawasan/Usaha/BUJK/Lingkup2/Show', [
            'data' => [
                'lingkupPengawasan' => $lingkupPengawasan,
                'pengawasan'        => new PengawasanBUJKLingkup2Resource($pengawasan),
            ],
        ]);
    }

    public function update(string $id, Request $request)
    {
        if (!$this->pengawasanLingkup2Service->checkPengawasanBUJKExists($id)) {
            return back()->withErrors(['message' => 'Pengawasan tidak ditemukan.']);
        }

        $validatedData = $request->validate([
            'tanggal'         => 'required|date',
            'statusIzinUsaha' => 'required',
            'statusNIB'       => 'required|boolean',
        ]);

        $pengawasan = $this->pengawasanLingkup2Service->getPengawasanBUJK($id);

        if ($pengawasan->jenis_pengawasan === "Rutin")
        {
            $pengawasanRutin = $this->pengawasanRutinService->getPengawasanRutinBUJKByLingkup2Id($pengawasan->id);
            // $range = DateTimeHelper::getHalfYearDateRange($validatedData['tanggal']);
            $range = DateTimeHelper::getYearDateRange($validatedData['tanggal']);

            if ($pengawasanRutin->start !== $range['start'] || $pengawasanRutin->end !== $range['end'])
            {
                $pengawasanRutin2 = $this->pengawasanRutinService->getPengawasanRutinBUJK($pengawasan->usaha_id, $range);

                if ($pengawasanRutin2->pengawasan_lingkup_2)
                {
                    return back()->withErrors(['message' => 'Pengawasan pada semester ini sudah ada.']);
                }

                $this->pengawasanRutinService->updatePengawasanRutinBUJK(
                    $pengawasanRutin->id,
                    ['pengawasan_lingkup_2' => null]
                );
                $this->pengawasanRutinService->updatePengawasanRutinBUJK(
                    $pengawasanRutin2->id,
                    ['pengawasan_lingkup_2' => $pengawasan->id]
                );
            }
        }

        $this->pengawasanLingkup2Service->updatePengawasanBUJK(
            $id,
            [
                'tanggal_pengawasan'    => $validatedData['tanggal'],
                'status_izin_usaha'     => $validatedData['statusIzinUsaha'],
                'status_verifikasi_nib' => $validatedData['statusNIB'],
            ]
        );

        return redirect("/admin/pengawasan/usaha/2/$pengawasan->id");
    }

    public function verify(string $id, Request $request)
    {
        if (!$this->pengawasanLingkup2Service->checkPengawasanBUJKExists($id)) {
            return back()->withErrors(['message' => 'Pengawasan tidak ditemukan.']);
        }

        $validatedData = $request->validate([
            'jenisUsaha'       => 'required|boolean',
            'sifatUsaha'       => 'required|boolean',
            'klasifikasiUsaha' => 'required|boolean',
            'layananUsaha'     => 'required|boolean',
            'tertibPengawasan' => 'required|boolean',
            'catatan'          => 'nullable',
        ]);
        $userId = auth()->user()->id;

        $this->pengawasanLingkup2Service->verifyPengawasanBUJK(
            $id,
        [
            'tertib_jenis_usaha'          => $validatedData['jenisUsaha'],
            'tertib_sifat_usaha'          => $validatedData['sifatUsaha'],
            'tertib_klasifikasi_usaha'    => $validatedData['klasifikasiUsaha'],
            'tertib_layanan_usaha'        => $validatedData['layananUsaha'],
            'tertib_pengawasan'           => $validatedData['tertibPengawasan'],
            'catatan'                     => $validatedData['catatan'],
            'verified_by'                 => $userId,
        ]);

        return redirect("/admin/pengawasan/usaha/2/$id");
    }

    public function destroy(string $id)
    {
        if (!$this->pengawasanLingkup2Service->checkPengawasanBUJKExists($id)) {
            return back()->withErrors(['message' => 'Pengawasan tidak ditemukan.']);
        }

        $pengawasan = $this->pengawasanLingkup2Service->getPengawasanBUJK($id);

        if ($pengawasan->jenis_pengawasan === "Rutin")
        {
            $pengawasanRutin = $this->pengawasanRutinService->getPengawasanRutinBUJKByLingkup2Id($pengawasan->id);
            $this->pengawasanRutinService->updatePengawasanRutinBUJK(
                $pengawasanRutin->id,
                ['pengawasan_lingkup_2' => null]
            );
        }

        $this->pengawasanLingkup2Service->deletePengawasanBUJK($id);

        return redirect("/admin/pengawasan/usaha/2");
    }

    public function storeKesesuaianKegiatan(string $id, Request $request)
    {
        if (!$this->pengawasanLingkup2Service->checkPengawasanBUJKExists($id)) {
            return back()->withErrors(['message' => 'Pengawasan tidak ditemukan.']);
        }

        $validatedData = $request->validate([
            'paketId'                  => 'required|exists:paket_pekerjaan,id',
            'kesesuaianJenis'          => 'required|boolean',
            'kesesuaianSifat'          => 'required|boolean',
            'kesesuaianSubklasifikasi' => 'required|boolean',
            'kesesuaianLayanan'        => 'required|boolean',
        ]);
        $userId = auth()->user()->id;

        $data = [
            'pengawasan_id'             => $id,
            'paket_id'                  => $validatedData['paketId'],
            'kesesuaian_jenis'          => $validatedData['kesesuaianJenis'],
            'kesesuaian_sifat'          => $validatedData['kesesuaianSifat'],
            'kesesuaian_subklasifikasi' => $validatedData['kesesuaianSubklasifikasi'],
            'kesesuaian_layanan'        => $validatedData['kesesuaianLayanan'],
        ];

        if ($request->filled('id')) {
            $data['id'] = $request->input('id');
            $this->pengawasanLingkup2Service->updateKesesuaianKegiatan($data);
        } else {
            if ($this->pengawasanLingkup2Service->checkKesesuaianKegiatanExists($id, $validatedData['paketId'])) {
                return back()->withErrors(['message' => 'Kesesuaian kegiatan sudah ada']);
            }

            $data['created_by'] = $userId;
            $this->pengawasanLingkup2Service->addKesesuaianKegiatan($data);
        }

        return redirect("/admin/pengawasan/usaha/2/$id");
    }

    public function destroyKesesuaianKegiatan(string $id, string $kesesuaian_id)
    {
        if (!$this->pengawasanLingkup2Service->checkPengawasanBUJKExists($id)) {
            return back()->withErrors(['message' => 'Pengawasan tidak ditemukan.']);
        }

        if (!$this->pengawasanLingkup2Service->checkKesesuaianKegiatanExistsById($kesesuaian_id)) {
            return back()->withErrors(['message' => 'Kesesuaian kegiatan tidak ditemukan.']);
        }

        $this->pengawasanLingkup2Service->deleteKesesuaianKegiatan($kesesuaian_id);

        return redirect("/admin/pengawasan/usaha/2/$id");
    }

    public function recommendation(string $id)
    {
        $lingkupPengawasan = $this->pengawasanService->getLingkupPengawasan(2);
        $pengawasan = $this->pengawasanLingkup2Service->getPengawasanBUJKById($id);

        if ($pengawasan->jenis_pengawasan === 'Rutin') {
            $pengawasanRutinId = $this->pengawasanRutinService->getPengawasanRutinBUJKByLingkup2Id($pengawasan->id)->id;
            return redirect("/admin/pengawasan/usaha/bujk/rutin/$pengawasanRutinId/rekomendasi");
        }

        return Inertia::render('Pengawasan/Usaha/BUJK/Lingkup2/Rekomendasi', [
            'data' => [
                'lingkupPengawasan' => $lingkupPengawasan,
                'pengawasan'        => new PengawasanBUJKLingkup2Resource($pengawasan),
            ],
        ]);
    }

    public function recommend(string $id, Request $request)
    {
        if (!$this->pengawasanLingkup2Service->checkPengawasanBUJKExists($id)) {
            return back()->withErrors(['message' => 'Pengawasan tidak ditemukan.']);
        }

        $validatedData = $request->validate([
            'rekomendasi'   => 'required',
            'keterangan'    => 'nullable',
        ]);
        $userId = auth()->user()->id;

        $this->pengawasanLingkup2Service->addRekomendasiPengawasanInsidental(
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
        $pengawasan = $this->pengawasanLingkup2Service->getPengawasanBUJKById($id);

        return Inertia::render('Pengawasan/Usaha/BUJK/Lingkup2/Simak', [
            'data' => [
                'pengawasan'        => new PengawasanBUJKLingkup2Resource($pengawasan),
            ],
        ]);
    }
}
