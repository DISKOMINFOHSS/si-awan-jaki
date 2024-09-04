<?php

namespace App\Http\Controllers\Rekapitulasi;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TertibUsahaController extends Controller
{
    public function index(string $tahun)
    {
        return Inertia::render('Rekapitulasi/TertibUsaha/Index');
    }
}
