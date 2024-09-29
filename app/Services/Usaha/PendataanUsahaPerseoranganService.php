<?php

namespace App\Services\Usaha;

use Illuminate\Support\Facades\DB;

class PendataanUsahaPerseoranganService
{
    public function getDaftarSertifikatStandar(string $usahaId)
    {
        return DB::table('sertifikat_standar_usaha_perseorangan as skk')->leftJoin('files', 'files.id', 'skk.sertifikat_id')
             ->where('skk.usaha_id', $usahaId)
             ->select(
                'skk.id', 'skk.nomor_sertifikat', 'skk.status', 'skk.pemegang', 'skk.subklasifikasi',
                'skk.sertifikat_id', 'files.path', 'files.name',
            )->orderBy('skk.created_at', 'desc')
             ->get();
    }
}
