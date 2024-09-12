<?php

namespace App\Services\PemanfaatanProduk;

use App\Models\PemanfaatanProduk\Bangunan;
use App\Models\PemanfaatanProduk\PemilikPengelolaBangunan;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Support\Collection as DBCollection;
use Illuminate\Support\Facades\DB;

class PendataanBangunanService
{
    public function addBangunan(array $data): string
    {
        $bangunan = Bangunan::create([
            'nama'                      => $data['nama'],
            'nomor_kontrak_pembangunan' => $data['nomor_kontrak_pembangunan'],
            'sumber_dana'               => $data['sumber_dana'],
            'mulai_pembangunan'         => $data['mulai_pembangunan'],
            'selesai_pembangunan'       => $data['selesai_pembangunan'],
            'tanggal_pemanfaatan'       => $data['tanggal_pemanfaatan'],
            'umur_konstruksi'           => $data['umur_konstruksi'],
            'pemilik_bangunan'          => $data['pemilik_bangunan'],
            'sk_pemilik'                => $data['sk_pemilik'],
            'pengelola_bangunan'        => $data['pengelola_bangunan'],
            'sk_pengelola'              => $data['sk_pengelola'],
            'lokasi'                    => $data['lokasi'],
            'desa_kelurahan'            => $data['desa_kelurahan'],
            'kecamatan'                 => $data['kecamatan'],
            'created_by'                => $data['created_by'],
        ]);

        return $bangunan->id;
    }

    public function checkBangunanExists(string $id): bool
    {
        return Bangunan::where('id', $id)->exists();
    }

    public function getDaftarBangunan(): EloquentCollection
    {
        return Bangunan::with([
            'pemilikBangunan',
            'pengelolaBangunan',
        ])
        ->select(
            'id',
            'nama',
            'nomor_kontrak_pembangunan',
            'sumber_dana',
            'mulai_pembangunan',
            'selesai_pembangunan',
            'tanggal_pemanfaatan',
            'umur_konstruksi',
            'pemilik_bangunan',
            'pengelola_bangunan',
            'lokasi',
            'desa_kelurahan',
            'kecamatan'
        )
        ->orderBy('nama')
        ->get();
    }

    public function getBangunan(string $id): Bangunan
    {
        return Bangunan::findOrFail($id);
    }

    public function updateBangunan(array $data): string
    {
        $bangunan = Bangunan::find($data['id']);

        $bangunan->nama = $data['nama'];
        $bangunan->nomor_kontrak_pembangunan = $data['nomor_kontrak_pembangunan'];
        $bangunan->sumber_dana = $data['sumber_dana'];
        $bangunan->mulai_pembangunan = $data['mulai_pembangunan'];
        $bangunan->selesai_pembangunan = $data['selesai_pembangunan'];
        $bangunan->tanggal_pemanfaatan = $data['tanggal_pemanfaatan'];
        $bangunan->umur_konstruksi = $data['umur_konstruksi'];
        $bangunan->lokasi = $data['lokasi'];
        $bangunan->desa_kelurahan = $data['desa_kelurahan'];
        $bangunan->kecamatan = $data['kecamatan'];

        $bangunan->save();

        return $bangunan->id;
    }

    public function updateSKPemilikBangunan(string $bangunanId, string $skPemilik): string
    {
        $bangunan = Bangunan::find($bangunanId);

        $bangunan->sk_pemilik = $skPemilik;
        $bangunan->save();

        return $bangunan->id;
    }

    public function updateSKPengelolaBangunan(string $bangunanId, string $skPengelola): string
    {
        $bangunan = Bangunan::find($bangunanId);

        $bangunan->sk_pengelola = $skPengelola;
        $bangunan->save();

        return $bangunan->id;
    }

    public function updatePemilikBangunan(string $bangunanId, string $pemilikId): string
    {
        $bangunan = Bangunan::find($bangunanId);

        $bangunan->pemilik_bangunan = $pemilikId;
        $bangunan->save();

        return $bangunan->id;
    }

    public function updatePengelolaBangunan(string $bangunanId, string $pengelolaId): string
    {
        $bangunan = Bangunan::find($bangunanId);

        $bangunan->pengelola_bangunan = $pengelolaId;
        $bangunan->save();

        return $bangunan->id;
    }

    public function addPemilikPengelolaBangunan(array $data): int
    {
        $pemilikPengelola = PemilikPengelolaBangunan::firstOrCreate(
            [
                'nama'       => $data['nama'],
                'nip'        => $data['nip'],
            ],
            [
                'jabatan'    => $data['jabatan'],
                'instansi'   => $data['instansi'],
                'alamat'     => $data['alamat'],
                'created_by' => $data['created_by'],
            ]
        );

        return $pemilikPengelola->id;
    }

    public function getPemilikIdByBangunanId(string $bangunanId): string
    {
        return DB::table('bangunan')->join('pemilik_pengelola_bangunan as pemilik', 'pemilik.id', 'bangunan.pemilik_bangunan')
            ->where('bangunan.id', $bangunanId)
            ->select('pemilik.id as pemilikId')
            ->first()->pemilikId;
    }

    public function getPengelolaIdByBangunanId(string $bangunanId): string
    {
        return DB::table('bangunan')->join('pemilik_pengelola_bangunan as pengelola', 'pengelola.id', 'bangunan.pengelola_bangunan')
            ->where('bangunan.id', $bangunanId)
            ->select('pengelola.id as pengelolaId')
            ->first()->pengelolaId;
    }

    public function updatePemilikPengelolaBangunan(array $data): int
    {
        $pemilikPengelola = PemilikPengelolaBangunan::firstOrNew([
            'id'    => $data['id'],
            'nama'  => $data['nama'],
        ]);

        $pemilikPengelola->nip = $data['nip'];
        $pemilikPengelola->jabatan = $data['jabatan'];
        $pemilikPengelola->instansi = $data['instansi'];
        $pemilikPengelola->alamat = $data['alamat'];
        $pemilikPengelola->created_by = $data['created_by'];

        $pemilikPengelola->save();

        return $pemilikPengelola->id;
    }

    public function addBuktiDukung(string $bangunanId, array $data)
    {
        DB::table('bukti_dukung_pengawasan_bangunan')->insertGetId([
            'tahun'       => $data['tahun'],
            'label'       => $data['label'],
            'url'         => $data['url'],
            'bangunan_id' => $bangunanId,
            'created_by'  => $data['created_by'],
            'created_at'  => now(),
            'updated_at'  => now(),
        ]);
    }

    public function checkBuktiDukungExists(string $id): bool
    {
        return DB::table('bukti_dukung_pengawasan_bangunan')->where('id', $id)->exists();
    }

    public function getDaftarBuktiDukungByBangunanId(string $bangunanId): DBCollection
    {
        return DB::table('bukti_dukung_pengawasan_bangunan as bukti_dukung')
            ->where('bukti_dukung.bangunan_id', $bangunanId)
            ->select('id', 'tahun', 'label', 'url')
            ->orderBy('bukti_dukung.tahun', 'desc')
            ->get();
    }

    public function updateBuktiDukung(string $id, array $data)
    {
        DB::table('bukti_dukung_pengawasan_bangunan')->where('id', $id)
            ->update([
                'tahun'      => $data['tahun'],
                'label'      => $data['label'],
                'url'        => $data['url'],
                'updated_at' => now(),
            ]);
    }

    public function deleteBuktiDukung(string $id, string $bangunanId)
    {
        DB::table('bukti_dukung_pengawasan_bangunan')->where('id', $id)
            ->where('bangunan_id', $bangunanId)
            ->delete();
    }
}
