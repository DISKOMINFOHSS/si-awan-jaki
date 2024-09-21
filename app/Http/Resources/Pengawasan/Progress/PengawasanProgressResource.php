<?php

namespace App\Http\Resources\Pengawasan\Progress;

use App\Http\Resources\Pendataan\ProyekKonstruksiResource;
use App\Http\Resources\Pengawasan\Progress\RealisasiFisikPengawasanProgressResource;
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
            'realisasiFisik'   => RealisasiFisikPengawasanProgressResource::collection($this->whenHas('realisasi_fisik')),
        ];
    }
}
