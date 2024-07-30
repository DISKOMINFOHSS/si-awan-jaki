<?php

namespace App\Http\Resources\Pengawasan;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class PengawasanBUJKLingkup3Resource extends JsonResource
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
            'id'                      => $this->id,
            'jenisPengawasan'         => $this->jenis_pengawasan,
            'tanggalPengawasan'       => $this->tanggal_pengawasan,
            'usaha'                   => [
                'id'                  => $usaha->id,
                'nama'                => $usaha->nama,
                'nib'                 => $usaha->nib,
                'pjbu'                => $usaha->pjbu,
                'alamat'              => $usaha->alamat,
                'sertifikatStandar'   => $usaha->sertifikat_standar->transform(
                    function ($sertifikat)
                    {
                        return [
                            'id'       => $sertifikat->id,
                            'fileId'   => $sertifikat->sertifikat_id,
                            'fileName' => $sertifikat->name,
                            'filePath' => Storage::url($sertifikat->path),
                            'status'   => $sertifikat->status,
                        ];
                    }
                ),
                'daftarPaketPekerjaan' => $usaha->daftar_paket_pekerjaan,
            ],
            'statusIzinUsaha'          => $this->status_izin_usaha,
            'statusVerifikasiNIB'      => $this->status_verifikasi_nib,
            'tertibBentukUsaha'        => $this->tertib_bentuk_usaha,
            'tertibKualifikasiUsaha'   => $this->tertib_kualifikasi_usaha,
            'tertibPengawasan'         => $this->tertib_pengawasan,
            'catatan'                  => $this->catatan,
            // 'daftarKesesuaianKegiatan' => $this->whenLoaded('kesesuaianKegiatan'),
            'createdBy'                => $this->createdBy->nama,
            'verifiedAt'               => $this->verified_at ? $this->verified_at : null,
            'verifiedBy'               => $this->verifiedBy->nama,
        ];
    }
}
