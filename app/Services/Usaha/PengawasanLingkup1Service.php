<?php

namespace App\Services\Usaha;

use App\Models\Usaha\PengawasanUsahaRantaiPasok;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

class PengawasanLingkup1Service
{
    public function addPengawasan(array $data): string
    {
        $pengawasan = PengawasanUsahaRantaiPasok::create($data);
        return $pengawasan->id;
    }

    public function checkPengawasanExists(string $id)
    {
        return PengawasanUsahaRantaiPasok::where('id', $id)->exists();
    }

    public function getDaftarPengawasanBySlug(string $slug)
    {
        return PengawasanUsahaRantaiPasok::withWhereHas('usaha', function ($query) use ($slug) {
            $query->join('usaha_rantai_pasok', 'usaha.id', 'usaha_rantai_pasok.usaha_id')
                ->join('master_jenis_usaha_rantai_pasok as rantai_pasok', 'usaha_rantai_pasok.rantai_pasok_id', 'rantai_pasok.id')
                ->where('rantai_pasok.slug', $slug)
                ->select(
                    'usaha.id', 'usaha.nama', 'usaha.nib', 'usaha.pjbu',
                );
        })->orderBy('tanggal_pengawasan', 'desc')
          ->get();
    }

    public function getPengawasanById(string $id)
    {
        return PengawasanUsahaRantaiPasok::with([
            'usaha' => function (Builder $query)
            {
                $query->leftJoin('files', 'files.id', 'usaha.dokumen_nib')
                      ->select(
                        'usaha.id', 'usaha.nama', 'usaha.nib', 'usaha.pjbu', 'usaha.alamat',
                        'usaha.dokumen_nib', 'files.path', 'files.name',
                      );
            }
        ])->where('id', $id)->firstOrFail();
    }

    public function verifyPengawasan(string $id, array $data)
    {
        $pengawasan = PengawasanUsahaRantaiPasok::find($id);

        $pengawasan->tertib_perizinan_berusaha = $data['tertib_perizinan_berusaha'];
        $pengawasan->tertib_perizinan_penggunaan = $data['tertib_perizinan_penggunaan'];
        $pengawasan->tertib_pencatatan_simpk = $data['tertib_pencatatan_simpk'];
        $pengawasan->tertib_pengawasan = $data['tertib_pengawasan'];
        $pengawasan->catatan = $data['catatan'];

        $pengawasan->verified_by = $data['verified_by'];
        $pengawasan->verified_at = now();

        $pengawasan->save();
    }

    public function deletePengawasan(string $id)
    {
        $pengawasan = PengawasanUsahaRantaiPasok::find($id);
        $pengawasan->delete();
    }

    public function addRekomendasiPengawasan(string $pengawasanId, array $data)
    {
        DB::table('rekomendasi_pengawasan_usaha_rantai_pasok')->updateOrInsert(
            [
                'pengawasan_id' => $pengawasanId,
            ],
            [
                'rekomendasi' => $data['rekomendasi'],
                'keterangan'  => $data['keterangan'],
                'created_by'  => $data['created_by'],
                'created_at'  => now(),
                'updated_at'  => now(),
            ]
        );
    }

    public function getRekomendasiPengawasanByPengawasanId(string $pengawasanId)
    {
        return DB::table('rekomendasi_pengawasan_usaha_rantai_pasok')->where('pengawasan_id', $pengawasanId)
            ->first();
    }

    public function addPemeriksaanMaterialKonstruksi(array $data)
    {
        DB::table('pemeriksaan_material_konstruksi_usaha_rantai_pasok')->insert([
            'pengawasan_id'           => $data['pengawasan_id'],
            'varian'                  => $data['varian'],
            'subvarian'               => $data['subvarian'],
            'merk_produk'             => $data['merk_produk'],
            'sertifikat_tkdn'         => $data['sertifikat_tkdn'],
            'sertifikat_standar'      => $data['sertifikat_standar'],
            'simpk'                   => $data['simpk'],
            'nomor_registrasi_simpk'  => $data['nomor_registrasi_simpk'],
            'created_by'              => $data['created_by'],
        ]);
    }

    public function checkPemeriksaanMaterialKonstruksiExists(string $id)
    {
        return DB::table('pemeriksaan_material_konstruksi_usaha_rantai_pasok')->where('id', $id)->exists();
    }

    public function getPemeriksaanMaterialKonstruksiByPengawasanId(string $pengawasanId)
    {
        return DB::table('pemeriksaan_material_konstruksi_usaha_rantai_pasok')
            ->where('pengawasan_id', $pengawasanId)
            ->whereNull('deleted_at')
            ->select(
                'id',
                'varian',
                'subvarian',
                'merk_produk as merkProduk',
                'sertifikat_tkdn as sertifikatTKDN',
                'sertifikat_standar as sertifikatStandar',
                'simpk',
                'nomor_registrasi_simpk as nomorRegistrasi',
            )->get();
    }

    public function deletePemeriksaanMaterialKonstruksi(string $id)
    {
        DB::table('pemeriksaan_material_konstruksi_usaha_rantai_pasok')->where('id', $id)
            ->update(['deleted_at' => now()]);
    }
}
