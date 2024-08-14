<?php

namespace App\Http\Controllers\Pendataan\Proyek;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Http\Resources\Pendataan\ProyekKonstruksiCollection;
use App\Http\Resources\Pendataan\ProyekKonstruksiResource;
use App\Services\Usaha\PendataanUsahaService;
use App\Services\Penyelenggaraan\PendataanProyekService;
use Illuminate\Http\Request;

class ProyekController extends Controller
{
    protected $usahaService;
    protected $proyekService;

    public function __construct(
        PendataanUsahaService $usahaService,
        PendataanProyekService $proyekService,
    ) {
        $this->usahaService = $usahaService;
        $this->proyekService = $proyekService;
    }

    public function index()
    {
        $daftarProyek = $this->proyekService->getDaftarProyekKonstruksi();

        return Inertia::render('Pendataan/Proyek/Index', [
            'data' => [
                'daftarProyek' => new ProyekKonstruksiCollection($daftarProyek),
            ],
        ]);
    }

    public function create()
    {
        $daftarUsaha = $this->usahaService->getDaftarUsahaByJenisUsaha('Badan Usaha Jasa Konstruksi');

        return Inertia::render('Pendataan/Proyek/Create', [
            'data' => [
                'daftarUsaha' => $daftarUsaha,
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'namaPaket'      => 'required',
            'sumberDana'     => 'required',
            'tanggalMulai'   => 'nullable|date',
            'tanggalSelesai' => 'nullable|date|after_or_equal:tanggalMulai',
            'tanggalKontrak' => 'nullable|date',
            'tahunAnggaran'  => 'nullable|digits:4',
            'nilaiKontrak'   => 'nullable|decimal:0,2',
            'nilaiPagu'      => 'nullable|decimal:0,2',
        ]);

        $userId = auth()->user()->id;

        $proyekId = $this->proyekService->addProyekKonstruksi([
            'nama_paket'          => $validatedData['namaPaket'],
            'nomor_kontrak'       => $request->input('nomorKontrak'),
            'sumber_dana'         => $validatedData['sumberDana'],
            'tahun_anggaran'      => $validatedData['tahunAnggaran'],
            'nilai_pagu'          => $validatedData['nilaiPagu'],
            'nilai_kontrak'       => $validatedData['nilaiKontrak'],
            'tanggal_kontrak'     => $validatedData['tanggalKontrak'],
            'mulai_pelaksanaan'   => $validatedData['tanggalMulai'],
            'selesai_pelaksanaan' => $validatedData['tanggalSelesai'],
            'created_by'          => $userId,
        ]);

        return redirect("/admin/pendataan/proyek-konstruksi/$proyekId/edit");
    }

    public function show(string $id)
    {
        $proyekKonstruksi = $this->proyekService->getProyekKonstruksiById($id);

        return Inertia::render('Pendataan/Proyek/Show', [
            'data' => [
                'proyekKonstruksi' => new ProyekKonstruksiResource($proyekKonstruksi),
            ],
        ]);
    }

    public function edit(string $id, Request $request)
    {
        $proyekKonstruksi = $this->proyekService->getProyekKonstruksiById($id);

        return Inertia::render('Pendataan/Proyek/Edit', [
            'data' => [
                'proyekKonstruksi' => new ProyekKonstruksiResource($proyekKonstruksi),
            ],
        ]);
    }
}
