<?php

namespace App\Services\JenisPengawasan;

use App\Models\Penyelenggaraan\PengawasanProgress;
use App\Models\Penyelenggaraan\RealisasiFisikPengawasanProgress;

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

    public function checkPengawasanExists(string $id): bool
    {
        return PengawasanProgress::where('id', $id)->exists();
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

    public function addTargetRealisasiFisik(string $pengawasanId, array $data)
    {
        RealisasiFisikPengawasanProgress::create([
            'pengawasan_id' => $pengawasanId,
            'tanggal'       => $data['tanggal'],
            'target'        => $data['target'],
            'created_by'    => $data['created_by'],
        ]);
    }

    public function getDaftarRealisasiFisik(string $pengawasanId)
    {
        return RealisasiFisikPengawasanProgress::where('pengawasan_id', $pengawasanId)
            ->orderBy('tanggal', 'desc')->get();
    }
}
