<?php

namespace App\Http\Controllers\Pengawasan\Usaha;

use Inertia\Inertia;
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
            $tanggalPengawasan = strtotime($validatedData['tanggal']);
            $tahunPengawasan = date('Y', $tanggalPengawasan);

            $this->pengawasanRutinService->addPengawasanRutinBUJK(
                $validatedData['usahaId'],
                [
                    'start' => ($tanggalPengawasan >= strtotime($tahunPengawasan . '-01-01')) && ($tanggalPengawasan <= strtotime($tahunPengawasan . '-06-30')) ? ($tahunPengawasan . '-01-01') : ($tahunPengawasan . '-07-01'),
                    'end'   => ($tanggalPengawasan >= strtotime($tahunPengawasan . '-01-01')) && ($tanggalPengawasan <= strtotime($tahunPengawasan . '-06-30')) ? ($tahunPengawasan . '-06-30') : ($tahunPengawasan . '-12-31'),
                ],
                [
                    'pengawasan_lingkup_3' => $pengawasanId,
                    // 'created_at'           => now(),
                    // 'updated_at'           => now(),
                ],
            );
        }
    }

    public function show(string $id)
    {
        $lingkupPengawasan = $this->pengawasanService->getLingkupPengawasan(3);

        $pengawasan = $this->pengawasanLingkup3Service->getPengawasanBUJKById($id);
        $pengawasan['usaha']['sertifikat_standar'] = $this->bujkService->getDaftarSertifikatStandarBUJKAktif($pengawasan->usaha->id);
        $pengawasan['usaha']['daftar_paket_pekerjaan'] = $this->bujkService->getDaftarPaketPekerjaanByUsahaId($pengawasan->usaha->id);

        return Inertia::render('Pengawasan/Usaha/BUJK/Lingkup3/Show', [
            'data' => [
                'lingkupPengawasan' => $lingkupPengawasan,
                'pengawasan'        => new PengawasanBUJKLingkup3Resource($pengawasan),
            ],
        ]);
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
}
