<?php

namespace App\Services\Usaha;

use App\Models\Usaha\PengawasanBUJKLingkup5;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;

class PengawasanLingkup5Service
{
    public function addPengawasanBUJK(array $data): string
    {
        $pengawasan = PengawasanBUJKLingkup5::create([
            'jenis_pengawasan'      => $data['jenis_pengawasan'],
            'tanggal_pengawasan'    => $data['tanggal_pengawasan'],
            'usaha_id'              => $data['usaha_id'],
            'created_by'            => $data['created_by'],
        ]);

        return $pengawasan->id;
    }

    public function getDaftarPengawasanBUJK(): EloquentCollection
    {
        return PengawasanBUJKLingkup5::with([
            'usaha' => function (Builder $query)
            {
                $query->select('id', 'nama', 'nib');
            }
        ])->orderBy('created_by', 'desc')
          ->get();
    }
}
