<?php

namespace App\Services\Penyelenggaraan;

use App\Models\Penyelenggaraan\PengawasanPenyelenggaraan;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;

class PengawasanPenyelenggaraanService
{
    public function addPengawasan(array $data): string
    {
        $pengawasan = PengawasanPenyelenggaraan::create([
            'jenis_pengawasan'     => $data['jenis_pengawasan'],
            'tanggal_pengawasan'   => $data['tanggal_pengawasan'],
            'proyek_konstruksi_id' => $data['proyek_konstruksi_id'],
            'created_by'           => $data['created_by'],
        ]);

        return $pengawasan->id;
    }

    public function getDaftarPengawasanBySumberDana(string $sumberDana): EloquentCollection
    {
        return PengawasanPenyelenggaraan::withWhereHas(
            'proyekKonstruksi', function ($query) use ($sumberDana)
            {
                $query->where('sumber_dana', $sumberDana);
            }
        )->orderBy('created_at')
         ->get();
    }
}
