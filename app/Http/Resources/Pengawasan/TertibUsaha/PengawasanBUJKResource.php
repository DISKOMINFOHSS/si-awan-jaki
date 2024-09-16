<?php

namespace App\Http\Resources\Pengawasan\TertibUsaha;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PengawasanBUJKResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'                        => $this->id,
            'jenisPengawasan'           => $this->jenis_pengawasan,
            'tanggalPengawasan'         => $this->tanggal_pengawasan,
            'usaha'                     => $this->whenLoaded('usaha'),
            'tertibJenisUsaha'          => $this->whenHas('tertib_jenis_usaha'),
            'tertibSifatUsaha'          => $this->whenHas('tertib_sifat_usaha'),
            'tertibKlasifikasiUsaha'    => $this->whenHas('tertib_klasifikasi_usaha'),
            'tertibLayananUsaha'        => $this->whenHas('tertib_layanan_usaha'),
            'tertibBentukUsaha'         => $this->whenHas('tertib_bentuk_usaha'),
            'tertibKualifikasiUsaha'    => $this->whenHas('tertib_kualifikasi_usaha'),
            'tertibPersyaratanSBU'      => $this->whenHas('tertib_persyaratan_sbu'),
            'tertibPersyaratanNIB'      => $this->whenHas('tertib_persyaratan_nib'),
            'tertibPengembanganUsaha'   => $this->whenHas('tertib_pengembangan_usaha'),
            'tertibPengawasan'          => $this->tertib_pengawasan,
        ];
    }
}
