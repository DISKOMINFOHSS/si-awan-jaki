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
            // 'sertifikatStandar' => $this->sertifikat_standar,
            'sertifikatStandar'   => $this->sertifikat_standar->transform(
                function ($sertifikat)
                {
                    return [
                        'id'              => $sertifikat->id,
                        'nomorSertifikat' => $sertifikat->nomor_sertifikat,
                        'subklasifikasi'  => $sertifikat->subklasifikasi,
                        'status'          => (bool)$sertifikat->status,
                        'fileId'          => $sertifikat->sertifikat_id,
                        'fileName'        => $sertifikat->name,
                        'filePath'        => Storage::url($sertifikat->path),
                    ];
                }
            ),
        ];
    }
}
