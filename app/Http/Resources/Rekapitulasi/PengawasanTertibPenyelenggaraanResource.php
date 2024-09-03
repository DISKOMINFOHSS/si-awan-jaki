<?php

namespace App\Http\Resources\Rekapitulasi;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PengawasanTertibPenyelenggaraanResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'                                 => $this->id,
            'jenisPengawasan'                    => $this->jenis_pengawasan,
            'tanggalPengawasan'                  => $this->tanggal_pengawasan,
            'tertibProsesPemilihanPenyediaJasa'  => $this->tertib_proses_pemilihan_penyedia_jasa,
            'tertibPenerapanStandarKontrak'      => $this->tertib_penerapan_standar_kontrak,
            'tertibPenggunaanTKK'                => $this->tertib_penggunaan_tkk,
            'tertibPemberianPekerjaan'           => $this->tertib_pemberian_pekerjaan,
            'tertibKetersediaanDokumenStandarK4' => $this->tertib_ketersediaan_dokumen_standar_k4,
            'tertibPenerapanSMKK'                => $this->tertib_penerapan_smkk,
            'tertibAntisipasiKecelakaan'         => $this->tertib_antisipasi_kecelakaan,
            'tertibPenerapanManajemenMutu'       => $this->tertib_penerapan_manajemen_mutu,
            'tertibPemenuhanPenyediaanMPTK'      => $this->tertib_pemenuhan_penyediaan_mptk,
            'tertibPenggunaanMPTK'               => $this->tertib_penggunaan_mptk,
            'tertibPenggunaanPDN'                => $this->tertib_penggunaan_pdn,
            'tertibPemenuhanStandarLingkungan'   => $this->tertib_pemenuhan_standar_lingkungan,
            'tertibPengawasan'                   => $this->tertib_pengawasan,
            'catatan'                            => $this->catatan,
            'createdBy'                          => $this->createdBy->nama,
            'verifiedAt'                         => $this->verified_at,
            'verifiedBy'                         => $this->verifiedBy->nama,
        ];
    }
}
