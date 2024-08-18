<?php

namespace App\Services\Penyelenggaraan;

use App\Models\Penyelenggaraan\PemeriksaanRutinPenyelenggaraanAPBD;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Support\Collection as DBCollection;
use Illuminate\Support\Facades\DB;

class PengawasanRutinPenyelenggaraanAPBDService
{
    public function getDaftarLingkupPengawasan()
    {
        return PemeriksaanRutinPenyelenggaraanAPBD::join(
            'master_lingkup_pengawasan_penyelenggaraan as lingkup_pengawasan',
            'lingkup_pengawasan.id',
            'master_pemeriksaan_pengawasan_rutin_penyelenggaraan_dana_apbd.lingkup_id'
        )->with(
            ['indikator']
        )->select(
            'lingkup_pengawasan.id',
            'master_pemeriksaan_pengawasan_rutin_penyelenggaraan_dana_apbd.*',
            'lingkup_pengawasan.lingkup_pengawasan as lingkupPengawasan',
        )->get();
    }
}
