<?php

namespace App\Services\Rekapitulasi;

use App\Models\PemanfaatanProduk\Bangunan;
use App\Models\PemanfaatanProduk\PengawasanPemanfaatanProduk;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Support\Facades\DB;

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

    public function storeVerifikasiPengawasanTahunan(string $tahun, string $bangunanId, array $data)
    {
        DB::table('pengawasan_tahunan_tertib_pemanfaatan_produk')->updateOrInsert(
            [
                'tahun'       => $tahun,
                'bangunan_id' => $bangunanId,
            ],
            [
                'tertib_kesesuaian_fungsi'       => $data['tertib_kesesuaian_fungsi'],
                'tertib_kesesuaian_lokasi'       => $data['tertib_kesesuaian_lokasi'],
                'tertib_rencana_umur_konstruksi' => $data['tertib_rencana_umur_konstruksi'],
                'tertib_kapasitas_beban'         => $data['tertib_kapasitas_beban'],
                'tertib_pemeliharaan_bangunan'   => $data['tertib_pemeliharaan_bangunan'],
                'tertib_program_pemeliharaan'    => $data['tertib_program_pemeliharaan'],
                'tertib_pengawasan'              => $data['tertib_pengawasan'],
                'catatan'                        => $data['catatan'],
                'created_by'                     => $data['created_by'],
                'created_at'                     => now(),
                'updated_at'                     => now(),
            ],
        );
    }
}
