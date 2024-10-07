<?php

namespace App\Http\Controllers\Rekapitulasi;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Http\Resources\Rekapitulasi\PengawasanTertibUsahaBUJKResource;
use App\Http\Resources\Rekapitulasi\PengawasanTertibUsahaPerseoranganResource;
use App\Services\Rekapitulasi\TertibUsahaService;
use Illuminate\Http\Request;

class TertibUsahaController extends Controller
{
    protected $rekapPengawasanService;

    public function __construct(
        TertibUsahaService $rekapPengawasanService,
    ) {
        $this->rekapPengawasanService = $rekapPengawasanService;
    }

    public function index(string $tahun)
    {
        $daftarTertibUsahaBUJK = $this->rekapPengawasanService->getDaftarTertibUsahaBUJKTahunanWithPengawasanRutin($tahun);
        $daftarTertibUsahaPerseorangan = $this->rekapPengawasanService->getDaftarTertibUsahaPerseoranganTahunan($tahun);

        return Inertia::render('Rekapitulasi/TertibUsaha/Index', [
            'data' => [
                'daftarTertibUsahaBUJK' => PengawasanTertibUsahaBUJKResource::collection($daftarTertibUsahaBUJK),
                'daftarTertibUsahaPerseorangan' => PengawasanTertibUsahaPerseoranganResource::collection($daftarTertibUsahaPerseorangan),
            ],
        ]);
    }

    public function storePengawasanBUJK(string $tahun, Request $request)
    {
        $validatedData = $request->validate([
            'usahaId'           => 'required|exists:usaha,id',
            'jenisUsaha'        => 'required|boolean',
            'sifatUsaha'        => 'required|boolean',
            'klasifikasiUsaha'  => 'required|boolean',
            'layananUsaha'      => 'required|boolean',
            'bentukUsaha'       => 'required|boolean',
            'kualifikasiUsaha'  => 'required|boolean',
            'syaratSBU'         => 'required|boolean',
            'syaratNIB'         => 'required|boolean',
            'pengembanganUsaha' => 'required|boolean',
            'tertibPengawasan'  => 'required|boolean',
            'catatan'           => 'nullable',
        ]);

        $userId = auth()->user()->id;

        $this->rekapPengawasanService->storeVerifikasiPengawasanBUJKTahunan(
            $tahun,
            $validatedData['usahaId'],
            [
                'tertib_jenis_usaha'        => $validatedData['jenisUsaha'],
                'tertib_sifat_usaha'        => $validatedData['sifatUsaha'],
                'tertib_klasifikasi_usaha'  => $validatedData['klasifikasiUsaha'],
                'tertib_layanan_usaha'      => $validatedData['layananUsaha'],
                'tertib_bentuk_usaha'       => $validatedData['bentukUsaha'],
                'tertib_kualifikasi_usaha'  => $validatedData['kualifikasiUsaha'],
                'tertib_persyaratan_sbu'    => $validatedData['syaratSBU'],
                'tertib_persyaratan_nib'    => $validatedData['syaratNIB'],
                'tertib_pengembangan_usaha' => $validatedData['pengembanganUsaha'],
                'tertib_pengawasan'         => $validatedData['tertibPengawasan'],
                'catatan'                   => $validatedData['catatan'],
                'created_by'                => $userId,
            ],
        );
    }

    public function show(string $tahun, string $fileName)
    {
        // $daftarTertibUsahaBUJK = $this->rekapPengawasanService->getDaftarTertibUsahaBUJKTahunanWithPengawasanRutin($tahun);
        $daftarTertibUsahaBUJK = $this->rekapPengawasanService->getDaftarTertibUsahaBUJKTahunan($tahun);

        return Inertia::render('Rekapitulasi/TertibUsaha/Show', [
            'data' => [
                'daftarTertibUsahaBUJK' => PengawasanTertibUsahaBUJKResource::collection($daftarTertibUsahaBUJK),
            ],
        ]);
    }
}
