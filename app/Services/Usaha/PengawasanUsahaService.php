<?php

namespace App\Services\Usaha;

use Illuminate\Support\Collection as DBCollection;
use Illuminate\Support\Facades\DB;

class PengawasanUsahaService
{
    public function getDaftarLingkupPengawasan(): DBCollection
    {
        return DB::table('master_lingkup_pengawasan_usaha')
            ->select('id', 'lingkup_pengawasan as lingkupPengawasan', 'label')
            ->orderBy('id')->get();
    }
}
