<?php

namespace App\Http\Resources\Pengawasan;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class PengawasanBUJKLingkup3Collection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request)
    {
        return $this->collection->transform(function ($pengawasan)
        {
            return [
                'id'                     => $pengawasan->id,
                'jenisPengawasan'        => $pengawasan->jenis_pengawasan,
                'tanggalPengawasan'      => $pengawasan->tanggal_pengawasan,
                'usaha'                  => $pengawasan->usaha,
                'tertibBentukUsaha'      => $pengawasan->tertib_bentuk_usaha,
                'tertibKualifikasiUsaha' => $pengawasan->tertib_kualifikasi_usaha,
                'tertibPengawasan'       => $pengawasan->tertib_pengawasan,
            ];
        });
    }
}
