<?php

namespace App\Http\Controllers\Pengawasan\Penyelenggaraan\APBD;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Services\Penyelenggaraan\PendataanProyekService;
use Illuminate\Http\Request;

class PenyelenggaraanController extends Controller
{
    protected $proyekService;

    public function __construct(
        PendataanProyekService $proyekService,
    )
    {
        $this->proyekService = $proyekService;
    }

    public function index()
    {
        $daftarProyek = $this->proyekService->getDaftarProyekKonstruksiBySumberDana('APBD');

        return Inertia::render('Pengawasan/Penyelenggaraan/APBD/Index', [
            'data' => [
                'daftarProyek' => $daftarProyek,
            ],
        ]);
    }
}
