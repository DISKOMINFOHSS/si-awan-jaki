<?php

namespace App\Services\Rekapitulasi;

use App\Models\Penyelenggaraan\ProyekKonstruksi;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Database\Query\JoinClause;

class TertibPenyelenggaraanService
{
    public function getDaftarProyekKonstruksi(string $tahun): EloquentCollection
    {
        return ProyekKonstruksi::withWhereHas('pengawasan', function ($query) use ($tahun)
        {
            $query->whereYear('tanggal_pengawasan', $tahun)
                  ->orderBy('jenis_pengawasan', 'desc');
        })->leftJoin('pengawasan_tahunan_tertib_penyelenggaraan as pengawasan_tahunan', function (JoinClause $join) use ($tahun)
        {
            $join->on('proyek_konstruksi.id', '=', 'pengawasan_tahunan.proyek_konstruksi_id')
                 ->where('tahun', $tahun);
        })->select(
            'proyek_konstruksi.*',
            'pengawasan_tahunan.tahun',
            'pengawasan_tahunan.tertib_proses_pemilihan_penyedia_jasa',
            'pengawasan_tahunan.tertib_penerapan_standar_kontrak',
            'pengawasan_tahunan.tertib_penggunaan_tkk',
            'pengawasan_tahunan.tertib_pemberian_pekerjaan',
            'pengawasan_tahunan.tertib_ketersediaan_dokumen_standar_k4',
            'pengawasan_tahunan.tertib_penerapan_smkk',
            'pengawasan_tahunan.tertib_antisipasi_kecelakaan',
            'pengawasan_tahunan.tertib_penerapan_manajemen_mutu',
            'pengawasan_tahunan.tertib_pemenuhan_penyediaan_mptk',
            'pengawasan_tahunan.tertib_penggunaan_mptk',
            'pengawasan_tahunan.tertib_penggunaan_pdn',
            'pengawasan_tahunan.tertib_pemenuhan_standar_lingkungan',
            'pengawasan_tahunan.tertib_pengawasan',
            'pengawasan_tahunan.catatan',
        )->orderBy('proyek_konstruksi.nama_paket')
         ->get();
    }
}
