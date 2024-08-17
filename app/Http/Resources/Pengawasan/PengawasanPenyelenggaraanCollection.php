<?php

namespace App\Http\Resources\Pengawasan;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class PengawasanPenyelenggaraanCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request)
    {
        return $this->collection->transform(function ($pengawasan)
        {
            return [
                'id'                                 => $pengawasan->id,
                'jenisPengawasan'                    => $pengawasan->jenis_pengawasan,
                'tanggalPengawasan'                  => $pengawasan->tanggal_pengawasan,
                'proyekKonstruksi'                   => $pengawasan->proyekKonstruksi,
                'tertibProsesPemilihanPenyediaJasa'  => $pengawasan->tertib_proses_pemilihan_penyedia_jasa,
                'tertibPenerapanStandarKontrak'      => $pengawasan->tertib_penerapan_standar_kontrak,
                'tertibPenggunaanTKK'                => $pengawasan->tertib_penggunaan_tkk,
                'tertibPemberianPekerjaan'           => $pengawasan->tertib_pemberian_pekerjaan,
                'tertibKetersediaanDokumenStandarK4' => $pengawasan->tertib_ketersediaan_dokumen_standar_k4,
                'tertibPenerapanSMKK'                => $pengawasan->tertib_penerapan_smkk,
                'tertibAntisipasiKecelakaan'         => $pengawasan->tertib_antisipasi_kecelakaan,
                'tertibPenerapanManajemenMutu'       => $pengawasan->tertib_penerapan_manajemen_mutu,
                'tertibPemenuhanPenyediaanMPTK'      => $pengawasan->tertib_pemenuhan_penyediaan_mptk,
                'tertibPenggunaanMPTK'               => $pengawasan->tertib_penggunaan_mptk,
                'tertibPenggunaanPDN'                => $pengawasan->tertib_penggunaan_pdn,
                'tertibPemenuhanStandarLingkungan'   => $pengawasan->tertib_pemenuhan_standar_lingkungan,
                'tertibPengawasan'                   => $pengawasan->tertib_pengawasan,
            ];
        });
    }
}
