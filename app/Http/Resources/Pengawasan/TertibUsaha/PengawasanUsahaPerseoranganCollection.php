<?php

namespace App\Http\Resources\Pengawasan\TertibUsaha;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class PengawasanUsahaPerseoranganCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request)
    {
        return $this->collection->transform(
            function ($pengawasan)
            {
                return [
                    'id'                   => $pengawasan->id,
                    'jenisPengawasan'      => $pengawasan->jenis_pengawasan,
                    'tanggalPengawasan'    => $pengawasan->tanggal_pengawasan,
                    'usaha'                => $pengawasan->usaha,
                    'tertibPersyaratanSKK' => $pengawasan->tertib_persyaratan_skk,
                    'tertibPersyaratanNIB' => $pengawasan->tertib_persyaratan_nib,
                    'tertibPengawasan'     => $pengawasan->tertib_pengawasan,
                ];
            }
        );
    }
}
