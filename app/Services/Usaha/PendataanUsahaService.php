<?php

namespace App\Services\Usaha;

use App\Models\Usaha\JenisUsaha;
use App\Models\Usaha\Usaha;
use Illuminate\Contracts\Database\Eloquent\Builder;
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
        return JenisUsaha::with(['usaha'  => function (Builder $query) {
            $query->leftJoin('usaha_rantai_pasok', 'usaha.id', 'usaha_rantai_pasok.usaha_id')
                  ->leftJoin('master_jenis_usaha_rantai_pasok as rantai_pasok', 'usaha_rantai_pasok.rantai_pasok_id', 'rantai_pasok.id')
                  ->select('usaha.*', 'kategori_sumber_daya as kategoriSumberDaya', 'pelaku_usaha as pelakuUsaha')
                  ->orderBy('usaha.nama');
        }])->where('slug', $slug)
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

    public function checkUsahaExists(string $id): bool
    {
        return Usaha::where('id', $id)->exists();
    }

    public function getUsahaById(string $id): Usaha
    {
        return Usaha::with(['jenisUsaha' => function (Builder $query) use ($id) {
            $query->join('usaha', 'usaha.jenis_usaha_id', 'master_jenis_usaha.id')
                  ->leftJoin('usaha_rantai_pasok', 'usaha.id', 'usaha_rantai_pasok.usaha_id')
                  ->leftJoin('master_jenis_usaha_rantai_pasok as rantai_pasok', 'usaha_rantai_pasok.rantai_pasok_id', 'rantai_pasok.id')
                  ->select(
                        'master_jenis_usaha.id',
                        'master_jenis_usaha.jenis_usaha as jenisUsaha',
                        'master_jenis_usaha.slug',
                        'kategori_sumber_daya as kategoriSumberDaya',
                        'pelaku_usaha as pelakuUsaha'
                    )
                  ->where('usaha.id', $id);
        }])->leftJoin('files', 'files.id', 'usaha.dokumen_nib')
           ->select('usaha.*', 'files.path', 'files.name')
           ->find($id);
    }

    public function addDokumenNIB(string $id, int $dokumenNIB)
    {
        $usaha = Usaha::find($id);

        $usaha->dokumen_nib = $dokumenNIB;
        $usaha->save();

        return $usaha->id;
    }

    public function deleteDokumenNIB(string $usahaId): int
    {
        $usaha = Usaha::find($usahaId);

        $dokumenNIB = $usaha->dokumen_nib;
        $usaha->dokumen_nib = null;
        $usaha->save();

        return $dokumenNIB;
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
