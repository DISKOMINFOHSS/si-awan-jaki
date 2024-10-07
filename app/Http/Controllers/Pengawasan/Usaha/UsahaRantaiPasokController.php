<?php

namespace App\Http\Controllers\Pengawasan\Usaha;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Http\Resources\Pengawasan\TertibUsaha\PengawasanUsahaRantaiPasokResource;
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
        $daftarPengawasan = $this->pengawasanLingkup1Service->getDaftarPengawasanBySlug($jenis_rantai_pasok);

        $daftarUsaha = $this->usahaService->getDaftarUsahaRantaiPasokBySlug($jenis_rantai_pasok);

        return Inertia::render('Pengawasan/Usaha/UsahaRantaiPasok/Index', [
            'data' => [
                'lingkupPengawasan' => $lingkupPengawasan,
                'jenisRantaiPasok'  => $jenisRantaiPasok,
                'daftarUsaha'       => $daftarUsaha,
                'daftarPengawasan'  => PengawasanUsahaRantaiPasokResource::collection($daftarPengawasan),
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

        $pengawasan = $this->pengawasanLingkup1Service->getPengawasanById($id);

        switch ($jenisRantaiPasok->kategoriSumberDaya)
        {
            case "Material":
                $pengawasan['material_konstruksi'] = $this->pengawasanLingkup1Service->getPemeriksaanMaterialKonstruksiByPengawasanId($id);
                break;
            case "Peralatan":
                $pengawasan['peralatan_konstruksi'] = $this->pengawasanLingkup1Service->getPemeriksaanPeralatanKonstruksiByPengawasanId($id);
                break;
            case "Teknologi":
                $pengawasan['teknologi_konstruksi'] = $this->pengawasanLingkup1Service->getPemeriksaanTeknologiKonstruksiByPengawasanId($id);
                break;
        }

        return Inertia::render('Pengawasan/Usaha/UsahaRantaiPasok/Show', [
            'data' => [
                'lingkupPengawasan' => $lingkupPengawasan,
                'jenisRantaiPasok'  => $jenisRantaiPasok,
                'pengawasan'        => new PengawasanUsahaRantaiPasokResource($pengawasan),
            ],
        ]);
    }

    public function verify(string $id, Request $request)
    {
        if (!$this->pengawasanLingkup1Service->checkPengawasanExists($id)) {
            return back()->withErrors(['message' => 'Pengawasan tidak ditemukan.']);
        }

        $validatedData = $request->validate([
            'tertibPerizinanBerusaha'   => 'required|boolean',
            'tertibPerizinanPenggunaan' => 'required|boolean',
            'tertibPencatatanSIMPK'     => 'required|boolean',
            'tertibPengawasan'          => 'required|boolean',
            'catatan'                   => 'nullable',
        ]);
        $userId = auth()->user()->id;

        $this->pengawasanLingkup1Service->verifyPengawasan(
            $id,
            [
                'tertib_perizinan_berusaha'   => $validatedData['tertibPerizinanBerusaha'],
                'tertib_perizinan_penggunaan' => $validatedData['tertibPerizinanPenggunaan'],
                'tertib_pencatatan_simpk'     => $validatedData['tertibPencatatanSIMPK'],
                'tertib_pengawasan'           => $validatedData['tertibPengawasan'],
                'catatan'                     => $validatedData['catatan'],
                'verified_by'                 => $userId,
            ],
        );

        return back();
    }

    public function destroy(string $jenis_rantai_pasok, string $id)
    {
        if (!$this->pengawasanLingkup1Service->checkPengawasanExists($id)) {
            return back()->withErrors(['message' => 'Pengawasan tidak ditemukan.']);
        }

        $this->pengawasanLingkup1Service->deletePengawasan($id);

        return redirect("/admin/pengawasan/usaha/1/$jenis_rantai_pasok");
    }

    public function recommendation(string $jenis_rantai_pasok, string $id)
    {
        $lingkupPengawasan = $this->pengawasanService->getLingkupPengawasan(1);
        $jenisRantaiPasok = $this->usahaService->getJenisRantaiPasokBySlug($jenis_rantai_pasok);

        $pengawasan = $this->pengawasanLingkup1Service->getPengawasanById($id);
        $pengawasan['rekomendasi'] = $this->pengawasanLingkup1Service->getRekomendasiPengawasanByPengawasanId($id);

        return Inertia::render('Pengawasan/Usaha/UsahaRantaiPasok/Rekomendasi', [
            'data' => [
                'lingkupPengawasan' => $lingkupPengawasan,
                'jenisRantaiPasok'  => $jenisRantaiPasok,
                'pengawasan'        => new PengawasanUsahaRantaiPasokResource($pengawasan),
            ],
        ]);
    }

    public function recommend(string $id, Request $request)
    {
        if (!$this->pengawasanLingkup1Service->checkPengawasanExists($id)) {
            return back()->withErrors(['message' => 'Pengawasan tidak ditemukan.']);
        }

        $validatedData = $request->validate([
            'rekomendasi'   => 'required',
            'keterangan'    => 'nullable',
        ]);
        $userId = auth()->user()->id;

        $this->pengawasanLingkup1Service->addRekomendasiPengawasan(
            $id,
            [
                'rekomendasi'    => $validatedData['rekomendasi'],
                'keterangan'     => $validatedData['keterangan'],
                'created_by'     => $userId,
            ],
        );

        return back();
    }

    public function storeMaterial(string $id, Request $request)
    {
        if (!$this->pengawasanLingkup1Service->checkPengawasanExists($id)) {
            return back()->withErrors(['message' => 'Pengawasan tidak ditemukan.']);
        }

        $validatedData = $request->validate([
            'varian'            => 'required',
            'subvarian'         => 'required',
            'merk'              => 'required',
            'sertifikatTKDN'    => 'required|boolean',
            'sertifikatStandar' => 'required',
            'simpk'             => 'required|boolean',
        ]);
        $userId = auth()->user()->id;

        $this->pengawasanLingkup1Service->addPemeriksaanMaterialKonstruksi([
            'pengawasan_id'          => $id,
            'varian'                 => $validatedData['varian'],
            'subvarian'              => $validatedData['subvarian'],
            'merk_produk'            => $validatedData['merk'],
            'sertifikat_tkdn'        => $validatedData['sertifikatTKDN'],
            'sertifikat_standar'     => $validatedData['sertifikatStandar'],
            'simpk'                  => $validatedData['simpk'],
            'nomor_registrasi_simpk' => $request->input('nomorRegistrasi'),
            'created_by'             => $userId,
        ]);

        return back();
    }

    public function destroyMaterial(string $pengawasan_id, string $id)
    {
        if (!$this->pengawasanLingkup1Service->checkPengawasanExists($pengawasan_id)) {
            return back()->withErrors(['message' => 'Pengawasan tidak ditemukan.']);
        }

        if (!$this->pengawasanLingkup1Service->checkPemeriksaanMaterialKonstruksiExists($id)) {
            return back()->withErrors(['message' => 'Pemeriksaan Material Konstruksi tidak ditemukan.']);
        }

        $this->pengawasanLingkup1Service->deletePemeriksaanMaterialKonstruksi($id);

        return back();
    }

    public function storePeralatan(string $id, Request $request)
    {
        if (!$this->pengawasanLingkup1Service->checkPengawasanExists($id)) {
            return back()->withErrors(['message' => 'Pengawasan tidak ditemukan.']);
        }

        $validatedData = $request->validate([
            'varian'           => 'required',
            'subvarian'        => 'required',
            'merk'             => 'required',
            'jumlahUnit'       => 'required|integer',
            'suratK3'          => 'required',
            'buktiKepemilikan' => 'required',
            'simpk'            => 'required|boolean',
        ]);
        $userId = auth()->user()->id;

        $this->pengawasanLingkup1Service->addPemeriksaanPeralatanKonstruksi([
            'pengawasan_id'          => $id,
            'varian'                 => $validatedData['varian'],
            'subvarian'              => $validatedData['subvarian'],
            'merk_peralatan'         => $validatedData['merk'],
            'jumlah_unit'            => $validatedData['jumlahUnit'],
            'surat_k3'               => $validatedData['suratK3'],
            'bukti_kepemilikan'      => $validatedData['buktiKepemilikan'],
            'simpk'                  => $validatedData['simpk'],
            'nomor_registrasi_simpk' => $request->input('nomorRegistrasi'),
            'created_by'             => $userId,
        ]);

        return back();
    }

    public function destroyPeralatan(string $pengawasan_id, string $id)
    {
        if (!$this->pengawasanLingkup1Service->checkPengawasanExists($pengawasan_id)) {
            return back()->withErrors(['message' => 'Pengawasan tidak ditemukan.']);
        }

        if (!$this->pengawasanLingkup1Service->checkPemeriksaanPeralatanKonstruksiExists($id)) {
            return back()->withErrors(['message' => 'Pemeriksaan Peralatan Konstruksi tidak ditemukan.']);
        }

        $this->pengawasanLingkup1Service->deletePemeriksaanPeralatanKonstruksi($id);

        return back();
    }

    public function storeTeknologi(string $id, Request $request)
    {
        if (!$this->pengawasanLingkup1Service->checkPengawasanExists($id)) {
            return back()->withErrors(['message' => 'Pengawasan tidak ditemukan.']);
        }

        $validatedData = $request->validate([
            'nama'        => 'required',
            'bidangUsaha' => 'required',
            'haki'        => 'required|boolean',
        ]);
        $userId = auth()->user()->id;

        $this->pengawasanLingkup1Service->addPemeriksaanTeknologiKonstruksi([
            'pengawasan_id'  => $id,
            'nama_teknologi' => $validatedData['nama'],
            'bidang_usaha'   => $validatedData['bidangUsaha'],
            'haki'           => $validatedData['haki'],
            'nomor_haki'     => $request->input('nomorHaki'),
            'created_by'     => $userId,
        ]);

        return back();
    }
}
