<?php

namespace App\Http\Controllers\JenisPengawasan\Rutin;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PengawasanRutinController extends Controller
{
    public function index(?string $year = '2024')
    {
        return Inertia::render('JenisPengawasan/Rutin/Index');
    }
}
