<?php

namespace App\Services\Penyelenggaraan;

use App\Models\Penyelenggaraan\LingkupPengawasanPenyelenggaraan;
use Illuminate\Contracts\Database\Eloquent\Builder;

class PengawasanInsidentalPenyelenggaraanAPBDService
{
    public function getDaftarLingkupPengawasan(string $pengawasanId)
    {
        return LingkupPengawasanPenyelenggaraan::with(
            [
                'indikatorApbd' => function (Builder $query)
                {
                    $query->join('master_pemeriksaan_pengawasan_insidental_penyelenggaraan_apbd as master_pengawasan_insidental', 'master_indikator_pengawasan_penyelenggaraan_dana_apbd.id', '=', 'master_pengawasan_insidental.indikator_id')
                          ->select(
                            'master_indikator_pengawasan_penyelenggaraan_dana_apbd.*',
                            'master_pengawasan_insidental.cara_pemeriksaan',
                            'master_pengawasan_insidental.kesimpulan',
                          );
                }
            ]
        )->get();
    }
}
