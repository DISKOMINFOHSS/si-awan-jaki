<?php

namespace App\Services\Usaha;

use App\Models\Usaha\PengawasanBUJKLingkup5;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Support\Collection as DBCollection;
use Illuminate\Support\Facades\DB;

class PengawasanLingkup5Service
{
    public function getDaftarPemeriksaan(): DBCollection
    {
        return DB::table('master_pemeriksaan_pengembangan_usaha as pemeriksaan')
            ->select(
                'pemeriksaan.id',
                'pemeriksaan.nama_pemeriksaan as namaPemeriksaan',
                'pemeriksaan.indikator',
                'pemeriksaan.subindikator',
                'pemeriksaan.cara_pemeriksaan as caraPemeriksaan',
                'pemeriksaan.dokumen'
            )
            ->orderBy('pemeriksaan.id')->get();
    }

    public function addPengawasanBUJK(array $data): string
    {
        $pengawasan = PengawasanBUJKLingkup5::create([
            'jenis_pengawasan'      => $data['jenis_pengawasan'],
            'tanggal_pengawasan'    => $data['tanggal_pengawasan'],
            'usaha_id'              => $data['usaha_id'],
            'created_by'            => $data['created_by'],
        ]);

        return $pengawasan->id;
    }

    public function getDaftarPengawasanBUJK(): EloquentCollection
    {
        return PengawasanBUJKLingkup5::with([
            'usaha' => function (Builder $query)
            {
                $query->select('id', 'nama', 'nib');
            }
        ])->orderBy('created_by', 'desc')
          ->get();
    }

    public function getPengawasanBUJKById(string $id): PengawasanBUJKLingkup5
    {
        return PengawasanBUJKLingkup5::with([
            'usaha' => function (Builder $query)
            {
                $query->select('id', 'nama', 'nib', 'pjbu', 'alamat');
            },
        ])->where('id', $id)->firstOrFail();
    }
}
