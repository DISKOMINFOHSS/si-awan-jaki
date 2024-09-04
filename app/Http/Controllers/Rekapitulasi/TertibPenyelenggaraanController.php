<?php

namespace App\Http\Controllers\Rekapitulasi;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Http\Resources\Rekapitulasi\ProyekKonstruksiCollection;
use App\Services\Rekapitulasi\TertibPenyelenggaraanService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TertibPenyelenggaraanController extends Controller
{
    protected $rekapPengawasanService;

    public function __construct(
        TertibPenyelenggaraanService $rekapPengawasanService,
    ) {
        $this->rekapPengawasanService = $rekapPengawasanService;
    }

    public function index(?string $tahun = '2024')
    {
        $daftarProyekKonstruksi = $this->rekapPengawasanService->getDaftarProyekKonstruksi($tahun);

        return Inertia::render('Rekapitulasi/TertibPenyelenggaraan/Index', [
            'data' => [
                'daftarProyekKonstruksi' => new ProyekKonstruksiCollection($daftarProyekKonstruksi),
            ],
        ]);
    }

    public function store(string $tahun, Request $request)
    {
        $validatedData = $request->validate([
            'proyekId'                     => 'required|exists:proyek_konstruksi,id',
            'prosesPemilihanPenyediaJasa'  => 'required|boolean',
            'penerapanStandarKontrak'      => 'required|boolean',
            'penggunaanTKKBersertifikat'   => 'required|boolean',
            'pemberianPekerjaan'           => 'required|boolean',
            'ketersediaanDokumenStandarK4' => 'required|boolean',
            'penerapanSMKK'                => 'required|boolean',
            'antisipasiKecelakaan'         => 'required|boolean',
            'penerapanManajemenMutu'       => 'required|boolean',
            'pemenuhanPenyediaanMPK'       => 'required|boolean',
            'penggunaanMPTK'               => 'required|boolean',
            'penggunaanPDN'                => 'required|boolean',
            'pemenuhanStandarLingkungan'   => 'required|boolean',
            'tertibPengawasan'             => 'required|boolean',
            'catatan'                      => 'nullable',
        ]);

        $userId = auth()->user()->id;

        $this->rekapPengawasanService->storeVerifikasiPengawasanTahunan(
            $tahun,
            $validatedData['proyekId'],
            [
                'tertib_proses_pemilihan_penyedia_jasa'  => $validatedData['prosesPemilihanPenyediaJasa'],
                'tertib_penerapan_standar_kontrak'       => $validatedData['penerapanStandarKontrak'],
                'tertib_penggunaan_tkk'                  => $validatedData['penggunaanTKKBersertifikat'],
                'tertib_pemberian_pekerjaan'             => $validatedData['pemberianPekerjaan'],
                'tertib_ketersediaan_dokumen_standar_k4' => $validatedData['ketersediaanDokumenStandarK4'],
                'tertib_penerapan_smkk'                  => $validatedData['penerapanSMKK'],
                'tertib_antisipasi_kecelakaan'           => $validatedData['antisipasiKecelakaan'],
                'tertib_penerapan_manajemen_mutu'        => $validatedData['penerapanManajemenMutu'],
                'tertib_pemenuhan_penyediaan_mptk'       => $validatedData['pemenuhanPenyediaanMPK'],
                'tertib_penggunaan_mptk'                 => $validatedData['penggunaanMPTK'],
                'tertib_penggunaan_pdn'                  => $validatedData['penggunaanPDN'],
                'tertib_pemenuhan_standar_lingkungan'    => $validatedData['pemenuhanStandarLingkungan'],
                'tertib_pengawasan'                      => $validatedData['tertibPengawasan'],
                'catatan'                                => $validatedData['catatan'],
                'created_by'                             => $userId,
            ]
        );

        return redirect()->back();
    }
}
