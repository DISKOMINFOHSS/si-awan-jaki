<?php

namespace App\Services\Usaha;

use App\Models\Usaha\JenisUsaha;
use App\Models\Usaha\Usaha;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Support\Collection as DBCollection;
use Illuminate\Support\Facades\DB;

class PendataanUsahaService
{
    // Jenis Usaha
    public function getDaftarJenisUsaha(): EloquentCollection
    {
        return JenisUsaha::select('id', 'jenis_usaha as jenisUsaha', 'slug')
            ->withCount('usaha as jumlahUsaha')
            ->get();
    }

    public function getJenisUsahaWithDaftarUsahaBySlug(string $slug): JenisUsaha
    {
        return JenisUsaha::with(['usaha'])->where('slug', $slug)
            ->first();
    }

    public function getJenisUsahaById(string $id): JenisUsaha
    {
        return JenisUsaha::find($id);
    }

    // Jenis Usaha Rantai Pasok
    public function getDaftarJenisRantaiPasok(): DBCollection
    {
        return DB::table('master_jenis_usaha_rantai_pasok')->select('id', 'kategori_sumber_daya as kategoriSumberDaya', 'pelaku_usaha as pelakuUsaha', 'slug')
            ->get();
    }

    // Usaha
    public function addUsaha(array $data): string
    {
        $usaha = Usaha::create([
            'nama'           => $data['nama'],
            'nib'            => $data['nib'],
            'dokumen_nib'    => $data['dokumen_nib'],
            'pjbu'           => $data['pjbu'],
            'alamat'         => $data['alamat'],
            'status'         => true,
            'jenis_usaha_id' => $data['jenis_usaha_id'],
            'created_by'     => $data['created_by'],
        ]);

        return $usaha->id;
    }

    // Usaha Rantai Pasok
    public function addUsahaRantaiPasok(string $usahaId, int $rantaiPasokId)
    {
        DB::table('usaha_rantai_pasok')->insert([
            'usaha_id'        => $usahaId,
            'rantai_pasok_id' => $rantaiPasokId,
        ]);
    }
}
