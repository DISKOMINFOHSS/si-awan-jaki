<?php

namespace App\Services\JenisPengawasan;

use App\Models\Usaha\PengawasanBUJKRutin;
use Illuminate\Support\Facades\DB;

class PengawasanRutinTertibUsahaService
{
    public function addPengawasanRutinBUJK(string $usahaId, array $dateRange, array $data)
    {
        $pengawasanRutin = PengawasanBUJKRutin::updateOrCreate(
            [
                'usaha_id' => $usahaId,
                'start'    => $dateRange['start'],
                'end'      => $dateRange['end'],
            ],
            $data,
        );

        return $pengawasanRutin->id;
    }

    public function getPengawasanRutinBUJK(string $usahaId, array $dateRange)
    {
        return PengawasanBUJKRutin::firstOrCreate([
            'usaha_id' => $usahaId,
            'start'    => $dateRange['start'],
            'end'      => $dateRange['end'],
        ]);
    }

    public function updatePengawasanRutinBUJK(string $id, array $data)
    {
        PengawasanBUJKRutin::where('id', $id)->update($data);
    }

    public function getPengawasanRutinBUJKByLingkup2Id(string $pengawasanLingkup2Id)
    {
        return PengawasanBUJKRutin::where('pengawasan_lingkup_2', $pengawasanLingkup2Id)->first();
    }

    public function getPengawasanRutinBUJKByLingkup3Id(string $pengawasanLingkup3Id)
    {
        return PengawasanBUJKRutin::where('pengawasan_lingkup_3', $pengawasanLingkup3Id)->first();
    }


}
