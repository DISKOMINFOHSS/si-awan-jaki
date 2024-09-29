<?php

namespace App\Http\Resources\Rekapitulasi;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PengawasanBUJKRutinResource extends JsonResource
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
            'usaha'                     => $this->whenLoaded('usaha'),
            'start'                     => $this->start,
            'end'                       => $this->end,
            'tanggalPengawasan'         => $this->tanggal_pengawasan,
            'pengawasanLingkup2Id'      => $this->pengawasan_lingkup_2,
            // 'tanggalPengawasanLingkup2' => $this->whenHas('tanggal_pengawasan_lingkup_2'),
            'tertibPengawasanLingkup2' => $this->whenHas('tertib_pengawasan_lingkup_2'),
            'tertibJenisUsaha'          => $this->tertib_jenis_usaha,
            'tertibSifatUsaha'          => $this->tertib_sifat_usaha,
            'tertibKlasifikasiUsaha'    => $this->tertib_klasifikasi_usaha,
            'tertibLayananUsaha'        => $this->tertib_layanan_usaha,
            'pengawasanLingkup3Id'      => $this->pengawasan_lingkup_3,
            // 'tanggalPengawasanLingkup3' => $this->whenHas('tanggal_pengawasan_lingkup_3'),
            'tertibPengawasanLingkup3' => $this->whenHas('tertib_pengawasan_lingkup_3'),
            'tertibBentukUsaha'         => $this->tertib_bentuk_usaha,
            'tertibKualifikasiUsaha'    => $this->tertib_kualifikasi_usaha,
            'pengawasanLingkup4Id'      => $this->pengawasan_lingkup_4,
            // 'tanggalPengawasanLingkup4' => $this->whenHas('tanggal_pengawasan_lingkup_4'),
            'tertibPengawasanLingkup4' => $this->whenHas('tertib_pengawasan_lingkup_4'),
            'tertibPersyaratanSBU'      => $this->tertib_persyaratan_sbu,
            'tertibPersyaratanNIB'      => $this->tertib_persyaratan_nib,
            'pengawasanLingkup5Id'      => $this->pengawasan_lingkup_5,
            // 'tanggalPengawasanLingkup5' => $this->whenHas('tanggal_pengawasan_lingkup_5'),
            'tertibPengawasanLingkup5' => $this->whenHas('tertib_pengawasan_lingkup_5'),
            'tertibPengembanganUsaha'   => $this->tertib_pengembangan_usaha,
        ];
    }
}
