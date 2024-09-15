<?php

namespace App\Http\Resources\Pengawasan;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class PengawasanPenyelenggaraanAPBDResource extends JsonResource
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
            'proyekKonstruksi'                   => $this->whenLoaded('proyekKonstruksi'),
            'daftarLingkupPengawasan'            => $this->daftar_lingkup_pengawasan ? $this->daftar_lingkup_pengawasan->transform(
                function ($lingkupPengawasan)
                {
                    $caraPemeriksaan = $lingkupPengawasan->cara_pemeriksaan;
                    $kesimpulan = (array)json_decode($lingkupPengawasan->kesimpulan_pemeriksaan);
                    $catatan = (array)json_decode($lingkupPengawasan->catatan_pemeriksaan);

                    return [
                        'id'                => $lingkupPengawasan->id,
                        'lingkupPengawasan' => $lingkupPengawasan->lingkupPengawasan,
                        'indikator'         => $lingkupPengawasan->indikator,
                        // 'suratPernyataan'   => $lingkupPengawasan->suratPernyataan,
                        'suratPernyataan'   => $lingkupPengawasan->suratPernyataan->transform(
                            function ($suratPernyataan)
                            {
                                return [
                                    'kategoriId'        => $suratPernyataan->id,
                                    'kategori'          => $suratPernyataan->kategori,
                                    'suratPernyataanId' => $suratPernyataan->surat_pernyataan_id,
                                    'fileId'            => $suratPernyataan->fileId,
                                    'fileName'          => $suratPernyataan->fileName,
                                    'filePath'          => $suratPernyataan->filePath ? Storage::url($suratPernyataan->filePath) : null,
                                ];
                            }
                        ),
                        'dokumen'           => $lingkupPengawasan->dokumen,
                        'kesimpulan'        => $kesimpulan,
                        'daftarPemeriksaan' => array_map(
                            function ($pemeriksaan) use ($caraPemeriksaan, $kesimpulan, $catatan)
                            {
                                return [
                                    'label'           => $pemeriksaan,
                                    'caraPemeriksaan' => $caraPemeriksaan[$pemeriksaan],
                                    'kesimpulan'      => array_key_exists($pemeriksaan, $kesimpulan) ? $kesimpulan[$pemeriksaan] : null,
                                    'catatan'         => array_key_exists($pemeriksaan, $catatan) ? $catatan[$pemeriksaan] : null,
                                ];
                            }, $lingkupPengawasan->kesimpulan
                        ),
                    ];
                }
            ) : null,
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
            'verifiedAt'                         => $this->verified_at ? $this->verified_at : null,
            'verifiedBy'                         => $this->verifiedBy->nama,
        ];
    }
}
