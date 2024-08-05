<?php

namespace App\Http\Resources\Pengawasan;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class PengawasanRutinBUJKLingkup4Resource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $usaha = $this->whenLoaded('usaha');

        return [
            'id'                   => $this->id,
            'jenisPengawasan'      => $this->jenis_pengawasan,
            'tanggalPengawasan'    => $this->tanggal_pengawasan,
            'usaha'                => [
                'id'                      => $usaha->id,
                'nama'                    => $usaha->nama,
                'nib'                     => $usaha->nib,
                'dokumenNIB'              => $this->when($usaha->dokumen_nib, [
                    'fileName' => $usaha->name,
                    'filePath' => Storage::url($usaha->path),
                ]),
                'pjbu'                    => $usaha->pjbu,
                'alamat'                  => $usaha->alamat,
                'daftarSertifikatStandar' => $usaha->sertifikat_standar->transform(
                    function ($sertifikat)
                    {
                        return [
                            'id'              => $sertifikat->id,
                            'nomorSertifikat' => $sertifikat->nomor_sertifikat,
                            'jenisUsaha'      => $sertifikat->jenis_usaha,
                            'subklasifikasi'  => $sertifikat->subklasifikasi,
                            'status'          => (bool)$sertifikat->status,
                            'fileId'          => $sertifikat->sertifikat_id,
                            'fileName'        => $sertifikat->name,
                            'filePath'        => Storage::url($sertifikat->path),
                        ];
                    }
                ),
            ],
            'tertibPersyaratanSBU' => $this->tertib_persyaratan_sbu,
            'tertibPersyaratanNIB' => $this->tertib_persyaratan_nib,
            'tertibPengawasan'     => $this->tertib_pengawasan,
            'catatan'              => $this->catatan,
            'createdBy'            => $this->createdBy->nama,
            'verifiedAt'           => $this->verified_at ? $this->verified_at : null,
            'verifiedBy'           => $this->verifiedBy->nama,
        ];
    }
}
