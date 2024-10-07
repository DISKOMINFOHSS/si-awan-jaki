<?php

namespace App\Http\Resources\Pendataan;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ProyekKonstruksiResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'                        => $this->id,
            'namaPaket'                 => $this->nama_paket,
            'nomorKontrak'              => $this->nomor_kontrak,
            'sumberDana'                => $this->sumber_dana,
            'tahunAnggaran'             => $this->tahun_anggaran,
            'nilaiKontrak'              => $this->nilai_kontrak,
            'nilaiPagu'                 => $this->nilai_pagu,
            'tanggalKontrak'            => $this->tanggal_kontrak,
            'tanggalMulaiPelaksanaan'   => $this->mulai_pelaksanaan,
            'tanggalSelesaiPelaksanaan' => $this->selesai_pelaksanaan,
            'emonevId'                  => $this->emonev_id,
            'penyediaJasa'              => $this->whenLoaded('penyediaJasa'),
            'penggunaJasa'              => $this->whenLoaded('penggunaJasa'),
            'konsultanPengawas'         => $this->whenLoaded('konsultanPengawas'),
            'namaPaketPengawasan'       => $this->nama_paket_pengawasan,
            'daftarSuratPernyataan'     => $this->daftar_surat_pernyataan ? $this->daftar_surat_pernyataan->transform(
                function ($lingkupPengawasan)
                {
                    return [
                        'id'                => $lingkupPengawasan->id,
                        'lingkupPengawasan' => $lingkupPengawasan->lingkupPengawasan,
                        'suratPernyataan'   => $lingkupPengawasan->suratPernyataan->transform(
                            function ($suratPernyataan)
                            {
                                return [
                                    'kategoriId'        => $suratPernyataan->id,
                                    'kategori'          => $suratPernyataan->kategori,
                                    'suratPernyataanId' => $suratPernyataan->suratPernyataanId,
                                    'fileId'            => $suratPernyataan->fileId,
                                    'fileName'          => $suratPernyataan->fileName,
                                    'filePath'          => $suratPernyataan->filePath ? Storage::url($suratPernyataan->filePath) : null,
                                ];
                            }
                        ),
                    ];
                }
            ) : null,
        ];
    }
}
