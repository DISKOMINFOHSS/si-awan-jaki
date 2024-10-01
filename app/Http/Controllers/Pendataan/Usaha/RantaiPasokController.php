<?php

namespace App\Http\Controllers\Pendataan\Usaha;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Http\Resources\Pendataan\UsahaRantaiPasokResource;
use App\Services\Usaha\PendataanUsahaService;
use Illuminate\Http\Request;

class RantaiPasokController extends Controller
{
    protected $usahaService;

    public function __construct(PendataanUsahaService $usahaService)
    {
        $this->usahaService = $usahaService;
    }

    public function show(string $id)
    {
        $usaha = $this->usahaService->getUsahaById($id);

        return Inertia::render('Pendataan/Usaha/RantaiPasok/Show', [
            'data' => [
                'usaha' => new UsahaRantaiPasokResource($usaha),
            ],
        ]);
    }
}
