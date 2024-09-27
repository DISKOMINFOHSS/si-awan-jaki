<?php

namespace App\Http\Resources\Pendataan;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class SertifikatStandarBUJKResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'              => $this->id,
            'nomorSertifikat' => $this->nomor_sertifikat,
            'jenisUsaha'      => $this->jenis_usaha,
            'subklasifikasi'  => $this->subklasifikasi,
            'status'          => (bool)$this->status,
            'fileId'          => $this->sertifikat_id,
            'fileName'        => $this->name,
            'filePath'        => Storage::url($this->path),
        ];
    }
}
