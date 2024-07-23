<?php

namespace App\Services\Usaha;

use App\Models\Usaha\JenisUsaha;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;

class PendataanUsahaService
{
    public function getDaftarJenisUsaha(): EloquentCollection
    {
        return JenisUsaha::select('id', 'jenis_usaha as jenisUsaha', 'slug')->get();
        // return JenisUsaha::withCount('usaha')->get();
    }

    public function getJenisUsahaWithDaftarUsahaBySlug(string $slug): JenisUsaha
    {
        return JenisUsaha::with(['usaha'])->where('slug', $slug)->first();
    }
}
