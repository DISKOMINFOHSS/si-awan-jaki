<?php

namespace App\Services\Rekapitulasi;

use App\Models\PemanfaatanProduk\Bangunan;
use App\Models\PemanfaatanProduk\PengawasanPemanfaatanProduk;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Database\Query\JoinClause;

class TertibPemanfaatanProdukService
{
    public function getDaftarBangunan(string $tahun): EloquentCollection
    {
        return Bangunan::withWhereHas('pengawasan', function ($query) use ($tahun)
        {
            $query->whereYear('tanggal_pengawasan', $tahun)
            ->orderBy('jenis_pengawasan', 'desc');
        })->leftJoin('pengawasan_tahunan_tertib_pemanfaatan_produk as pengawasan_tahunan', function (JoinClause $join) use ($tahun)
        {
            $join->on('bangunan.id', '=', 'pengawasan_tahunan.bangunan_id')
                 ->where('tahun', $tahun);
        })->select(
            'bangunan.*',
            'pengawasan_tahunan.tahun',
            'pengawasan_tahunan.tertib_kesesuaian_fungsi',
            'pengawasan_tahunan.tertib_kesesuaian_lokasi',
            'pengawasan_tahunan.tertib_rencana_umur_konstruksi',
            'pengawasan_tahunan.tertib_kapasitas_beban',
            'pengawasan_tahunan.tertib_pemeliharaan_bangunan',
            'pengawasan_tahunan.tertib_program_pemeliharaan',
            'pengawasan_tahunan.tertib_pengawasan',
            'pengawasan_tahunan.catatan',
        )
          ->orderBy('bangunan.nama')
          ->get();
    }
}
