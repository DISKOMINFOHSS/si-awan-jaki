<?php

namespace App\Services\JenisPengawasan;

use Illuminate\Support\Facades\DB;

class PengawasanRutinTertibUsahaService
{
    public function addPengawasanRutinBUJK(string $usahaId, array $dateRange, array $data)
    {
        DB::table('pengawasan_bujk_rutin')->updateOrInsert(
            [
                'usaha_id' => $usahaId,
                'start'    => $dateRange['start'],
                'end'      => $dateRange['end'],
            ],
            $data,
        );
    }
}
