<?php

namespace App\Http\Controllers\Pendataan\Usaha;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BUJKController extends Controller
{
    public function show(string $id)
    {
        return Inertia::render('Pendataan/Usaha/BUJK/Show');
    }
}
