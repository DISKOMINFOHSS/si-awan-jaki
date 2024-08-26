<?php

namespace App\Http\Controllers\Pengawasan\Penyelenggaraan\APBD;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Http\Resources\Pengawasan\PengawasanPenyelenggaraanCollection;
use App\Services\Penyelenggaraan\PendataanProyekService;
use App\Services\Penyelenggaraan\PengawasanPenyelenggaraanService;
use Illuminate\Http\Request;

class PenyelenggaraanController extends Controller
{
    protected $proyekService;
    protected $pengawasanService;

    public function __construct(
        PendataanProyekService $proyekService,
        PengawasanPenyelenggaraanService $pengawasanService,
    )
    {
        $this->proyekService = $proyekService;
        $this->pengawasanService = $pengawasanService;
    }

    public function index()
    {
        $daftarProyek = $this->proyekService->getDaftarProyekKonstruksiBySumberDana('APBD');
        $daftarPengawasan = $this->pengawasanService->getDaftarPengawasanBySumberDana('APBD');

        return Inertia::render('Pengawasan/Penyelenggaraan/APBD/Index', [
            'data' => [
                'daftarProyek'     => $daftarProyek,
                'daftarPengawasan' => new PengawasanPenyelenggaraanCollection($daftarPengawasan)
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'tanggal'  => 'required|date',
            'jenis'    => 'required',
            'proyekId' => 'required|exists:proyek_konstruksi,id',
        ]);

        $userId = auth()->user()->id;

        $pengawasanId = $this->pengawasanService->addPengawasan([
            'jenis_pengawasan'     => $validatedData['jenis'],
            'tanggal_pengawasan'   => $validatedData['tanggal'],
            'proyek_konstruksi_id' => $validatedData['proyekId'],
            'created_by'           => $userId,
        ]);

        return redirect("/admin/pengawasan/penyelenggaraan/APBD/");
    }

    public function verify(string $id, Request $request)
    {
        if (!$this->pengawasanService->checkPengawasanExists($id)) {
            return back()->withErrors(['message' => 'Pengawasan tidak ditemukan.']);
        }

        $validatedData = $request->validate([
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

        $pengawasan = $this->pengawasanService->verifyPengawasan(
            $id,
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
                'verified_by'                            => $userId,
            ]
        );

        $jenisPengawasan = strtolower($pengawasan->jenis_pengawasan);

        return redirect("/admin/pengawasan/penyelenggaraan/APBD/$jenisPengawasan/$id");
    }
}
