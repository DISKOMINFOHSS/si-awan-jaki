<?php

namespace App\Http\Resources\Pengawasan;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class PengawasanBUJKLingkup2Resource extends JsonResource
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
            'pengawasanRutinId'       => $this->whenHas('pengawasan_rutin_id'),
            'usaha'                   => [
                'id'                  => $usaha->id,
                'nama'                => $usaha->nama,
                'nib'                 => $usaha->nib,
                'pjbu'                => $usaha->pjbu,
                'alamat'              => $usaha->alamat,
                'sertifikatStandar'   => $usaha->sertifikat_standar ? $usaha->sertifikat_standar->transform(
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
                ) : null,
                'daftarPaketPekerjaan' => $usaha->daftar_paket_pekerjaan,
            ],
            'statusIzinUsaha'          => $this->status_izin_usaha,
            'statusVerifikasiNIB'      => $this->status_verifikasi_nib,
            'tertibJenisUsaha'         => $this->tertib_jenis_usaha,
            'tertibSifatUsaha'         => $this->tertib_sifat_usaha,
            'tertibKlasifikasiUsaha'   => $this->tertib_klasifikasi_usaha,
            'tertibLayananUsaha'       => $this->tertib_layanan_usaha,
            'tertibPengawasan'         => $this->tertib_pengawasan,
            'catatan'                  => $this->catatan,
            'daftarKesesuaianKegiatan' => $this->whenLoaded('kesesuaianKegiatan'),
            'rekomendasi'              => $this->rekomendasi,
            'createdBy'                => $this->createdBy->nama,
            'verifiedAt'               => $this->verified_at ? $this->verified_at : null,
            'verifiedBy'               => $this->verifiedBy->nama,
        ];
    }
}
