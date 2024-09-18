<?php

namespace App\Services\JenisPengawasan;

use App\Models\Penyelenggaraan\PengawasanProgress;

class PengawasanProgressService
{
    public function addPengawasan(array $data): string
    {
        $pengawasan = PengawasanProgress::create([
            'proyek_konstruksi_id' => $data['proyek_konstruksi_id'],
            'tahun_pengawasan'     => $data['tahun_pengawasan'],
            'created_by'           => $data['created_by'],
        ]);

        return $pengawasan->id;
    }

    public function getPengawasanById(string $id, string $tahun)
    {
        return PengawasanProgress::with([
            'proyekKonstruksi',
            'proyekKonstruksi.penyediaJasa',
            'proyekKonstruksi.penggunaJasa',
            'proyekKonstruksi.konsultanPengawas',
        ])->where('tahun_pengawasan', $tahun)
          ->where('id', $id)
          ->firstOrFail();
    }
}
