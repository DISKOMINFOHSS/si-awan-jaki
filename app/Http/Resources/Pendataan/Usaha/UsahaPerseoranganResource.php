<?php

namespace App\Http\Resources\Pendataan\Usaha;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class UsahaPerseoranganResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'         => $this->id,
            'nama'       => $this->nama,
            'nib'        => $this->nib,
            'dokumenNIB' => $this->when($this->dokumen_nib, [
                'fileId'   => $this->dokumen_nib,
                'fileName' => $this->name,
                'filePath' => Storage::url($this->path),
            ]),
            'alamat'     => $this->alamat,
            'jenisUsaha' => $this->whenLoaded('jenisUsaha'),
            'sertifikatStandar' => $this->sertifikat_standar,
        ];
    }
}
