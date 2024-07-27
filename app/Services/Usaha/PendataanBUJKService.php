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
            'sertifikat_id' => $data['sertifikat_id'],
            'status'        => true,
            'usaha_id'      => $data['usaha_id'],
            'created_by'    => $data['created_by'],
            'created_at'    => now(),
            'updated_at'    => now(),
        ]);

        return $sertifikatId;
    }

    public function getDaftarSertifikatStandarBUJK(string $usahaId): DBCollection
    {
        return DB::table('sertifikat_standar_bujk as sbu')->join('files', 'files.id', 'sbu.id')
            ->where('sbu.usaha_id', $usahaId)
            ->select('sbu.id', 'sbu.sertifikat_id', 'sbu.status', 'files.path', 'files.name')
            ->orderBy('sbu.created_at', 'desc')
            ->get();
    }

    public function getDaftarSertifikatStandarBUJKAktif(string $usahaId): DBCollection
    {
        return DB::table('sertifikat_standar_bujk as sbu')->join('files', 'files.id', 'sbu.id')
            ->where('sbu.usaha_id', $usahaId)
            ->where('sbu.status', 1)
            ->select('sbu.id', 'sbu.sertifikat_id', 'sbu.status', 'files.path', 'files.name')
            ->orderBy('sbu.created_at', 'desc')
            ->get();
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
