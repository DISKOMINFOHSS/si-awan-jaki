<?php

namespace App\Services\Usaha;

use App\Models\Usaha\Usaha;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

class PendataanUsahaPerseoranganService
{
    public function addSertifikatStandar(array $data)
    {
        $sertifikatId = DB::table('sertifikat_standar_usaha_perseorangan')->insertGetId([
            'nomor_sertifikat' => $data['nomor_sertifikat'],
            'sertifikat_id'    => $data['sertifikat_id'],
            'pemegang'         => $data['pemegang'],
            'subklasifikasi'   => $data['subklasifikasi'],
            'status'           => true,
            'usaha_id'         => $data['usaha_id'],
            'created_by'       => $data['created_by'],
            'created_at'       => now(),
            'updated_at'       => now(),
        ]);

        return $sertifikatId;
    }

    public function checkSertifikatStandarExists(string $id)
    {
        return DB::table('sertifikat_standar_usaha_perseorangan')->where('id', $id)->exists();
    }

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

    public function getDaftarSertifikatStandarAktif(string $usahaId)
    {
        return DB::table('sertifikat_standar_usaha_perseorangan as skk')->leftJoin('files', 'files.id', 'skk.sertifikat_id')
             ->where('skk.usaha_id', $usahaId)
             ->where('status', true)
             ->select(
                'skk.id', 'skk.nomor_sertifikat', 'skk.status', 'skk.pemegang', 'skk.subklasifikasi',
                'skk.sertifikat_id', 'files.path', 'files.name',
            )->orderBy('skk.created_at', 'desc')
             ->get();
    }

    public function getSertifikatStandarById(string $id)
    {
        return DB::table('sertifikat_standar_usaha_perseorangan as skk')->leftJoin('files', 'files.id', 'skk.sertifikat_id')
             ->where('skk.id', $id)
             ->select(
                'skk.id', 'skk.nomor_sertifikat', 'skk.status', 'skk.pemegang', 'skk.subklasifikasi',
                'skk.sertifikat_id', 'files.path', 'files.name',
            )->orderBy('skk.created_at', 'desc')
             ->first();
    }

    public function updateSertifikatStandar(string $id, array $data)
    {
        DB::table('sertifikat_standar_usaha_perseorangan')->where('id', $id)
        ->update([
            'nomor_sertifikat' => $data['nomor_sertifikat'],
            'sertifikat_id'    => $data['sertifikat_id'],
            'pemegang'         => $data['pemegang'],
            'subklasifikasi'   => $data['subklasifikasi'],
            'updated_at'       => now(),
        ]);
    }

    public function deleteSertifikatStandar(string $id)
    {
        return DB::table('sertifikat_standar_usaha_perseorangan')->where('id', $id)->delete();
    }
}
