<?php

namespace App\Http\Resources\Pengawasan;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class PengawasanBUJKLingkup5Collection extends ResourceCollection
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
                'id'                      => $pengawasan->id,
                'jenisPengawasan'         => $pengawasan->jenis_pengawasan,
                'tanggalPengawasan'       => $pengawasan->tanggal_pengawasan,
                'usaha'                   => $pengawasan->usaha,
                'tertibPengembanganUsaha' => $pengawasan->tertib_pengembangan_usaha,
                'tertibPengawasan'        => $pengawasan->tertib_pengawasan,
            ];
        });
    }
}
