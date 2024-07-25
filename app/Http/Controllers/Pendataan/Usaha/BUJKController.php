<?php

namespace App\Http\Controllers\Pendataan\Usaha;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Http\Resources\Pendataan\UsahaResource;
use App\Services\Usaha\PendataanUsahaService;
use Illuminate\Http\Request;

class BUJKController extends Controller
{
    protected $usahaService;

    public function __construct(PendataanUsahaService $usahaService)
    {
        $this->usahaService = $usahaService;
    }

    public function show(string $id)
    {
        $usaha = $this->usahaService->getUsahaById($id);

        return Inertia::render('Pendataan/Usaha/BUJK/Show', [
            'data' => [
                'usaha' => new UsahaResource($usaha),
            ],
        ]);
    }
}
