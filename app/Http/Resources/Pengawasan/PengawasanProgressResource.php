<?php

namespace App\Http\Resources\Pengawasan;

use App\Http\Resources\Pendataan\ProyekKonstruksiResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PengawasanProgressResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'               => $this->id,
            'proyekKonstruksi' => new ProyekKonstruksiResource($this->whenLoaded('proyekKonstruksi')),
            'tahunPengawasan'  => $this->tahun_pengawasan,
            'status'           => $this->status,
            'realisasi_fisik'  => $this->whenHas('realisasi_fisik'),
        ];
    }
}
