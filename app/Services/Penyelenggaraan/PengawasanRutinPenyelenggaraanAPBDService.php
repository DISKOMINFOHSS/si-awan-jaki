<?php

namespace App\Services\Penyelenggaraan;

use App\Models\Penyelenggaraan\PemeriksaanRutinPenyelenggaraanAPBD;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Support\Collection as DBCollection;
use Illuminate\Support\Facades\DB;

class PengawasanRutinPenyelenggaraanAPBDService
{
    public function getDaftarLingkupPengawasan(string $pengawasanId)
    {
        return PemeriksaanRutinPenyelenggaraanAPBD::join(
            'master_lingkup_pengawasan_penyelenggaraan as lingkup_pengawasan',
            'lingkup_pengawasan.id',
            'master_pemeriksaan_pengawasan_rutin_penyelenggaraan_dana_apbd.lingkup_id'
        )->leftJoin('pemeriksaan_pengawasan_rutin_penyelenggaraan as hasil_pemeriksaan', function (JoinClause $join) use ($pengawasanId)
            {
                $join->on('master_pemeriksaan_pengawasan_rutin_penyelenggaraan_dana_apbd.lingkup_id', '=', 'hasil_pemeriksaan.lingkup_id')
                     ->where('hasil_pemeriksaan.pengawasan_id', $pengawasanId);
            }
        )->with(
            ['indikator']
        )->select(
            'lingkup_pengawasan.id',
            'master_pemeriksaan_pengawasan_rutin_penyelenggaraan_dana_apbd.*',
            'lingkup_pengawasan.lingkup_pengawasan as lingkupPengawasan',
            'hasil_pemeriksaan.kesimpulan_pemeriksaan',
            'hasil_pemeriksaan.catatan_pemeriksaan',
        )->get();
    }

    public function addPemeriksaanPengawasan(array $data)
    {
        DB::table('pemeriksaan_pengawasan_rutin_penyelenggaraan')->updateOrInsert(
            [
                'pengawasan_id' => $data['pengawasan_id'],
                'lingkup_id'    => $data['lingkup_id'],
            ],
            [
                'kesimpulan_pemeriksaan' => $data['kesimpulan_pemeriksaan'],
                'catatan_pemeriksaan'    => $data['catatan_pemeriksaan'],
                'created_by'             => $data['created_by'],
                'updated_at'             => now(),
            ]
        );
    }
}
