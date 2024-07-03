<?php

namespace App\Services\PemanfaatanProduk;

use App\Models\PemanfaatanProduk\PengawasanPemanfaatanProduk;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Support\Collection as DBCollection;
use Illuminate\Support\Facades\DB;

class PengawasanPemanfaatanProdukService
{
    public function getDaftarLingkupPengawasan(string $pengawasanId): DBCollection
    {
        return DB::table('master_pengawasan_pemanfaatan_produk as pemeriksaan')
            ->leftJoin('pemeriksaan_pengawasan_pemanfaatan_produk as hasil_pemeriksaan', function (JoinClause $join) use ($pengawasanId)
            {
                $join->on('pemeriksaan.id', '=', 'hasil_pemeriksaan.lingkup_id')
                     ->where('hasil_pemeriksaan.pengawasan_id', $pengawasanId);
            })
            ->select('pemeriksaan.*', 'hasil_pemeriksaan.kesimpulan_pemeriksaan', 'hasil_pemeriksaan.catatan_pemeriksaan')
            ->orderBy('pemeriksaan.id')
            ->get();
    }

    public function addPengawasan(array $data): string
    {
        $pengawasan = PengawasanPemanfaatanProduk::create([
            'jenis_pengawasan'   => $data['jenis_pengawasan'],
            'tanggal_pengawasan' => $data['tanggal_pengawasan'],
            'bangunan_id'        => $data['bangunan_id'],
            'created_by'         => $data['created_by'],
        ]);

        return $pengawasan->id;
    }

    public function getDaftarPengawasan(): EloquentCollection
    {
        return PengawasanPemanfaatanProduk::with([
            'bangunan',
            'bangunan.pemilikBangunan',
            'bangunan.pengelolaBangunan',
        ])
        ->select(
            'id',
            'jenis_pengawasan',
            'tanggal_pengawasan',
            'bangunan_id',
            'tertib_kesesuaian_fungsi',
            'tertib_kesesuaian_lokasi',
            'tertib_rencana_umur_konstruksi',
            'tertib_kapasitas_beban',
            'tertib_pemeliharaan_bangunan',
            'tertib_program_pemeliharaan',
        )
        ->orderBy('created_at')
        ->get();
    }

    public function getPengawasanById(string $id): PengawasanPemanfaatanProduk
    {
        return PengawasanPemanfaatanProduk::with([
            'bangunan' => function (Builder $query) {
                $query
                ->join('pemilik_pengelola_bangunan as pemilik', 'pemilik.id', 'bangunan.pemilik_bangunan')
                ->join('pemilik_pengelola_bangunan as pengelola', 'pengelola.id', 'bangunan.pengelola_bangunan')
                ->select('bangunan.*', 'pemilik.nama as pemilik_bangunan', 'pengelola.nama as pengelola_bangunan');
            },
        ])
        ->where('id', $id)
        ->firstOrFail();
    }
}
