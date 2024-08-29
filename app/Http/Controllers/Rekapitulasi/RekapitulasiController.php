<?php

namespace App\Http\Controllers\Rekapitulasi;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class RekapitulasiController extends Controller
{
    public function index(?string $year = '2024')
    {
        return Inertia::render('Rekapitulasi/Index');
    }
}
