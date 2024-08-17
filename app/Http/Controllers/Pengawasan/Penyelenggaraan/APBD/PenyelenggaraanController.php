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
}
