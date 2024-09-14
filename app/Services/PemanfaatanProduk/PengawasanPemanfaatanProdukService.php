<?php

namespace App\Services\PemanfaatanProduk;

use App\Models\PemanfaatanProduk\PemeriksaanPengawasanPemanfaatanProduk;
use App\Models\PemanfaatanProduk\PengawasanPemanfaatanProduk;
use App\Models\PemanfaatanProduk\RekomendasiPengawasanPemanfaatanProduk;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Support\Collection as DBCollection;
use Illuminate\Support\Facades\DB;

class PengawasanPemanfaatanProdukService
{
    public function checkLingkupPengawasanExists(string $id): bool
    {
        return DB::table('master_pengawasan_pemanfaatan_produk')->where('id', $id)->exists();
    }

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

    public function checkPengawasanExists(string $id): bool
    {
        return PengawasanPemanfaatanProduk::where('id', $id)->exists();
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
            'bangunan'    => function (Builder $query) {
                $query
                ->join('pemilik_pengelola_bangunan as pemilik', 'pemilik.id', 'bangunan.pemilik_bangunan')
                ->join('pemilik_pengelola_bangunan as pengelola', 'pengelola.id', 'bangunan.pengelola_bangunan')
                ->select('bangunan.*', 'pemilik.nama as pemilik_bangunan', 'pengelola.nama as pengelola_bangunan');
            },
            'rekomendasi' => function (Builder $query) {
                $query
                ->select('pengawasan_id', 'rekomendasi', 'keterangan', 'tanggal_temuan as tanggalTemuan');
            },
        ])
        ->where('id', $id)
        ->firstOrFail();
    }

    public function verifyPengawasan(string $id, array $data)
    {
        $pengawasan = PengawasanPemanfaatanProduk::find($id);

        $pengawasan->tertib_kesesuaian_fungsi = $data['tertib_kesesuaian_fungsi'];
        $pengawasan->tertib_kesesuaian_lokasi = $data['tertib_kesesuaian_lokasi'];
        $pengawasan->tertib_rencana_umur_konstruksi = $data['tertib_rencana_umur_konstruksi'];
        $pengawasan->tertib_kapasitas_beban = $data['tertib_kapasitas_beban'];
        $pengawasan->tertib_pemeliharaan_bangunan = $data['tertib_pemeliharaan_bangunan'];
        $pengawasan->tertib_program_pemeliharaan = $data['tertib_program_pemeliharaan'];
        $pengawasan->tertib_pengawasan = $data['tertib_pengawasan'];

        $pengawasan->catatan = $data['catatan'];

        $pengawasan->verified_by = $data['verified_by'];
        $pengawasan->verified_at = now();

        $pengawasan->save();
    }

    public function deletePengawasan(string $id)
    {
        $pengawasan = PengawasanPemanfaatanProduk::find($id);
        $pengawasan->delete();
    }

    public function addPemeriksaanPengawasan(array $data): string
    {
        $pemeriksaan = PemeriksaanPengawasanPemanfaatanProduk::firstOrNew([
            'pengawasan_id' => $data['pengawasan_id'],
            'lingkup_id'    => $data['lingkup_id'],
        ]);

        $pemeriksaan->kesimpulan_pemeriksaan = $data['kesimpulan_pemeriksaan'];
        $pemeriksaan->catatan_pemeriksaan = $data['catatan_pemeriksaan'];
        $pemeriksaan->created_by = $data['created_by'];

        $pemeriksaan->save();

        return $pemeriksaan->id;
    }

    public function addRekomendasiPengawasan(array $data): string
    {
        // $rekomendasi = DB::table('rekomendasi_pengawasan_pemanfaatan_produk')->insert([
        //     'rekomendasi'   => $data['rekomendasi'],
        //     'keterangan'    => $data['keterangan'],
        //     'tanggalTemuan' => $data['tanggalTemuan'],
        //     'created_by'    => $data['created_by'],
        // ]);

        $rekomendasi = RekomendasiPengawasanPemanfaatanProduk::firstOrNew([
            'pengawasan_id' => $data['pengawasan_id'],
        ]);

        $rekomendasi->rekomendasi = $data['rekomendasi'];
        $rekomendasi->keterangan = $data['keterangan'];
        $rekomendasi->tanggal_temuan = $data['tanggal_temuan'];
        $rekomendasi->created_by = $data['created_by'];

        $rekomendasi->save();

        return $rekomendasi->id;
    }
}
