<?php

namespace App\Http\Controllers\Pengawasan\Usaha;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Helpers\DateTimeHelper;
use App\Http\Controllers\Controller;
use App\Http\Resources\Pengawasan\PengawasanBUJKLingkup5Collection;
use App\Http\Resources\Pengawasan\PengawasanBUJKLingkup5Resource;
use App\Services\JenisPengawasan\PengawasanRutinTertibUsahaService;
use App\Services\Usaha\PendataanBUJKService;
use App\Services\Usaha\PengawasanUsahaService;
use App\Services\Usaha\PengawasanLingkup5Service;
use Illuminate\Http\Request;

class Lingkup5Controller extends Controller
{
    protected $bujkService;
    protected $pengawasanService;
    protected $pengawasanLingkup5Service;
    protected $pengawasanRutinService;

    public function __construct(
        PendataanBUJKService $bujkService,
        PengawasanUsahaService $pengawasanService,
        PengawasanLingkup5Service $pengawasanLingkup5Service,
        PengawasanRutinTertibUsahaService $pengawasanRutinService,
    )
    {
        $this->bujkService = $bujkService;
        $this->pengawasanService = $pengawasanService;
        $this->pengawasanLingkup5Service = $pengawasanLingkup5Service;
        $this->pengawasanRutinService = $pengawasanRutinService;
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
            'usahaId' => 'required|exists:usaha,id',
            'tanggal' => 'required|date',
            'jenis'   => 'required',
        ]);
        $userId = auth()->user()->id;

        if ($validatedData['jenis'] === 'Rutin')
        {
            $pengawasanRutin = $this->pengawasanRutinService->getPengawasanRutinBUJK(
                $validatedData['usahaId'],
                // DateTimeHelper::getHalfYearDateRange($validatedData['tanggal'])
                DateTimeHelper::getYearDateRange($validatedData['tanggal'])
            );

            if ($pengawasanRutin->pengawasan_lingkup_5) {
                return back()->withErrors(['message' => 'Pengawasan pada semester ini sudah ada.']);
            }
        }

        $pengawasanId = $this->pengawasanLingkup5Service->addPengawasanBUJK([
            'jenis_pengawasan'      => $validatedData['jenis'],
            'tanggal_pengawasan'    => $validatedData['tanggal'],
            'usaha_id'              => $validatedData['usahaId'],
            'created_by'            => $userId,
        ]);

        if ($validatedData['jenis'] === 'Rutin')
        {
            $this->pengawasanRutinService->updatePengawasanRutinBUJK($pengawasanRutin->id, ['pengawasan_lingkup_5' => $pengawasanId]);
        }

        return redirect("/admin/pengawasan/usaha/5/$pengawasanId");
    }

    public function show(string $id)
    {
        $lingkupPengawasan = $this->pengawasanService->getLingkupPengawasan(5);

        $pengawasan = $this->pengawasanLingkup5Service->getPengawasanBUJKById($id);
        $pengawasan['daftar_pemeriksaan'] = $this->pengawasanLingkup5Service->getDaftarPemeriksaanPengembanganUsaha($id);

        $pengawasan['usaha']['daftarLaporan'] = $this->bujkService
            ->getDaftarLaporanBUJKByTahun($pengawasan->usaha->id, Carbon::createFromFormat('Y-m-d', $pengawasan->tanggal_pengawasan)->year);

        if ($pengawasan->jenis_pengawasan === 'Rutin') {
            $pengawasan['pengawasan_rutin_id'] = $this->pengawasanRutinService->getPengawasanRutinBUJKByLingkup5Id($pengawasan->id)->id;
        }

        return Inertia::render('Pengawasan/Usaha/BUJK/Lingkup5/Show', [
            'data' => [
                'lingkupPengawasan' => $lingkupPengawasan,
                'pengawasan'        => new PengawasanBUJKLingkup5Resource($pengawasan),
            ],
        ]);
    }

    public function update(string $id, Request $request)
    {
        if (!$this->pengawasanLingkup5Service->checkPengawasanBUJKExists($id)) {
            return back()->withErrors(['message' => 'Pengawasan tidak ditemukan.']);
        }

        $validatedData = $request->validate(['tanggal' => 'required|date']);

        $pengawasan = $this->pengawasanLingkup5Service->getPengawasanBUJK($id);

        if ($pengawasan->jenis_pengawasan === "Rutin")
        {
            $pengawasanRutin = $this->pengawasanRutinService->getPengawasanRutinBUJKByLingkup5Id($pengawasan->id);
            // $range = DateTimeHelper::getHalfYearDateRange($validatedData['tanggal']);
            $range = DateTimeHelper::getYearDateRange($validatedData['tanggal']);

            if ($pengawasanRutin->start !== $range['start'] || $pengawasanRutin->end !== $range['end'])
            {
                $pengawasanRutin2 = $this->pengawasanRutinService->getPengawasanRutinBUJK($pengawasan->usaha_id, $range);

                if ($pengawasanRutin2->pengawasan_lingkup_5)
                {
                    return back()->withErrors(['message' => 'Pengawasan pada semester ini sudah ada.']);
                }

                $this->pengawasanRutinService->updatePengawasanRutinBUJK(
                    $pengawasanRutin->id,
                    ['pengawasan_lingkup_5' => null]
                );
                $this->pengawasanRutinService->updatePengawasanRutinBUJK(
                    $pengawasanRutin2->id,
                    ['pengawasan_lingkup_5' => $pengawasan->id]
                );
            }
        }

        $this->pengawasanLingkup5Service->updatePengawasanBUJK(
            $id,
            [
                'tanggal_pengawasan'    => $validatedData['tanggal'],
            ]
        );

        return redirect("/admin/pengawasan/usaha/5/$pengawasan->id");
    }

    public function verify(string $id, Request $request)
    {
        if (!$this->pengawasanLingkup5Service->checkPengawasanBUJKExists($id)) {
            return back()->withErrors(['message' => 'Pengawasan tidak ditemukan']);
        }

        $validatedData = $request->validate([
            'pengembanganUsaha' => 'required|boolean',
            'tertibPengawasan'  => 'required|boolean',
            'catatan'           => 'nullable',
        ]);
        $userId = auth()->user()->id;

        $this->pengawasanLingkup5Service->verifyPengawasanBUJK(
            $id,
        [
            'tertib_pengembangan_usaha' => $validatedData['pengembanganUsaha'],
            'tertib_pengawasan'         => $validatedData['tertibPengawasan'],
            'catatan'                   => $validatedData['catatan'],
            'verified_by'               => $userId,
        ]);

        return redirect("/admin/pengawasan/usaha/5/$id");
    }

    public function destroy(string $id)
    {
        if (!$this->pengawasanLingkup5Service->checkPengawasanBUJKExists($id)) {
            return back()->withErrors(['message' => 'Pengawasan tidak ditemukan.']);
        }

        $pengawasan = $this->pengawasanLingkup5Service->getPengawasanBUJK($id);

        if ($pengawasan->jenis_pengawasan === "Rutin")
        {
            $pengawasanRutin = $this->pengawasanRutinService->getPengawasanRutinBUJKByLingkup5Id($pengawasan->id);
            $this->pengawasanRutinService->updatePengawasanRutinBUJK(
                $pengawasanRutin->id,
                ['pengawasan_lingkup_5' => null]
            );
        }

        $this->pengawasanLingkup5Service->deletePengawasanBUJK($id);

        return redirect("/admin/pengawasan/usaha/5");
    }

    public function storePemeriksaan(string $id, string $pemeriksaan_id, Request $request)
    {
        if (!$this->pengawasanLingkup5Service->checkPengawasanBUJKExists($id)) {
            return back()->withErrors(['message' => 'Pengawasan tidak ditemukan']);
        }

        if (!$this->pengawasanLingkup5Service->checkPemeriksaanPengembanganUsahaExists($pemeriksaan_id)) {
            return back()->withErrors(['message' => 'Pemeriksaan Pengembangan Usaha tidak ditemukan']);
        }

        $validatedData = $request->validate([
            'hasil'   => 'required',
            'catatan' => 'nullable',
        ]);
        $userId = auth()->user()->id;

        $this->pengawasanLingkup5Service->addPemeriksaanPengembanganUsaha([
            'pengawasan_id'       => $id,
            'pemeriksaan_id'      => $pemeriksaan_id,
            'hasil_pemeriksaan'   => $validatedData['hasil'],
            'catatan_pemeriksaan' => $validatedData['catatan'],
            'created_by'          => $userId,
        ]);

        return redirect("/admin/pengawasan/usaha/5/$id");
    }

    public function recommendation(string $id)
    {
        $lingkupPengawasan = $this->pengawasanService->getLingkupPengawasan(5);
        $pengawasan = $this->pengawasanLingkup5Service->getPengawasanBUJKById($id);

        if ($pengawasan->jenis_pengawasan === 'Rutin') {
            $pengawasanRutinId = $this->pengawasanRutinService->getPengawasanRutinBUJKByLingkup5Id($pengawasan->id)->id;
            return redirect("/admin/pengawasan/usaha/bujk/rutin/$pengawasanRutinId/rekomendasi");
        }

        return Inertia::render('Pengawasan/Usaha/BUJK/Lingkup5/Rekomendasi', [
            'data' => [
                'lingkupPengawasan' => $lingkupPengawasan,
                'pengawasan'        => new PengawasanBUJKLingkup5Resource($pengawasan),
            ],
        ]);
    }

    public function recommend(string $id, Request $request)
    {
        if (!$this->pengawasanLingkup5Service->checkPengawasanBUJKExists($id)) {
            return back()->withErrors(['message' => 'Pengawasan tidak ditemukan.']);
        }

        $validatedData = $request->validate([
            'rekomendasi'   => 'required',
            'keterangan'    => 'nullable',
        ]);
        $userId = auth()->user()->id;

        $this->pengawasanLingkup5Service->addRekomendasiPengawasanInsidental(
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
        $pengawasan = $this->pengawasanLingkup5Service->getPengawasanBUJKById($id);
        $pengawasan['daftar_pemeriksaan'] = $this->pengawasanLingkup5Service->getDaftarPemeriksaanPengembanganUsaha($id);

        return Inertia::render('Pengawasan/Usaha/BUJK/Lingkup5/Simak', [
            'data' => [
                'pengawasan'        => new PengawasanBUJKLingkup5Resource($pengawasan),
            ],
        ]);
    }
}
