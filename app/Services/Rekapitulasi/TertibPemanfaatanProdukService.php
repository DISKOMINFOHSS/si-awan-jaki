<?php

namespace App\Services\Rekapitulasi;

use App\Models\PemanfaatanProduk\Bangunan;
use App\Models\PemanfaatanProduk\PengawasanPemanfaatanProduk;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;

class TertibPemanfaatanProdukService
{
    public function getDaftarBangunan(string $tahun): EloquentCollection
    {
        return Bangunan::withWhereHas('pengawasan', function ($query) use ($tahun)
        {
            $query->whereYear('tanggal_pengawasan', $tahun)
            ->orderBy('jenis_pengawasan', 'desc');
        })->get();
    }
}
