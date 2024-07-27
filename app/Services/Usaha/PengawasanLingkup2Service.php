<?php

namespace App\Services\Usaha;

use App\Models\Usaha\PengawasanBUJKLingkup2;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;

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

    public function getDaftarPengawasanBUJK(): EloquentCollection
    {
        return PengawasanBUJKLingkup2::with([
            'usaha' => function (Builder $query)
            {
                $query->select('id', 'nama', 'nib');
            }
        ])->orderBy('created_by', 'desc')
          ->get();
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
