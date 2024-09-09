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
            'usahaId'               => $this->id,
            'nama'                  => $this->nama,
            'nib'                   => $this->nib,
            'pjbu'                  => $this->pjbu,
            'daftarPengawasanRutin' => PengawasanBUJKRutinResource::collection($this->whenLoaded('pengawasanRutin')),
        ];
    }
}
