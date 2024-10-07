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
            'desa_kelurahan'            => strtoupper($request->input('bangunan.desaKelurahan')),
            'kecamatan'                 => $validatedData['bangunan']['kecamatan'],
            'created_by'                => $userId,
        ]);

        return redirect("/admin/pendataan/bangunan");
    }

    public function show(string $id)
    {
        $bangunan = $this->bangunanService->getBangunan($id);
        $bangunan['daftar_bukti_dukung'] = $this->bangunanService->getDaftarBuktiDukungByBangunanId($id);

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

    public function update(string $id, Request $request)
    {
        if (!$this->bangunanService->checkBangunanExists($id)) {
            return back()->withErrors(['message' => 'Bangunan tidak ditemukan.']);
        }

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
        ]);

        $bangunanId = $this->bangunanService->updateBangunan([
            'id'                        => $id,
            'nama'                      => $validatedData['bangunan']['nama'],
            'nomor_kontrak_pembangunan' => $validatedData['bangunan']['nomorKontrak'],
            'sumber_dana'               => $validatedData['bangunan']['sumberDana'],
            'mulai_pembangunan'         => $validatedData['bangunan']['tanggalMulaiBangun'],
            'selesai_pembangunan'       => $validatedData['bangunan']['tanggalSelesaiBangun'],
            'tanggal_pemanfaatan'       => $validatedData['bangunan']['tanggalPemanfaatan'],
            'umur_konstruksi'           => $validatedData['bangunan']['umurKonstruksi'],
            'lokasi'                    => $validatedData['bangunan']['lokasi'],
            'desa_kelurahan'            => strtoupper($request->input('bangunan.desaKelurahan')),
            'kecamatan'                 => $validatedData['bangunan']['kecamatan'],
        ]);
    }

    public function updatePemilik(string $id, Request $request)
    {
        if (!$this->bangunanService->checkBangunanExists($id)) {
            return back()->withErrors(['message' => 'Bangunan tidak ditemukan.']);
        }

        $validatedData = $request->validate(['pemilik.nama' => 'required']);
        $userId = auth()->user()->id;
        $pemilikId = $this->bangunanService->getPemilikIdByBangunanId($id);

        $pemilik = $this->bangunanService->updatePemilikPengelolaBangunan([
            'id'         => $pemilikId,
            'nama'       => $validatedData['pemilik']['nama'],
            'nip'        => $request->input('pemilik.nip'),
            'jabatan'    => $request->input('pemilik.jabatan'),
            'instansi'   => $request->input('pemilik.instansi'),
            'alamat'     => $request->input('pemilik.alamat'),
            'created_by' => $userId,
        ]);

        $this->bangunanService->updateSKPengelolaBangunan($id, $request->input('pemilik.sk'));

        if ($pemilikId != $pemilik) {
            $this->bangunanService->updatePemilikBangunan($id, $pemilik);
        }
    }

    public function updatePengelola(string $id, Request $request)
    {
        if (!$this->bangunanService->checkBangunanExists($id)) {
            return back()->withErrors(['message' => 'Bangunan tidak ditemukan.']);
        }

        $validatedData = $request->validate(['pengelola.nama' => 'required']);
        $userId = auth()->user()->id;
        $pengelolaId = $this->bangunanService->getPengelolaIdByBangunanId($id);

        $pengelola = $this->bangunanService->updatePemilikPengelolaBangunan([
            'id'         => $pengelolaId,
            'nama'       => $validatedData['pengelola']['nama'],
            'nip'        => $request->input('pengelola.nip'),
            'jabatan'    => $request->input('pengelola.jabatan'),
            'instansi'   => $request->input('pengelola.instansi'),
            'alamat'     => $request->input('pengelola.alamat'),
            'created_by' => $userId,
        ]);

        $this->bangunanService->updateSKPengelolaBangunan($id, $request->input('pengelola.sk'));

        if ($pengelolaId != $pengelola) {
            $this->bangunanService->updatePengelolaBangunan($id, $pengelola);
        }
    }

    public function storeBuktiDukung(string $id, Request $request)
    {
        if (!$this->bangunanService->checkBangunanExists($id)) {
            return back()->withErrors(['message' => 'Bangunan tidak ditemukan.']);
        }

        $validatedData = $request->validate([
            'tahun' => 'required|digits:4',
            'label' => 'required',
            'url'   => 'required|url:http,https',
        ]);
        $userId = auth()->user()->id;

        $data = [
            'tahun'      => $validatedData['tahun'],
            'label'      => $validatedData['label'],
            'url'        => $validatedData['url'],
            'created_by' => $userId,
        ];

        if ($request->has('id')) {
            $this->bangunanService->updateBuktiDukung($request->input('id'), $data);
        } else {
            $this->bangunanService->addBuktiDukung($id, $data);
        }

        return back();
    }

    public function deleteBuktiDukung(string $id, string $bukti_dukung_id)
    {
        if (!$this->bangunanService->checkBangunanExists($id)) {
            return back()->withErrors(['message' => 'Bangunan tidak ditemukan.']);
        }

        if (!$this->bangunanService->checkBuktiDukungExists($bukti_dukung_id)) {
            return back()->withErrors(['message' => 'Bukti dukung tidak ditemukan.']);
        }

        $this->bangunanService->deleteBuktiDukung($bukti_dukung_id, $id);

        return back();
    }
}
