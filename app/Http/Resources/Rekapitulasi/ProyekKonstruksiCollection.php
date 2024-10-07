<?php

namespace App\Http\Resources\Rekapitulasi;

use App\Http\Resources\Rekapitulasi\PengawasanTertibPenyelenggaraanResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ProyekKonstruksiCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request)
    {
        return $this->collection->transform(
            function ($proyek)
            {
                return [
                    'id'                                 => $proyek->id,
                    'namaPaket'                          => $proyek->nama_paket,
                    'nomorKontrak'                       => $proyek->nomor_kontrak,
                    'sumberDana'                         => $proyek->sumber_dana,
                    'tahunAnggaran'                      => $proyek->tahun_anggaran,
                    'penyediaJasa'                       => [
                        'id'   => $proyek->penyedia_jasa_id,
                        'nama' => $proyek->penyedia_jasa,
                    ],
                    'penggunaJasa'                       => [
                        'id'       => $proyek->pengguna_jasa_id,
                        'nama'     => $proyek->pengguna_jasa,
                        'instansi' => $proyek->pengguna_jasa_instansi,
                    ],
                    'daftarPengawasan'                   => PengawasanTertibPenyelenggaraanResource::collection($proyek->pengawasan),
                    'tertibProsesPemilihanPenyediaJasa'  => $proyek->tertib_proses_pemilihan_penyedia_jasa,
                    'tertibPenerapanStandarKontrak'      => $proyek->tertib_penerapan_standar_kontrak,
                    'tertibPenggunaanTKK'                => $proyek->tertib_penggunaan_tkk,
                    'tertibPemberianPekerjaan'           => $proyek->tertib_pemberian_pekerjaan,
                    'tertibKetersediaanDokumenStandarK4' => $proyek->tertib_ketersediaan_dokumen_standar_k4,
                    'tertibPenerapanSMKK'                => $proyek->tertib_penerapan_smkk,
                    'tertibAntisipasiKecelakaan'         => $proyek->tertib_antisipasi_kecelakaan,
                    'tertibPenerapanManajemenMutu'       => $proyek->tertib_penerapan_manajemen_mutu,
                    'tertibPemenuhanPenyediaanMPTK'      => $proyek->tertib_pemenuhan_penyediaan_mptk,
                    'tertibPenggunaanMPTK'               => $proyek->tertib_penggunaan_mptk,
                    'tertibPenggunaanPDN'                => $proyek->tertib_penggunaan_pdn,
                    'tertibPemenuhanStandarLingkungan'   => $proyek->tertib_pemenuhan_standar_lingkungan,
                    'tertibPengawasan'                   => $proyek->tertib_pengawasan,
                    'catatan'                            => $proyek->catatan,
                ];
            }
        );
    }
}
