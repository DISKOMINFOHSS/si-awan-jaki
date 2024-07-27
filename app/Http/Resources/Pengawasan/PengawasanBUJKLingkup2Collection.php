<?php

namespace App\Http\Resources\Pengawasan;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class PengawasanBUJKLingkup2Collection extends ResourceCollection
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
                'tertibJenisUsaha'       => $pengawasan->tertib_jenis_usaha === null ?
                    $pengawasan->tertib_jenis_usaha : (bool)$pengawasan->tertib_jenis_usaha,
                'tertibSifatUsaha'       => $pengawasan->tertib_sifat_usaha === null ?
                    $pengawasan->tertib_sifat_usaha : (bool)$pengawasan->tertib_sifat_usaha,
                'tertibKlasifikasiUsaha' => $pengawasan->tertib_klasifikasi_usaha === null ?
                    $pengawasan->tertib_klasifikasi_usaha : (bool)$pengawasan->tertib_klasifikasi_usaha,
                'tertibLayananUsaha'     => $pengawasan->tertib_layanan_usaha === null ?
                    $pengawasan->tertib_layanan_usaha : (bool)$pengawasan->tertib_layanan_usaha,
                'tertibPengawasan'       => $pengawasan->tertib_pengawasan === null ?
                    $pengawasan->tertib_pengawasan : (bool)$pengawasan->tertib_pengawasan,
            ];
        });
    }
}
