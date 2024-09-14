<?php

namespace App\Http\Controllers\Pengawasan\PemanfaatanProduk;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Http\Resources\Pendataan\BangunanCollection;
use App\Http\Resources\Pengawasan\PengawasanPemanfaatanProdukCollection;
use App\Http\Resources\Pengawasan\PengawasanPemanfaatanProdukResource;
use App\Services\PemanfaatanProduk\PendataanBangunanService;
use App\Services\PemanfaatanProduk\PengawasanPemanfaatanProdukService;
use Illuminate\Http\Request;

class PemanfaatanProdukController extends Controller
{
    protected $bangunanService;
    protected $pengawasanService;

    public function __construct(
        PendataanBangunanService $bangunanService,
        PengawasanPemanfaatanProdukService $pengawasanService,
    )
    {
        $this->bangunanService = $bangunanService;
        $this->pengawasanService = $pengawasanService;
    }

    public function index()
    {
        $daftarBangunan = $this->bangunanService->getDaftarBangunan();
        $daftarPengawasan = $this->pengawasanService->getDaftarPengawasan();

        return Inertia::render('Pengawasan/PemanfaatanProduk/Index', [
            'data' => [
                'daftarBangunan'   => new BangunanCollection($daftarBangunan),
                // 'daftarPengawasan' => $daftarPengawasan,
                'daftarPengawasan' => new PengawasanPemanfaatanProdukCollection($daftarPengawasan),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'tanggal'    => 'required|date',
            'jenis'      => 'required',
            'bangunanId' => 'required|exists:bangunan,id',
        ]);
        $userId = auth()->user()->id;

        $pengawasanId = $this->pengawasanService->addPengawasan([
            'jenis_pengawasan'   => $validatedData['jenis'],
            'tanggal_pengawasan' => $validatedData['tanggal'],
            'bangunan_id'        => $validatedData['bangunanId'],
            'created_by'         => $userId,
        ]);

        return redirect("/admin/pengawasan/pemanfaatan-produk");
    }

    public function show(string $id)
    {
        $daftarLingkupPengawasan = $this->pengawasanService->getDaftarLingkupPengawasan($id);
        $pengawasan = $this->pengawasanService->getPengawasanById($id);

        $pengawasan['daftarPemeriksaan'] = $daftarLingkupPengawasan;
        $pengawasan['bangunan']['daftar_bukti_dukung'] = $this->bangunanService->getDaftarBuktiDukungByBangunanId($pengawasan->bangunan->id);

        return Inertia::render('Pengawasan/PemanfaatanProduk/Show', [
            'data' => [
                'pengawasan' => new PengawasanPemanfaatanProdukResource($pengawasan),
            ],
        ]);
    }

    public function destroy(string $id)
    {
        if (!$this->pengawasanService->checkPengawasanExists($id)) {
            return back()->withErrors(['message' => 'Pengawasan tidak ditemukan.']);
        }

        $this->pengawasanService->deletePengawasan($id);

        return redirect("/admin/pengawasan/pemanfaatan-produk");
    }

    public function storePemeriksaan(string $id, string $lingkup_id, Request $request)
    {
        if (!$this->pengawasanService->checkPengawasanExists($id) || !$this->pengawasanService->checkLingkupPengawasanExists($lingkup_id)) {
            return back()->withErrors(['message' => 'Pengawasan/Lingkup Pemeriksaan tidak ditemukan.']);
        }

        $validatedData = $request->validate([
            'kesimpulan' => 'required',
            'catatan'    => 'required',
        ]);
        $userId = auth()->user()->id;

        $this->pengawasanService->addPemeriksaanPengawasan([
            'pengawasan_id'          => $id,
            'lingkup_id'             => $lingkup_id,
            'kesimpulan_pemeriksaan' => json_encode($validatedData['kesimpulan']),
            'catatan_pemeriksaan'    => json_encode($validatedData['catatan']),
            'created_by'             => $userId,
        ]);

        return redirect("/admin/pengawasan/pemanfaatan-produk/$id");
    }

    public function storeVerification(string $id, Request $request)
    {
        if (!$this->pengawasanService->checkPengawasanExists($id)) {
            return back()->withErrors(['message' => 'Pengawasan tidak ditemukan.']);
        }

        $validatedData = $request->validate([
            'kesesuaianFungsi'      => 'required|boolean',
            'kesesuaianLokasi'      => 'required|boolean',
            'rencanaUmurKonstruksi' => 'required|boolean',
            'kapasitasBeban'        => 'required|boolean',
            'pemeliharaanBangunan'  => 'required|boolean',
            'programPemeliharaan'   => 'required|boolean',
            'tertibPengawasan'      => 'required|boolean',
            'catatan'               => 'nullable',
        ]);
        $userId = auth()->user()->id;

        $this->pengawasanService->verifyPengawasan(
            $id,
        [
            'tertib_kesesuaian_fungsi'       => $validatedData['kesesuaianFungsi'],
            'tertib_kesesuaian_lokasi'       => $validatedData['kesesuaianLokasi'],
            'tertib_rencana_umur_konstruksi' => $validatedData['rencanaUmurKonstruksi'],
            'tertib_kapasitas_beban'         => $validatedData['kapasitasBeban'],
            'tertib_pemeliharaan_bangunan'   => $validatedData['pemeliharaanBangunan'],
            'tertib_program_pemeliharaan'    => $validatedData['programPemeliharaan'],
            'tertib_pengawasan'              => $validatedData['tertibPengawasan'],
            'catatan'                        => $validatedData['catatan'],
            'verified_by'                    => $userId,
        ]);

        return redirect("/admin/pengawasan/pemanfaatan-produk/$id/rekomendasi/create");
    }

    public function showRekomendasi(string $id)
    {
        $pengawasan = $this->pengawasanService->getPengawasanById($id);
        $pengawasan['bangunan']['daftar_bukti_dukung'] = $this->bangunanService->getDaftarBuktiDukungByBangunanId($pengawasan->bangunan->id);

        return Inertia::render('Pengawasan/PemanfaatanProduk/Rekomendasi', [
            'data' => [
                'pengawasan' => new PengawasanPemanfaatanProdukResource($pengawasan),
            ],
        ]);
    }

    public function createRekomendasi(string $id)
    {
        $pengawasan = $this->pengawasanService->getPengawasanById($id);

        return Inertia::render('Pengawasan/PemanfaatanProduk/Rekomendasi/Create', [
            'data' => [
                'pengawasan' => new PengawasanPemanfaatanProdukResource($pengawasan),
            ],
        ]);
    }

    public function storeRekomendasi(string $id, Request $request)
    {
        if (!$this->pengawasanService->checkPengawasanExists($id)) {
            return back()->withErrors(['message' => 'Pengawasan tidak ditemukan.']);
        }

        $validatedData = $request->validate([
            'rekomendasi'   => 'required',
            'keterangan'    => 'nullable',
            'tanggalTemuan' => 'nullable|date'
        ]);
        $userId = auth()->user()->id;

        $this->pengawasanService->addRekomendasiPengawasan([
            'pengawasan_id'  => $id,
            'rekomendasi'    => $validatedData['rekomendasi'],
            'keterangan'     => $validatedData['keterangan'],
            'tanggal_temuan' => $validatedData['tanggalTemuan'],
            'created_by'     => $userId,
        ]);

        return redirect("/admin/pengawasan/pemanfaatan-produk/$id");
    }

    public function showLaporan(string $id)
    {
        $daftarLingkupPengawasan = $this->pengawasanService->getDaftarLingkupPengawasan($id);
        $pengawasan = $this->pengawasanService->getPengawasanById($id);

        $pengawasan['daftarPemeriksaan'] = $daftarLingkupPengawasan;

        return Inertia::render('Pengawasan/PemanfaatanProduk/Laporan', [
            'data' => [
                'pengawasan' => new PengawasanPemanfaatanProdukResource($pengawasan),
            ],
        ]);
    }
}
