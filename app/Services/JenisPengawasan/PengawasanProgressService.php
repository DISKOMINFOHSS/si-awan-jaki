<?php

namespace App\Services\JenisPengawasan;

use App\Models\Penyelenggaraan\PengawasanProgress;
use App\Models\Penyelenggaraan\RealisasiFisikPengawasanProgress;
use App\Models\Penyelenggaraan\RealisasiKeuanganPengawasanProgress;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

class PengawasanProgressService
{
    public function addPengawasan(array $data): string
    {
        $pengawasan = PengawasanProgress::create([
            'proyek_konstruksi_id' => $data['proyek_konstruksi_id'],
            'tahun_pengawasan'     => $data['tahun_pengawasan'],
            'created_by'           => $data['created_by'],
        ]);

        return $pengawasan->id;
    }

    public function checkPengawasanExists(string $id): bool
    {
        return PengawasanProgress::where('id', $id)->exists();
    }

    public function getDaftarPengawasanByTahun(string $tahun)
    {
        return PengawasanProgress::with([
            'proyekKonstruksi',
            'proyekKonstruksi.penyediaJasa',
            'proyekKonstruksi.konsultanPengawas',
            'realisasiFisik' => function (Builder $query)
            {
                $query->whereNotNull('realisasi')->orderBy('tanggal', 'desc');
            }
        ])->where('tahun_pengawasan', $tahun)
          ->get();
    }

    public function getPengawasanById(string $id, string $tahun)
    {
        return PengawasanProgress::with([
            'proyekKonstruksi',
            'proyekKonstruksi.penyediaJasa',
            'proyekKonstruksi.penggunaJasa',
            'proyekKonstruksi.konsultanPengawas',
            'realisasiFisik' => function (Builder $query)
            {
                $query->orderBy('tanggal', 'desc');
            },
            'realisasiKeuangan' => function (Builder $query)
            {
                $query->select(
                    'id',
                    'pengawasan_id',
                    'tanggal',
                    'jumlah_pembayaran as jumlahPembayaran',
                    'tanggal_dibayar as tanggalDibayar',
                    'realisasi',
                    'url',
                    'catatan',
                    'verified_by',
                )->orderBy('tanggal', 'desc');
            }
        ])->where('tahun_pengawasan', $tahun)
          ->where('id', $id)
          ->firstOrFail();
    }

    public function getPengawasanCount(string $tahun)
    {
        return DB::table('pengawasan_progress_proyek_konstruksi')
            ->selectRaw('count(id) as total_pengawasan, status')
            ->groupBy('status')
            ->where('tahun_pengawasan', $tahun)
            ->get();
    }

    public function getTotalPengawasanCount(string $tahun)
    {
        return PengawasanProgress::where('tahun_pengawasan', $tahun)->count();
    }

    public function updatePengawasanStatus(string $id, string $status)
    {
        $pengawasan = PengawasanProgress::find($id);
        $pengawasan->status = $status;
        $pengawasan->save();
    }

    // Realisasi Fisik
    public function addTargetRealisasiFisik(string $pengawasanId, array $data)
    {
        RealisasiFisikPengawasanProgress::create([
            'pengawasan_id' => $pengawasanId,
            'tanggal'       => $data['tanggal'],
            'target'        => $data['target'],
            'created_by'    => $data['created_by'],
        ]);
    }

    public function addRealisasiFisik(string $id, string $pengawasanId, array $data)
    {
        $fotoLapangan = [];

        foreach ($data['foto_lapangan'] as $foto)
        {
            array_push($fotoLapangan, [
                'name' => $foto->getClientOriginalName(),
                'path' => $foto->storeAs('public/files/foto-lapangan', $foto->hashName()),
            ]);
        }

        $realisasi = RealisasiFisikPengawasanProgress::where('id', $id)
            ->where('pengawasan_id', $pengawasanId)->first();

        $realisasi->realisasi = $data['realisasi'];
        $realisasi->foto_lapangan = $fotoLapangan;

        $realisasi->save();

        return $realisasi;
    }

    public function getDaftarRealisasiFisik(string $pengawasanId)
    {
        return RealisasiFisikPengawasanProgress::where('pengawasan_id', $pengawasanId)
            ->orderBy('tanggal', 'desc')->get();
    }

    // Realisasi Keuangan
    public function addTargetRealisasiKeuangan(string $pengawasanId, array $data)
    {
        RealisasiKeuanganPengawasanProgress::create([
            'pengawasan_id'     => $pengawasanId,
            'tanggal'           => $data['tanggal'],
            'jumlah_pembayaran' => $data['jumlah_pembayaran'],
            'created_by'        => $data['created_by'],
        ]);
    }

    public function addRealisasiKeuangan(string $id, string $pengawasanId, array $data)
    {
        $realisasi = RealisasiKeuanganPengawasanProgress::where('id', $id)
            ->where('pengawasan_id', $pengawasanId)->first();

        $realisasi->tanggal_dibayar = $data['tanggal_dibayar'];
        $realisasi->realisasi = $data['realisasi'];
        $realisasi->url = $data['url'];
        $realisasi->save();

        return $realisasi;
    }

    // public function getDaftarRealisasiKeuangan(string $pengawasanId)
    // {
    //     return RealisasiKeuanganPengawasanProgress::where('pengawasan_id', $pengawasanId)
    //         ->orderBy('tanggal', 'desc')->get();
    // }

    public function getJumlahRealisasiKeuanganByPengawasanId(string $pengawasanId)
    {
        return DB::table('realisasi_keuangan_pengawasan_progress')->where('pengawasan_id', $pengawasanId)
            ->sum('realisasi');
    }
}
