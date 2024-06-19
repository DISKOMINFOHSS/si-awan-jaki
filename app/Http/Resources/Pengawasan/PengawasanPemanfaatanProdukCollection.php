<?php

namespace App\Http\Resources\Pengawasan;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class PengawasanPemanfaatanProdukCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request)
    {
        return $this->collection->transform(function ($pengawasan) {
            $bangunan = $pengawasan->bangunan;

            return [
                'id'                          => $pengawasan->id,
                'jenisPengawasan'             => $pengawasan->jenis_pengawasan,
                'tanggalPengawasan'           => Carbon::parse($pengawasan->tanggal)->locale('id')->isoFormat('D MMMM Y'),
                'tertibKesesuaianFungsi'      => $pengawasan->tertib_kesesuaian_fungsi === null ?
                    $pengawasan->tertib_kesesuaian_fungsi : (bool)$pengawasan->tertib_kesesuaian_fungsi,
                'tertibKesesuaianLokasi'      => $pengawasan->tertib_kesesuaian_lokasi === null ?
                    $pengawasan->tertib_kesesuaian_lokasi : (bool)$pengawasan->tertib_kesesuaian_lokasi,
                'tertibRencanaUmurKonstruksi' => $pengawasan->tertib_rencana_umur_konstruksi === null ?
                    $pengawasan->tertib_rencana_umur_konstruksi : (bool)$pengawasan->tertib_rencana_umur_konstruksi,
                'tertibKapasitasBeban'        => $pengawasan->tertib_kapasitas_beban === null ?
                    $pengawasan->tertib_kapasitas_beban : (bool)$pengawasan->tertib_kapasitas_beban,
                'tertibPemeliharaanBangunan'  => $pengawasan->tertib_pemeliharaan_bangunan === null ?
                    $pengawasan->tertib_pemeliharaan_bangunan : (bool)$pengawasan->tertib_pemeliharaan_bangunan,
                'tertibProgramPemeliharaan'   => $pengawasan->tertib_program_pemeliharaan === null ?
                    $pengawasan->tertib_program_pemeliharaan : (bool)$pengawasan->tertib_program_pemeliharaan,
                'bangunan'                    => [
                    'nama'              => $bangunan->nama,
                    'pemilikBangunan'   => $bangunan->pemilikBangunan->nama,
                    'pengelolaBangunan' => $bangunan->pengelolaBangunan->nama,
                    'lokasi'            => $bangunan->lokasi,
                    'desaKelurahan'     => $bangunan->desa_kelurahan,
                    'kecamatan'         => $bangunan->kecamatan,
                ],
            ];
        });
    }
}
