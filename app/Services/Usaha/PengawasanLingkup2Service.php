<?php

namespace App\Services\Usaha;

use App\Models\Usaha\PengawasanBUJKLingkup2;
use Illuminate\Contracts\Database\Eloquent\Builder;

class PengawasanLingkup2Service
{
    public function addPengawasanBUJK(array $data): string
    {
        $pengawasan = PengawasanBUJKLingkup2::create([
            'jenis_pengawasan'      => $data['jenis_pengawasan'],
            'tanggal_pengawasan'    => $data['tanggal_pengawasan'],
            'usaha_id'              => $data['usaha_id'],
            'status_izin_usaha'     => $data['status_izin_usaha'],
            'status_verifikasi_nib' => $data['status_verifikasi_nib'],
            'created_by'            => $data['created_by']
        ]);

        return $pengawasan->id;
    }

    public function getPengawasanBUJKById(string $id): PengawasanBUJKLingkup2
    {
        return PengawasanBUJKLingkup2::with([
            'usaha' => function (Builder $query)
                {
                    $query->select('id', 'nama', 'nib', 'pjbu', 'alamat');
                }
            ])->where('id', $id)->firstOrFail();
    }
}
