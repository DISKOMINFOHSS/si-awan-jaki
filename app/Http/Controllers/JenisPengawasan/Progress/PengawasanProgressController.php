<?php

namespace App\Http\Controllers\JenisPengawasan\Progress;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Http\Resources\Pengawasan\Progress\PengawasanProgressResource;
use App\Services\Penyelenggaraan\PendataanProyekService;
use App\Services\JenisPengawasan\PengawasanProgressService;
use Illuminate\Http\Request;

class PengawasanProgressController extends Controller
{
    protected $proyekService;

    public function __construct(
        PendataanProyekService $proyekService,
        PengawasanProgressService $pengawasanService,
    )
    {
        $this->proyekService = $proyekService;
        $this->pengawasanService = $pengawasanService;
    }

    public function index(string $tahun)
    {
        $daftarProyekKonstruksi = $this->proyekService->getDaftarProyekKonstruksiByTahunAnggaran($tahun);
        $daftarPengawasan = $this->pengawasanService->getDaftarPengawasanByTahun($tahun);
        $totalPengawasanByStatus = $this->pengawasanService->getPengawasanCount($tahun);

        $totalPengawasan = [];
        foreach ($totalPengawasanByStatus as $total)
        {
            switch ($total->status)
            {
                case "Dalam Proses":
                    $totalPengawasan['dalamProses'] = $total->total_pengawasan;
                    break;
                case "Selesai":
                    $totalPengawasan['selesai'] = $total->total_pengawasan;
                    break;
                case "Terlambat":
                    $totalPengawasan['terlambat'] = $total->total_pengawasan;
                    break;
            }
        }

        return Inertia::render('JenisPengawasan/Progress/Index', [
            'data' => [
                'daftarProyekKonstruksi' => $daftarProyekKonstruksi,
                'daftarPengawasan'       => PengawasanProgressResource::collection($daftarPengawasan),
                'totalPengawasan'        => $totalPengawasan,
            ],
        ]);
    }

    public function store(string $tahun, Request $request)
    {
        $validatedData = $request->validate(['proyekId' => 'required|exists:proyek_konstruksi,id']);
        $userId = auth()->user()->id;

        $pengawasanId = $this->pengawasanService->addPengawasan([
            'proyek_konstruksi_id' => $validatedData['proyekId'],
            'tahun_pengawasan'     => $tahun,
            'created_by'           => $userId,
        ]);

        return redirect("/admin/jenis-pengawasan/progress/$tahun/$pengawasanId");
    }

    public function show(string $tahun, string $id)
    {
        $pengawasan = $this->pengawasanService->getPengawasanById($id, $tahun);
        $pengawasan['realisasi_fisik'] = $this->pengawasanService->getDaftarRealisasiFisik($id);

        return Inertia::render('JenisPengawasan/Progress/Show', [
            'data' => [
                'pengawasan' => new PengawasanProgressResource($pengawasan),
            ],
        ]);
    }

    public function target(string $tahun, string $id, Request $request)
    {
        if (!$this->pengawasanService->checkPengawasanExists($id)) {
            return back()->withErrors(['message' => 'Pengawasan tidak ditemukan.']);
        }

        $validatedData = $request->validate([
            'targetRealisasi.*.tanggal' => 'required|date',
            'targetRealisasi.*.target'  => 'required|decimal:0,2',
        ]);
        $userId = auth()->user()->id;

        foreach ($request->input('targetRealisasi') as $target)
        {
            $this->pengawasanService->addTargetRealisasiFisik(
                $id,
                [
                    'tanggal'    => $target['tanggal'],
                    'target'     => $target['target'],
                    'created_by' => $userId,
                ],
            );
        }

        return redirect("/admin/jenis-pengawasan/progress/$tahun/$id");
    }

    public function realisasi(string $tahun, string $pengawasan_id, string $id, Request $request)
    {
        if (!$this->pengawasanService->checkPengawasanExists($pengawasan_id)) {
            return back()->withErrors(['message' => 'Pengawasan tidak ditemukan.']);
        }

        $validatedData = $request->validate([
            'realisasi'      => 'required|decimal:0,2|max_digits:100',
            'fotoLapangan.*' => 'required|image|max:1280',
        ]);
        $userId = auth()->user()->id;

        $realisasi = $this->pengawasanService->addRealisasiFisik(
            $id,
            $pengawasan_id,
            [
                'realisasi'     => $validatedData['realisasi'],
                'foto_lapangan' => $request->file('fotoLapangan'),
            ],
        );

        if ($validatedData['realisasi'] == 100) {
            $status = 'Selesai';
        } elseif ($validatedData['realisasi'] >= $realisasi->target) {
            $status = 'Dalam Proses';
        } else {
            $status = 'Terlambat';
        }

        $this->pengawasanService->updatePengawasanStatus($pengawasan_id, $status);

        return redirect("/admin/jenis-pengawasan/progress/$tahun/$pengawasan_id");
    }
}
