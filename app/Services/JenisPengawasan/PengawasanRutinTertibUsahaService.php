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

    public function getPengawasanRutinBUJKByLingkup4Id(string $pengawasanLingkup4Id)
    {
        return PengawasanBUJKRutin::where('pengawasan_lingkup_4', $pengawasanLingkup4Id)->first();
    }

    public function getPengawasanRutinBUJKByLingkup5Id(string $pengawasanLingkup5Id)
    {
        return PengawasanBUJKRutin::where('pengawasan_lingkup_5', $pengawasanLingkup5Id)->first();
    }
}
