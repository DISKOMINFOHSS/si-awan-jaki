<?php

namespace App\Http\Resources\Pengawasan\Progress;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RealisasiFisikPengawasanProgressResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'           => $this->id,
            'tanggal'      => $this->tanggal,
            'target'       => $this->target,
            'realisasi'    => $this->realisasi,
            'fotoLapangan' => $this->foto_lapangan,
            'catatan'      => $this->catatan,
            'verifiedBy'   => $this->verifiedBy->nama,
        ];
    }
}
