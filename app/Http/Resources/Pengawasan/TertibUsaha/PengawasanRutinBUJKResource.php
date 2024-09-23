<?php

namespace App\Http\Resources\Pengawasan\TertibUsaha;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PengawasanRutinBUJKResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'                      => $this->id,
            'jenisPengawasan'         => 'Rutin',
            'tanggalPengawasan'       => $this->tanggal_pengawasan,
            'usaha'                   => $this->whenLoaded('usaha'),
            'statusIzinUsaha'         => $this->whenHas('status_izin_usaha'),
            'statusVerifikasiNIB'     => $this->whenHas('status_verifikasi_nib'),
            'lingkup2Id'              => $this->whenHas('pengawasan_lingkup_2_id'),
            'tertibJenisUsaha'        => $this->whenHas('tertib_jenis_usaha'),
            'tertibSifatUsaha'        => $this->whenHas('tertib_sifat_usaha'),
            'tertibKlasifikasiUsaha'  => $this->whenHas('tertib_klasifikasi_usaha'),
            'tertibLayananUsaha'      => $this->whenHas('tertib_layanan_usaha'),
            'lingkup3Id'              => $this->whenHas('pengawasan_lingkup_3_id'),
            'tertibBentukUsaha'       => $this->whenHas('tertib_bentuk_usaha'),
            'tertibKualifikasiUsaha'  => $this->whenHas('tertib_kualifikasi_usaha'),
            'lingkup4Id'              => $this->whenHas('pengawasan_lingkup_4_id'),
            'tertibPersyaratanSBU'    => $this->whenHas('tertib_persyaratan_sbu'),
            'tertibPersyaratanNIB'    => $this->whenHas('tertib_persyaratan_nib'),
            'lingkup5Id'              => $this->whenHas('pengawasan_lingkup_5_id'),
            'tertibPengembanganUsaha' => $this->whenHas('tertib_pengembangan_usaha'),
            'tertibPengawasan'        => $this->whenHas('tertib_pengawasan'),
        ];
    }
}
