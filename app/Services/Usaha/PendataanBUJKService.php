<?php

namespace App\Services\Usaha;

use App\Models\Usaha\PaketPekerjaan;
use App\Models\Usaha\Usaha;
use Illuminate\Support\Collection as DBCollection;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Support\Facades\DB;

class PendataanBUJKService
{
    public function getDaftarBUJK(): EloquentCollection
    {
        return Usaha::join('master_jenis_usaha as jenis_usaha', 'jenis_usaha.id', 'usaha.jenis_usaha_id')
            ->where('jenis_usaha', 'Badan Usaha Jasa Konstruksi')
            ->select('usaha.id', 'usaha.nama', 'usaha.nib', 'usaha.pjbu')
            ->orderBy('usaha.nama')
            ->get();
    }

    public function addSertifikatStandarBUJK(array $data): int
    {
        $sertifikatId = DB::table('sertifikat_standar_bujk')->insertGetId([
            'nomor_sertifikat' => $data['nomor_sertifikat'],
            'sertifikat_id'    => $data['sertifikat_id'],
            'jenis_usaha'      => $data['jenis_usaha'],
            'status'           => true,
            'usaha_id'         => $data['usaha_id'],
            'created_by'       => $data['created_by'],
            'created_at'       => now(),
            'updated_at'       => now(),
        ]);

        return $sertifikatId;
    }

    public function checkSertifikatStandarBUJKExists(string $id): bool
    {
        return DB::table('sertifikat_standar_bujk')->where('id', $id)->exists();
    }

    public function getDaftarSertifikatStandarBUJK(string $usahaId): DBCollection
    {
        return DB::table('sertifikat_standar_bujk as sbu')->leftJoin('files', 'files.id', 'sbu.sertifikat_id')
            ->leftJoin('rincian_sertifikat_standar_bujk as rincian', 'rincian.sertifikat_standar_id', 'sbu.id')
            ->where('sbu.usaha_id', $usahaId)
            ->select(
                'sbu.id', 'sbu.nomor_sertifikat', 'sbu.status', 'sbu.jenis_usaha', 'rincian.subklasifikasi',
                'sbu.sertifikat_id', 'files.path', 'files.name',
            )
            ->orderBy('sbu.created_at', 'desc')
            ->get();
    }

    public function getDaftarSertifikatStandarBUJKAktif(string $usahaId): DBCollection
    {
        return DB::table('sertifikat_standar_bujk as sbu')->leftJoin('files', 'files.id', 'sbu.sertifikat_id')
            ->leftJoin('rincian_sertifikat_standar_bujk as rincian', 'rincian.sertifikat_standar_id', 'sbu.id')
            ->where('sbu.usaha_id', $usahaId)
            ->where('sbu.status', 1)
            ->select(
                'sbu.id', 'sbu.nomor_sertifikat', 'sbu.status', 'sbu.jenis_usaha', 'rincian.subklasifikasi',
                'sbu.sertifikat_id', 'files.path', 'files.name',
            )
            ->orderBy('sbu.created_at', 'desc')
            ->get();
    }

    public function getSertifikatStandarBUJKById(string $id)
    {
        return DB::table('sertifikat_standar_bujk')->where('id', $id)->first();
    }

    public function updateSertifikatStandarBUJK(string $id, array $data)
    {
        DB::table('sertifikat_standar_bujk')->where('id', $id)
            ->update([
                'nomor_sertifikat' => $data['nomor_sertifikat'],
                'jenis_usaha'      => $data['jenis_usaha'],
                'updated_at'       => now(),
            ]);
    }

    public function updateFileSertifikatIdSertifikatStandarBUJK(string $id, $sertifikatId)
    {
        return DB::table('sertifikat_standar_bujk')->where('id', $id)
            ->update(['sertifikat_id' => $sertifikatId, 'updated_at' => now()]);
    }

    public function deleteSertifikatStandarBUJK(string $id)
    {
        return DB::table('sertifikat_standar_bujk')->where('id', $id)->delete();
    }

    public function addRincianSertifikatStandarBUJK(array $data): int
    {
        $rincianId = DB::table('rincian_sertifikat_standar_bujk')->insertGetId([
            'sertifikat_standar_id' => $data['sertifikat_standar_id'],
            'subklasifikasi'        => $data['subklasifikasi'],
            'created_by'            => $data['created_by'],
            'created_at'            => now(),
            'updated_at'            => now(),
        ]);

        return $rincianId;
    }

    public function updateRincianSertifikatStandarBUJK(string $sertifikatId, array $data)
    {
        return DB::table('rincian_sertifikat_standar_bujk')
            ->updateOrInsert(
                ['sertifikat_standar_id' => $sertifikatId],
                [
                    'subklasifikasi' => $data['subklasifikasi'],
                    'created_by'     => $data['created_by'],
                    'updated_at'     => now(),
                ],
            );
    }

    public function deleteRincianSertifikatStandarBUJK(string $sertifikatId)
    {
        return DB::table('rincian_sertifikat_standar_bujk')->where('sertifikat_standar_id', $sertifikatId)->delete();
    }

    public function addLaporanBUJK(array $data): int
    {
        $laporanId = DB::table('laporan_bujk')->insertGetId([
            'tahun'      => $data['tahun'],
            'label'      => $data['label'],
            'url'        => $data['url'],
            'usaha_id'   => $data['usaha_id'],
            'created_by' => $data['created_by'],
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return $laporanId;
    }

    public function getDaftarLaporanBUJKByTahun(string $usahaId, int $tahun): DBCollection
    {
        return DB::table('laporan_bujk as laporan')->where('laporan.usaha_id', $usahaId)
            ->where('laporan.tahun', $tahun)
            ->select('id', 'tahun', 'label', 'url')
            ->get();
    }

    public function getDaftarLaporanBUJK(string $usahaId): DBCollection
    {
        return DB::table('laporan_bujk as laporan')->where('laporan.usaha_id', $usahaId)
            ->select('id', 'tahun', 'label', 'url')
            ->orderBy('laporan.tahun', 'desc')->get();
    }

    public function updateLaporanBUJK(array $data): int
    {
        return DB::table('laporan_bujk as laporan')->where('id', $data['id'])
            ->update([
                'tahun'      => $data['tahun'],
                'label'      => $data['label'],
                'url'        => $data['url'],
                'updated_at' => now(),
            ]);
    }

    public function addPaketPekerjaan(array $data): int
    {
        $paketPekerjaan = PaketPekerjaan::create([
            'nama_paket'           => $data['nama_paket'],
            'tahun_anggaran'       => $data['tahun_anggaran'],
            'jenis_usaha'          => $data['jenis_usaha'],
            'sifat_usaha'          => $data['sifat_usaha'],
            'subklasifikasi_usaha' => $data['subklasifikasi_usaha'],
            'layanan_usaha'        => $data['layanan_usaha'],
            'bentuk_usaha'         => $data['bentuk_usaha'],
            'kualifikasi_usaha'    => $data['kualifikasi_usaha'],
            'usaha_id'             => $data['usaha_id'],
            'created_by'           => $data['created_by'],
        ]);

        return $paketPekerjaan->id;
    }

    public function getDaftarPaketPekerjaanByUsahaId(string $usahaId): EloquentCollection
    {
        return PaketPekerjaan::where('usaha_id', $usahaId)
            ->select(
                'id',
                'nama_paket as namaPaket',
                'tahun_anggaran as tahunAnggaran',
                'jenis_usaha as jenisUsaha',
                'sifat_usaha as sifatUsaha',
                'subklasifikasi_usaha as subklasifikasiUsaha',
                'layanan_usaha as layananUsaha',
                'bentuk_usaha as bentukUsaha',
                'kualifikasi_usaha as kualifikasiUsaha',
            )
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function updatePaketPekerjaan(array $data): int
    {
        $paketPekerjaan = PaketPekerjaan::find($data['id']);

        $paketPekerjaan->nama_paket = $data['nama_paket'];
        $paketPekerjaan->tahun_anggaran = $data['tahun_anggaran'];
        $paketPekerjaan->jenis_usaha = $data['jenis_usaha'];
        $paketPekerjaan->sifat_usaha = $data['sifat_usaha'];
        $paketPekerjaan->subklasifikasi_usaha = $data['subklasifikasi_usaha'];
        $paketPekerjaan->layanan_usaha = $data['layanan_usaha'];
        $paketPekerjaan->bentuk_usaha = $data['bentuk_usaha'];
        $paketPekerjaan->kualifikasi_usaha = $data['kualifikasi_usaha'];

        $paketPekerjaan->save();

        return $paketPekerjaan->id;
    }
}
