<?php

namespace App\Http\Controllers\Pendataan\Bangunan;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BangunanController extends Controller
{
    public function index()
    {
        return Inertia::render('Pendataan/Bangunan/Index');
    }

    public function create()
    {
        return Inertia::render('Pendataan/Bangunan/Create');
    }
}
