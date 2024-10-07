<?php

namespace App\Http\Resources\Pengawasan\Progress;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

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
            'fotoLapangan' => $this->foto_lapangan ? array_map(
                function ($foto)
                {
                    return [
                        'fileName' => $foto['name'],
                        'filePath' => Storage::url($foto['path']),
                    ];
                }, $this->foto_lapangan) : null,
            'catatan'      => $this->catatan,
            'verifiedBy'   => $this->verifiedBy->nama,
        ];
    }
}
