<?php

namespace App\Http\Resources\Rekapitulasi;

use App\Http\Resources\Rekapitulasi\PengawasanTertibPemanfaatanProdukResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class BangunanCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request)
    {
        return $this->collection->transform(
            function ($bangunan)
            {
                return [
                    'id'                          => $bangunan->id,
                    'nama'                        => $bangunan->nama,
                    'nomorKontrak'                => $bangunan->nomor_kontrak_pembangunan,
                    'sumberDana'                  => $bangunan->sumber_dana,
                    'tanggalMulaiBangun'          => $bangunan->mulai_pembangunan,
                    'tanggalSelesaiBangun'        => $bangunan->selesai_pembangunan,
                    'tanggalPemanfaatan'          => $bangunan->tanggal_pemanfaatan,
                    'umurKonstruksi'              => $bangunan->umur_konstruksi,
                    'pemilikBangunan'             => $bangunan->pemilikBangunan->nama,
                    'pengelolaBangunan'           => $bangunan->pengelolaBangunan->nama,
                    'lokasi'                      => $bangunan->lokasi,
                    'desaKelurahan'               => $bangunan->desa_kelurahan,
                    'kecamatan'                   => $bangunan->kecamatan,
                    'daftarPengawasan'            => PengawasanTertibPemanfaatanProdukResource::collection($bangunan->pengawasan),
                    'tertibKesesuaianFungsi'      => $bangunan->tertib_kesesuaian_fungsi === null ?
                        $bangunan->tertib_kesesuaian_fungsi : (bool)$bangunan->tertib_kesesuaian_fungsi,
                    'tertibKesesuaianLokasi'      => $bangunan->tertib_kesesuaian_lokasi === null ?
                        $bangunan->tertib_kesesuaian_lokasi : (bool)$bangunan->tertib_kesesuaian_lokasi,
                    'tertibRencanaUmurKonstruksi' => $bangunan->tertib_rencana_umur_konstruksi === null ?
                        $bangunan->tertib_rencana_umur_konstruksi : (bool)$bangunan->tertib_rencana_umur_konstruksi,
                    'tertibKapasitasBeban'        => $bangunan->tertib_kapasitas_beban === null ?
                        $bangunan->tertib_kapasitas_beban : (bool)$bangunan->tertib_kapasitas_beban,
                    'tertibPemeliharaanBangunan'  => $bangunan->tertib_pemeliharaan_bangunan === null ?
                        $bangunan->tertib_pemeliharaan_bangunan : (bool)$bangunan->tertib_pemeliharaan_bangunan,
                    'tertibProgramPemeliharaan'   => $bangunan->tertib_program_pemeliharaan === null ?
                        $bangunan->tertib_program_pemeliharaan : (bool)$bangunan->tertib_program_pemeliharaan,
                    'tertibPengawasan'            => $bangunan->tertib_pengawasan === null ?
                        $bangunan->tertib_pengawasan : (bool)$bangunan->tertib_pengawasan,
                    'catatan'                     => $bangunan->catatan,
                ];
            }
        );
    }
}
