<?php

namespace App\Services\Usaha;

use App\Models\Usaha\Usaha;
use Illuminate\Support\Collection as DBCollection;
use Illuminate\Support\Facades\DB;

class PendataanBUJKService
{
    // public function getBUJKById(string $id): Usaha
    // {
    //     return Usaha::
    // }

    public function addSertifikatStandarBUJK(array $data): int
    {
        $sertifikatId = DB::table('sertifikat_standar_bujk')->insertGetId([
            'sertifikat_id' => $data['sertifikat_id'],
            'status'        => true,
            'usaha_id'      => $data['usaha_id'],
            'created_by'    => $data['created_by'],
            'created_at'    => now(),
            'updated_at'    => now(),
        ]);

        return $sertifikatId;
    }

    public function getDaftarSertifikatStandarBUJK(string $usahaId): DBCollection
    {
        return DB::table('sertifikat_standar_bujk as sbu')->join('files', 'files.id', 'sbu.id')
            ->where('sbu.usaha_id', $usahaId)
            ->select('sbu.id', 'sbu.sertifikat_id', 'sbu.status', 'files.path', 'files.name')
            ->get();
    }
}
