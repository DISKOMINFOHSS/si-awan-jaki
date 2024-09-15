<?php

namespace App\Services\Penyelenggaraan;

use App\Models\Penyelenggaraan\PemeriksaanRutinPenyelenggaraanAPBD;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Support\Collection as DBCollection;
use Illuminate\Support\Facades\DB;

class PengawasanRutinPenyelenggaraanAPBDService
{
    public function getDaftarLingkupPengawasan(string $pengawasanId, string $proyekId)
    {
        return PemeriksaanRutinPenyelenggaraanAPBD::join(
            'master_lingkup_pengawasan_penyelenggaraan as lingkup_pengawasan',
            'lingkup_pengawasan.id',
            'master_pemeriksaan_pengawasan_rutin_penyelenggaraan_dana_apbd.lingkup_id'
        )->leftJoin('pemeriksaan_pengawasan_rutin_penyelenggaraan as hasil_pemeriksaan', function (JoinClause $join) use ($pengawasanId)
            {
                $join->on('master_pemeriksaan_pengawasan_rutin_penyelenggaraan_dana_apbd.lingkup_id', '=', 'hasil_pemeriksaan.lingkup_id')
                     ->where('hasil_pemeriksaan.pengawasan_id', $pengawasanId);
            }
        )->with(
            [
                'indikator',
                'suratPernyataan' => function (Builder $query) use ($proyekId)
                {
                    $query->leftJoin('surat_pernyataan_penyelenggaraan_konstruksi as surat_pernyataan', function (JoinClause $join) use ($proyekId)
                        {
                            $join->on('master_kategori_surat_pernyataan_pengawasan_penyelenggaraan.id', '=', 'surat_pernyataan.kategori_surat_pernyataan_id')
                                ->where('surat_pernyataan.proyek_konstruksi_id', $proyekId);
                        })
                    ->leftJoin('files', 'files.id', 'surat_pernyataan.surat_pernyataan_id')
                    ->select(
                        'surat_pernyataan.id',
                        'lingkup_id',
                        'kategori',
                        'surat_pernyataan.surat_pernyataan_id',
                        'files.id as fileId',
                        'files.path as filePath',
                        'files.name as fileName',
                    );
                }
            ]
        )->select(
            'lingkup_pengawasan.id',
            'master_pemeriksaan_pengawasan_rutin_penyelenggaraan_dana_apbd.*',
            'lingkup_pengawasan.lingkup_pengawasan as lingkupPengawasan',
            'hasil_pemeriksaan.kesimpulan_pemeriksaan',
            'hasil_pemeriksaan.catatan_pemeriksaan',
        )->get();
    }

    public function addPemeriksaanPengawasan(array $data)
    {
        DB::table('pemeriksaan_pengawasan_rutin_penyelenggaraan')->updateOrInsert(
            [
                'pengawasan_id' => $data['pengawasan_id'],
                'lingkup_id'    => $data['lingkup_id'],
            ],
            [
                'kesimpulan_pemeriksaan' => $data['kesimpulan_pemeriksaan'],
                'catatan_pemeriksaan'    => $data['catatan_pemeriksaan'],
                'created_by'             => $data['created_by'],
                'updated_at'             => now(),
            ]
        );
    }
}
