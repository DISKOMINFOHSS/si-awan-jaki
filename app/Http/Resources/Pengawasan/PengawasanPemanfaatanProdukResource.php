<?php

namespace App\Http\Resources\Pengawasan;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PengawasanPemanfaatanProdukResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $bangunan = $this->bangunan;

        return [
            'id'                => $this->id,
            'jenisPengawasan'   => $this->jenis_pengawasan,
            'tanggalPengawasan' => Carbon::parse($this->tanggal_pengawasan)->locale('id')->isoFormat('D MMMM Y'),
            'bangunan'          => [
                'nama'                  => $bangunan->nama,
                'pemilikBangunan'       => $bangunan->pemilik_bangunan,
                'pengelolaBangunan'     => $bangunan->pengelola_bangunan,
                'lokasi'                => $bangunan->lokasi,
                'desaKelurahan'         => $bangunan->desa_kelurahan,
                'kecamatan'             => $bangunan->kecamatan,
            ],
            'daftarPemeriksaan' => $this->whenHas('daftarPemeriksaan')
                ->transform(function ($pemeriksaan)
                {
                    $kesimpulan = (array)json_decode($pemeriksaan->kesimpulan_pemeriksaan);
                    $catatan = (array)json_decode($pemeriksaan->catatan_pemeriksaan);

                    return [
                        'id'                => $pemeriksaan->id,
                        'lingkupPengawasan' => $pemeriksaan->lingkup_pengawasan,
                        'detail'            => $pemeriksaan->detail,
                        'indikator'         => $pemeriksaan->indikator,
                        'caraPemeriksaan'   => $pemeriksaan->cara_pemeriksaan,
                        'dokumen'           => $pemeriksaan->dokumen,
                        'hasilPemeriksaan'  => array_map(function ($hasil) use ($kesimpulan, $catatan)
                        {
                            return [
                                'label'      => $hasil,
                                'kesimpulan' => array_key_exists($hasil, $kesimpulan) ? $kesimpulan[$hasil] : null,
                                'catatan'    => array_key_exists($hasil, $catatan) ? $catatan[$hasil] : null,
                            ];
                        }, json_decode($pemeriksaan->kesimpulan)),
                    ];
                }),
            'createdBy'         => $this->createdBy->nama,
            'verifiedAt'        => $this->verified_at && Carbon::parse($this->verified_at)->locale('id')->isoFormat('D MMMM Y'),
            'verifiedBy'        => $this->verifiedBy->nama,
        ];
    }
}
