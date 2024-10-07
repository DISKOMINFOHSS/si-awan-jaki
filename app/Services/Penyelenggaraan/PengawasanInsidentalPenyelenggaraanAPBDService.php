<?php

namespace App\Services\Penyelenggaraan;

use App\Models\Penyelenggaraan\LingkupPengawasanPenyelenggaraan;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Support\Facades\DB;

class PengawasanInsidentalPenyelenggaraanAPBDService
{
    public function getDaftarLingkupPengawasan(string $pengawasanId)
    {
        return LingkupPengawasanPenyelenggaraan::with(
            [
                'indikatorApbd' => function (Builder $query) use ($pengawasanId)
                {
                    $query->join(
                        'master_pemeriksaan_pengawasan_insidental_penyelenggaraan_apbd as master_pengawasan_insidental',
                        'master_indikator_pengawasan_penyelenggaraan_dana_apbd.id', '=', 'master_pengawasan_insidental.indikator_id'
                    )->leftJoin(
                        'pemeriksaan_pengawasan_insidental_penyelenggaraan_apbd as pemeriksaan_pengawasan_insidental', function (JoinClause $join) use ($pengawasanId)
                        {
                            $join->on('master_indikator_pengawasan_penyelenggaraan_dana_apbd.id', '=', 'pemeriksaan_pengawasan_insidental.indikator_id')
                                 ->where('pemeriksaan_pengawasan_insidental.pengawasan_id', $pengawasanId);
                        }
                    )
                    ->select(
                        'master_indikator_pengawasan_penyelenggaraan_dana_apbd.*',
                        'master_pengawasan_insidental.cara_pemeriksaan',
                        'master_pengawasan_insidental.kesimpulan',
                        'pemeriksaan_pengawasan_insidental.kesimpulan_pemeriksaan',
                        'pemeriksaan_pengawasan_insidental.catatan_pemeriksaan',
                    );
                }
            ]
        )->get();
    }

    public function addPemeriksaanPengawasan(string $pengawasanId, string $indikatorId, array $data)
    {
        DB::table('pemeriksaan_pengawasan_insidental_penyelenggaraan_apbd')->updateOrInsert(
            [
                'pengawasan_id' => $pengawasanId,
                'indikator_id'  => $indikatorId,
            ],
            [
                'kesimpulan_pemeriksaan' => $data['kesimpulan_pemeriksaan'],
                'catatan_pemeriksaan'    => $data['catatan_pemeriksaan'],
                'created_by'             => $data['created_by'],
                'updated_at'             => now(),
            ],
        );
    }
}
