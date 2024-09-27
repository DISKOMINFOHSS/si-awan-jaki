<?php

namespace App\Http\Controllers\Pengawasan\Usaha\Lingkup4;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Http\Resources\Pengawasan\TertibUsaha\PengawasanInsidentalBUJKLingkup4Resource;
use App\Services\JenisPengawasan\PengawasanRutinTertibUsahaService;
use App\Services\Usaha\PengawasanUsahaService;
use App\Services\Usaha\PengawasanLingkup4Service;
use Illuminate\Http\Request;

class BUJKController extends Controller
{
    protected $pengawasanService;
    protected $pengawasanLingkup4Service;
    protected $pengawasanRutinService;

    public function __construct(
        PengawasanUsahaService $pengawasanService,
        PengawasanLingkup4Service $pengawasanLingkup4Service,
        PengawasanRutinTertibUsahaService $pengawasanRutinService,
    ) {
        $this->pengawasanService = $pengawasanService;
        $this->pengawasanLingkup4Service = $pengawasanLingkup4Service;
        $this->pengawasanRutinService = $pengawasanRutinService;
    }

    public function insidental(string $id)
    {
        $lingkupPengawasan = $this->pengawasanService->getLingkupPengawasan(4);
        $pengawasan = $this->pengawasanLingkup4Service->getPengawasanBUJKById($id);

        return Inertia::render('Pengawasan/Usaha/BUJK/Lingkup4/Insidental/Show', [
            'data' => [
                'lingkupPengawasan' => $lingkupPengawasan,
                'pengawasan'        => new PengawasanInsidentalBUJKLingkup4Resource($pengawasan),
            ],
        ]);
    }

    public function recommendation(string $id)
    {
        $lingkupPengawasan = $this->pengawasanService->getLingkupPengawasan(4);
        $pengawasan = $this->pengawasanLingkup4Service->getPengawasanBUJKById($id);

        if ($pengawasan->jenis_pengawasan === 'Rutin') {
            $pengawasanRutinId = $this->pengawasanRutinService->getPengawasanRutinBUJKByLingkup3Id($pengawasan->id)->id;
            return redirect("/admin/pengawasan/usaha/bujk/rutin/$pengawasanRutinId/rekomendasi");
        }

        return Inertia::render('Pengawasan/Usaha/BUJK/Lingkup4/Insidental/Rekomendasi', [
            'data' => [
                'lingkupPengawasan' => $lingkupPengawasan,
                'pengawasan'        => new PengawasanInsidentalBUJKLingkup4Resource($pengawasan),
            ],
        ]);
    }

    public function recommend(string $id, Request $request)
    {
        if (!$this->pengawasanLingkup4Service->checkPengawasanBUJKExists($id)) {
            return back()->withErrors(['message' => 'Pengawasan tidak ditemukan.']);
        }

        $validatedData = $request->validate([
            'rekomendasi'   => 'required',
            'keterangan'    => 'nullable',
        ]);
        $userId = auth()->user()->id;

        $this->pengawasanLingkup4Service->addRekomendasiPengawasanInsidentalBUJK(
            $id,
            [
                'rekomendasi'    => $validatedData['rekomendasi'],
                'keterangan'     => $validatedData['keterangan'],
                'created_by'     => $userId,
            ],
        );

        return back();
    }
}
