<?php

namespace App\Services\Usaha;

use Illuminate\Support\Collection as DBCollection;
use Illuminate\Support\Facades\DB;

class PengawasanUsahaService
{
    public function checkLingkupPengawasanExists(string $id): bool
    {
        return DB::table('master_lingkup_pengawasan_usaha')->where('id', $id)->exists();
    }

    public function getDaftarLingkupPengawasan(): DBCollection
    {
        return DB::table('master_lingkup_pengawasan_usaha')
            ->select('id', 'lingkup_pengawasan as lingkupPengawasan', 'label')
            ->orderBy('id')->get();
    }

    public function getLingkupPengawasan(int $id)
    {
        return DB::table('master_lingkup_pengawasan_usaha')
            ->select('id', 'lingkup_pengawasan as lingkupPengawasan', 'label')
            ->where('id', $id)->first();
    }

    public function getDaftarObjekPengawasan(): DBCollection
    {
        return DB::table('master_jenis_usaha as jenis_usaha')
            ->select('jenis_usaha.id', 'jenis_usaha.jenis_usaha as jenisUsaha', 'jenis_usaha.slug')
            ->get();
    }

    public function getDaftarObjekPengawasanByLingkupId(string $lingkupId): DBCollection
    {
        return DB::table('master_objek_pengawasan_usaha as objek_pengawasan')
            ->join('master_jenis_usaha as jenis_usaha', 'jenis_usaha.id', 'objek_pengawasan.objek_id')
            ->where('lingkup_id', $lingkupId)
            ->select('jenis_usaha.id', 'jenis_usaha.jenis_usaha as jenisUsaha', 'jenis_usaha.slug')
            ->get();
    }

}
