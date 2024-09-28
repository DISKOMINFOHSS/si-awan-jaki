<?php

namespace App\Http\Controllers\Pengawasan\Usaha;

use Inertia\Inertia;
use App\Helpers\DateTimeHelper;
use App\Http\Controllers\Controller;
use App\Http\Resources\Pengawasan\TertibUsaha\PengawasanBUJKResource;
use App\Http\Resources\Pengawasan\TertibUsaha\PengawasanRutinBUJKResource;
use App\Http\Resources\Pengawasan\TertibUsaha\PemeriksaanBUJKLingkup5Resource;
use App\Services\JenisPengawasan\PengawasanRutinTertibUsahaService;
use App\Services\Usaha\PendataanBUJKService;
use App\Services\Usaha\PengawasanUsahaService;
use App\Services\Usaha\PengawasanLingkup2Service;
use App\Services\Usaha\PengawasanLingkup3Service;
use App\Services\Usaha\PengawasanLingkup4Service;
use App\Services\Usaha\PengawasanLingkup5Service;
use Illuminate\Http\Request;

class BUJKController extends Controller
{
    protected $bujkService;
    protected $pengawasanService;
    protected $pengawasanRutinService;

    public function __construct(
        PendataanBUJKService $bujkService,
        PengawasanUsahaService $pengawasanService,
        PengawasanLingkup2Service $pengawasanLingkup2Service,
        PengawasanLingkup3Service $pengawasanLingkup3Service,
        PengawasanLingkup4Service $pengawasanLingkup4Service,
        PengawasanLingkup5Service $pengawasanLingkup5Service,
        PengawasanRutinTertibUsahaService $pengawasanRutinService,
    ) {
        $this->bujkService = $bujkService;
        $this->pengawasanService = $pengawasanService;
        $this->pengawasanLingkup2Service = $pengawasanLingkup2Service;
        $this->pengawasanLingkup3Service = $pengawasanLingkup3Service;
        $this->pengawasanLingkup4Service = $pengawasanLingkup4Service;
        $this->pengawasanLingkup5Service = $pengawasanLingkup5Service;
        $this->pengawasanRutinService = $pengawasanRutinService;
    }

    public function index()
    {
        $daftarLingkupPengawasan = $this->pengawasanService->getDaftarLingkupPengawasan();
        $daftarUsaha = $this->bujkService->getDaftarBUJK();

        $daftarPengawasanRutin = $this->pengawasanRutinService->getDaftarPengawasanRutinBUJK(date('Y'));

        return Inertia::render('Pengawasan/Usaha/BUJK/Index', [
            'data' => [
                'daftarUsaha'             => $daftarUsaha,
                'daftarPengawasanRutin'   => PengawasanBUJKResource::collection($daftarPengawasanRutin),
                'daftarLingkupPengawasan' => $daftarLingkupPengawasan,
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'usahaId'         => 'required|exists:usaha,id',
            'tanggal'         => 'required|date',
            'statusIzinUsaha' => 'required',
            'statusNIB'       => 'required|boolean',
        ]);
        $userId = auth()->user()->id;

        $pengawasanRutin = $this->pengawasanRutinService->getPengawasanRutinBUJK(
            $validatedData['usahaId'],
            DateTimeHelper::getYearDateRange($validatedData['tanggal']),
        );

        $data = [
            'jenis_pengawasan'      => 'Rutin',
            'tanggal_pengawasan'    => $validatedData['tanggal'],
            'usaha_id'              => $validatedData['usahaId'],
            'status_izin_usaha'     => $validatedData['statusIzinUsaha'],
            'status_verifikasi_nib' => $validatedData['statusNIB'],
            'created_by'            => $userId,
        ];

        $pengawasan = [ 'tanggal_pengawasan' => $validatedData['tanggal'] ];
        if (!$pengawasanRutin->pengawasan_lingkup_2) {
            $pengawasan['pengawasan_lingkup_2'] = $this->pengawasanLingkup2Service->addPengawasanBUJK($data);
        }

        if (!$pengawasanRutin->pengawasan_lingkup_3) {
            $pengawasan['pengawasan_lingkup_3'] = $this->pengawasanLingkup3Service->addPengawasanBUJK($data);
        }

        if (!$pengawasanRutin->pengawasan_lingkup_4) {
            $pengawasan['pengawasan_lingkup_4'] = $this->pengawasanLingkup4Service->addPengawasanBUJK($data);
        }

        if (!$pengawasanRutin->pengawasan_lingkup_5) {
            $pengawasan['pengawasan_lingkup_5'] = $this->pengawasanLingkup5Service->addPengawasanBUJK($data);
        }

        $this->pengawasanRutinService->updatePengawasanRutinBUJK($pengawasanRutin->id, $pengawasan);

        return redirect("/admin/pengawasan/usaha/bujk/$pengawasanRutin->id");
    }

    public function show(string $id)
    {
        $pengawasanRutin = $this->pengawasanRutinService->getPengawasanRutinBUJKById($id);
        $pengawasanRutin['rekomendasi'] = $this->pengawasanRutinService->getRekomendasiPengawasanRutinBUJKByPengawasanId($id);

        return Inertia::render('Pengawasan/Usaha/BUJK/Rutin/Show', [
            'data' => [
                'pengawasan' => new PengawasanRutinBUJKResource($pengawasanRutin),
            ],
        ]);
    }

    public function recommendation(string $id)
    {
        $pengawasanRutin = $this->pengawasanRutinService->getPengawasanRutinBUJKById($id);
        $pengawasanRutin['rekomendasi'] = $this->pengawasanRutinService->getRekomendasiPengawasanRutinBUJKByPengawasanId($id);

        return Inertia::render('Pengawasan/Usaha/BUJK/Rutin/Rekomendasi', [
            'data' => [
                'pengawasan' => new PengawasanRutinBUJKResource($pengawasanRutin),
            ],
        ]);
    }

    public function recommend(string $id, Request $request)
    {
        if (!$this->pengawasanRutinService->checkPengawasanRutinBUJKExists($id)) {
            return back()->withErrors(['message' => 'Pengawasan tidak ditemukan.']);
        }

        $validatedData = $request->validate([
            'rekomendasi'   => 'required',
            'keterangan'    => 'nullable',
        ]);
        $userId = auth()->user()->id;

        $this->pengawasanRutinService->addRekomendasiPengawasanRutinBUJK(
            $id,
            [
                'rekomendasi'    => $validatedData['rekomendasi'],
                'keterangan'     => $validatedData['keterangan'],
                'created_by'     => $userId,
            ]
        );

        return back();
    }

    public function print(string $id)
    {
        $pengawasanRutin = $this->pengawasanRutinService->getPengawasanRutinBUJKById($id);
        $pengawasanRutin['rekomendasi'] = $this->pengawasanRutinService->getRekomendasiPengawasanRutinBUJKByPengawasanId($id);

        $pengawasanLingkup2 = $this->pengawasanLingkup2Service->getPengawasanBUJKById($pengawasanRutin->pengawasan_lingkup_2_id);
        $pengawasanLingkup3 = $this->pengawasanLingkup3Service->getPengawasanBUJKById($pengawasanRutin->pengawasan_lingkup_3_id);
        // $pengawasanLingkup4 = $this->pengawasanLingkup4Service->getPengawasanBUJKById($pengawasanRutin->pengawasan_lingkup_4_id);
        // $pengawasanLingkup5 = $this->pengawasanLingkup5Service->getPengawasanBUJKById($pengawasanRutin->pengawasan_lingkup_5_id);
        $pengawasanLingkup5 = $this->pengawasanLingkup5Service->getDaftarPemeriksaanPengembanganUsaha($pengawasanRutin->pengawasan_lingkup_5_id);

        return Inertia::render('Pengawasan/Usaha/BUJK/Rutin/Simak', [
            'data' => [
                'pengawasan' => new PengawasanRutinBUJKResource($pengawasanRutin),
                'pengawasanLingkup2' => $pengawasanLingkup2->kesesuaianKegiatan,
                'pengawasanLingkup3' => $pengawasanLingkup3->kesesuaianKegiatan,
                'pengawasanLingkup5' => PemeriksaanBUJKLingkup5Resource::collection($pengawasanLingkup5),
            ],
        ]);
    }
}
