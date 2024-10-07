<?php

namespace App\Http\Resources\Pengawasan\TertibUsaha;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PemeriksaanBUJKLingkup5Resource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'                => $this->id,
            'namaPemeriksaan'   => $this->nama_pemeriksaan,
            'indikator'         => $this->indikator,
            'subindikator'      => $this->subindikator,
            'caraPemeriksaan'   => $this->cara_pemeriksaan,
            'dokumen'           => $this->dokumen,
            'hasilPemeriksaan'  => [
                'hasil'   => $this->hasil_pemeriksaan,
                'catatan' => $this->catatan_pemeriksaan,
            ],
        ];
    }
}
