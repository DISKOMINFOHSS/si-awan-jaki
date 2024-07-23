<?php

namespace App\Http\Resources\Pendataan;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JenisUsahaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'          => $this->id,
            'jenisUsaha'  => $this->jenis_usaha,
            'slug'        => $this->slug,
            'daftarUsaha' => $this->whenLoaded('usaha')->transform(function ($usaha) {
                return [
                    'id'     => $usaha->id,
                    'nama'   => $usaha->nama,
                    'nib'    => $usaha->nib,
                    'pjbu'   => $usaha->pjbu,
                    'alamat' => $usaha->alamat,
                ];
            }),
        ];
    }
}
