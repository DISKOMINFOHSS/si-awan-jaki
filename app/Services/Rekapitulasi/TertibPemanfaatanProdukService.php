<?php

namespace App\Services\Rekapitulasi;

use App\Models\PemanfaatanProduk\PengawasanPemanfaatanProduk;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;

class TertibPemanfaatanProdukService
{
    public function getDaftarPengawasan(string $tahun): EloquentCollection
    {
        return PengawasanPemanfaatanProduk::with(['bangunan'])
        ->whereYear('tanggal_pengawasan', $tahun)
        ->distinct()
        ->get();
    }
}
