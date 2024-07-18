<?php

namespace App\Http\Controllers\Pendataan\Bangunan;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Http\Resources\Pendataan\BangunanCollection;
use App\Http\Resources\Pendataan\BangunanResource;
use App\Services\PemanfaatanProduk\PendataanBangunanService;
use Illuminate\Http\Request;

class BangunanController extends Controller
{
    protected $bangunanService;

    public function __construct(PendataanBangunanService $bangunanService)
    {
        $this->bangunanService = $bangunanService;
    }

    public function index()
    {
        $daftarBangunan = $this->bangunanService->getDaftarBangunan();

        return Inertia::render('Pendataan/Bangunan/Index', [
            'data' => [
                'daftarBangunan' => new BangunanCollection($daftarBangunan),
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Pendataan/Bangunan/Create');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'bangunan.nama'                 => 'required',
            'bangunan.nomorKontrak'         => 'required',
            'bangunan.sumberDana'           => 'required',
            'bangunan.umurKonstruksi'       => 'required',
            'bangunan.tanggalMulaiBangun'   => 'required|date',
            'bangunan.tanggalSelesaiBangun' => 'required|date|after:bangunan.tanggalMulaiBangun',
            'bangunan.tanggalPemanfaatan'   => 'required|date',
            'bangunan.lokasi'               => 'required',
            'bangunan.kecamatan'            => 'required',
            'pemilik.nama'                  => 'required',
            'pengelola.nama'                => 'required',
        ]);
        $userId = auth()->user()->id;

        $pemilikId = $this->bangunanService->addPemilikPengelolaBangunan([
            'nama'       => $validatedData['pemilik']['nama'],
            'nip'        => $request->input('pemilik.nip'),
            'jabatan'    => $request->input('pemilik.jabatan'),
            'instansi'   => $request->input('pemilik.instansi'),
            'alamat'     => $request->input('pemilik.alamat'),
            'created_by' => $userId,
        ]);

        $pengelolaId = $this->bangunanService->addPemilikPengelolaBangunan([
            'nama'       => $validatedData['pengelola']['nama'],
            'nip'        => $request->input('pengelola.nip'),
            'jabatan'    => $request->input('pengelola.jabatan'),
            'instansi'   => $request->input('pengelola.instansi'),
            'alamat'     => $request->input('pengelola.alamat'),
            'created_by' => $userId,
        ]);

        $bangunan = $this->bangunanService->addBangunan([
            'nama'                      => $validatedData['bangunan']['nama'],
            'nomor_kontrak_pembangunan' => $validatedData['bangunan']['nomorKontrak'],
            'sumber_dana'               => $validatedData['bangunan']['sumberDana'],
            'mulai_pembangunan'         => $validatedData['bangunan']['tanggalMulaiBangun'],
            'selesai_pembangunan'       => $validatedData['bangunan']['tanggalSelesaiBangun'],
            'tanggal_pemanfaatan'       => $validatedData['bangunan']['tanggalPemanfaatan'],
            'umur_konstruksi'           => $validatedData['bangunan']['umurKonstruksi'],
            'pemilik_bangunan'          => $pemilikId,
            'sk_pemilik'                => $request->input('pemilik.sk'),
            'pengelola_bangunan'        => $pengelolaId,
            'sk_pengelola'              => $request->input('pengelola.sk'),
            'lokasi'                    => $validatedData['bangunan']['lokasi'],
            'desa_kelurahan'            => $request->input('bangunan.desa'),
            'kecamatan'                 => $validatedData['bangunan']['kecamatan'],
            'created_by'                => $userId,
        ]);

        return redirect("/admin/pendataan/bangunan");
    }

    public function show(string $id)
    {
        $bangunan = $this->bangunanService->getBangunan($id);

        return Inertia::render('Pendataan/Bangunan/Show', [
            'data' => [
                'bangunan' => new BangunanResource($bangunan),
            ],
        ]);
    }

    public function edit(string $id)
    {
        $bangunan = $this->bangunanService->getBangunan($id);

        return Inertia::render('Pendataan/Bangunan/Edit', [
            'data' => [
                'bangunan' => new BangunanResource($bangunan),
            ],
        ]);
    }
}
