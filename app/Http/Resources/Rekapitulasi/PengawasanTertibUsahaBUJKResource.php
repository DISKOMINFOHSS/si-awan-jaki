<?php

namespace App\Http\Resources\Rekapitulasi;

use App\Http\Resources\Rekapitulasi\PengawasanBUJKRutinResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PengawasanTertibUsahaBUJKResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'                      => $this->pengawasan_id,
            'tahun'                   => $this->tahun,
            'usahaId'                 => $this->id,
            'nama'                    => $this->nama,
            'nib'                     => $this->nib,
            'pjbu'                    => $this->pjbu,
            'daftarPengawasanRutin'   => PengawasanBUJKRutinResource::collection($this->whenLoaded('pengawasanRutin')),
            'tertibJenisUsaha'        => $this->whenHas('tertib_jenis_usaha'),
            'tertibSifatUsaha'        => $this->whenHas('tertib_sifat_usaha'),
            'tertibKlasifikasiUsaha'  => $this->whenHas('tertib_klasifikasi_usaha'),
            'tertibLayananUsaha'      => $this->whenHas('tertib_layanan_usaha'),
            'tertibBentukUsaha'       => $this->whenHas('tertib_bentuk_usaha'),
            'tertibKualifikasiUsaha'  => $this->whenHas('tertib_kualifikasi_usaha'),
            'tertibPersyaratanSBU'    => $this->whenHas('tertib_persyaratan_sbu'),
            'tertibPersyaratanNIB'    => $this->whenHas('tertib_persyaratan_nib'),
            'tertibPengembanganUsaha' => $this->whenHas('tertib_pengembangan_usaha'),
            'tertibPengawasan'        => $this->whenHas('tertib_pengawasan'),
            'catatan'                 => $this->whenHas('catatan'),
        ];
    }
}
