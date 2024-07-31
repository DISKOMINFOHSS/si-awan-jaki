<?php

namespace App\Http\Resources\Pengawasan;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PengawasanBUJKLingkup5Resource extends JsonResource
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
            'jenisPengawasan'         => $this->jenis_pengawasan,
            'tanggalPengawasan'       => $this->tanggal_pengawasan,
            'usaha'                   => $this->whenLoaded('usaha'),
            'daftarPemeriksaan'       => $this->daftar_pemeriksaan->transform(function ($pemeriksaan)
            {
                return [
                    'id'                => $pemeriksaan->id,
                    'namaPemeriksaan'   => $pemeriksaan->nama_pemeriksaan,
                    'indikator'         => $pemeriksaan->indikator,
                    'subindikator'      => $pemeriksaan->subindikator,
                    'caraPemeriksaan'   => $pemeriksaan->cara_pemeriksaan,
                    'dokumen'           => $pemeriksaan->dokumen,
                    'hasilPemeriksaan'  => [
                        'hasil'   => $pemeriksaan->hasil_pemeriksaan,
                        'catatan' => $pemeriksaan->catatan_pemeriksaan,
                    ],
                ];
            }),
            'tertibPengembanganUsaha' => $this->tertib_pengembangan_usaha,
            'tertibPengawasan'        => $this->tertib_pengawasan,
            'catatan'                 => $this->catatan,
            'createdBy'               => $this->createdBy->nama,
            'verifiedAt'              => $this->verified_at ? $this->verified_at : null,
            'verifiedBy'              => $this->verifiedBy->nama,
        ];
    }
}
