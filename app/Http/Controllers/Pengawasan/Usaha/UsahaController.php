<?php

namespace App\Http\Controllers\Pengawasan\Usaha;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Services\Usaha\PengawasanUsahaService;
use Illuminate\Http\Request;

class UsahaController extends Controller
{
    protected $pengawasanService;

    public function __construct(PengawasanUsahaService $pengawasanService)
    {
        $this->pengawasanService = $pengawasanService;
    }

    public function scope()
    {
        $daftarLingkup = $this->pengawasanService->getDaftarLingkupPengawasan();

        return Inertia::render('Pengawasan/Usaha/Scope', [
            'data' => [
                'daftarLingkupPengawasan' => $daftarLingkup,
            ],
        ]);
    }

    public function category(string $lingkup_id)
    {
        if (!$this->pengawasanService->checkLingkupPengawasanExists($lingkup_id)) {
            abort(404);
        }

        $daftarObjek = $this->pengawasanService->getDaftarObjekPengawasan($lingkup_id);

        if (count($daftarObjek) == 1) {
            return redirect("/admin/pengawasan/usaha/$lingkup_id");
        }

        return Inertia::render('Pengawasan/Usaha/Category', [
            'data' => [
                'lingkupPengawasan'     => $this->pengawasanService->getLingkupPengawasan($lingkup_id),
                'daftarObjekPengawasan' => $daftarObjek,
            ],
        ]);
    }
}
