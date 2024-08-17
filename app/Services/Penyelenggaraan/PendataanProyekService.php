<?php

namespace App\Services\Penyelenggaraan;

use App\Models\Penyelenggaraan\ProyekKonstruksi;
use App\Models\Penyelenggaraan\PenggunaJasa;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;

class PendataanProyekService
{
    public function addProyekKonstruksi(array $data): string
    {
        $proyek = ProyekKonstruksi::create([
            'nama_paket'          => $data['nama_paket'],
            'nomor_kontrak'       => $data['nomor_kontrak'],
            'sumber_dana'         => $data['sumber_dana'],
            'tahun_anggaran'      => $data['tahun_anggaran'],
            'nilai_pagu'          => $data['nilai_pagu'],
            'nilai_kontrak'       => $data['nilai_kontrak'],
            'tanggal_kontrak'     => $data['tanggal_kontrak'],
            'mulai_pelaksanaan'   => $data['mulai_pelaksanaan'],
            'selesai_pelaksanaan' => $data['selesai_pelaksanaan'],
            'created_by'          => $data['created_by'],
        ]);

        return $proyek->id;
    }

    public function checkProyekKonstruksiExists(string $id): bool
    {
        return ProyekKonstruksi::where('id', $id)->exists();
    }

    public function getDaftarProyekKonstruksi(): EloquentCollection
    {
        return ProyekKonstruksi::with([
            'penyediaJasa' => function (Builder $query)
            {
                $query->select('id', 'nama', 'nib', 'pjbu', 'alamat');
            }
        ])->orderBy('tahun_anggaran', 'asc')
          ->orderBy('nama_paket')
          ->get();
    }

    public function getDaftarProyekKonstruksiBySumberDana(string $sumberDana): EloquentCollection
    {
        return ProyekKonstruksi::with([
            'penyediaJasa' => function (Builder $query) { $query->select('id', 'nama'); },
            'penggunaJasa' => function (Builder $query) { $query->select('id', 'nama', 'instansi'); },
        ])->select(
                'id',
                'nama_paket as namaPaket',
                'tahun_anggaran as tahunAnggaran',
                'nomor_kontrak as nomorKontrak',
                'nilai_kontrak as nilaiKontrak',
                'mulai_pelaksanaan as tanggalMulaiPelaksanaan',
                'selesai_pelaksanaan as tanggalSelesaiPelaksanaan',
                'penyedia_jasa_id',
                'pengguna_jasa_id',
            )
          ->orderBy('nama_paket')
          ->get();
    }

    public function getProyekKonstruksiById(string $id): ProyekKonstruksi
    {
        return ProyekKonstruksi::with([
            'penyediaJasa' => function (Builder $query)
            {
                $query->leftJoin('files', 'files.id', 'usaha.dokumen_nib')
                      ->select(
                        'usaha.id',
                        'usaha.nama',
                        'usaha.nib',
                        'usaha.pjbu',
                        'usaha.alamat',
                        'files.id as fileId',
                        'files.path as filePath',
                        'files.name as fileName',
                    )->orderBy('usaha.nama');
            },
            'penggunaJasa'
        ])->where('id', $id)->first();
    }

    public function updateProyekKonstruksi(string $id, array $data): string
    {
        $proyekKonstruksi = ProyekKonstruksi::find($id);

        $proyekKonstruksi->nama_paket = $data['nama_paket'];
        $proyekKonstruksi->nomor_kontrak = $data['nomor_kontrak'];
        $proyekKonstruksi->sumber_dana = $data['sumber_dana'];
        $proyekKonstruksi->tahun_anggaran = $data['tahun_anggaran'];
        $proyekKonstruksi->nilai_pagu = $data['nilai_pagu'];
        $proyekKonstruksi->nilai_kontrak = $data['nilai_kontrak'];
        $proyekKonstruksi->tanggal_kontrak = $data['tanggal_kontrak'];
        $proyekKonstruksi->mulai_pelaksanaan = $data['mulai_pelaksanaan'];
        $proyekKonstruksi->selesai_pelaksanaan = $data['selesai_pelaksanaan'];

        $proyekKonstruksi->save();

        return $proyekKonstruksi->id;
    }

    // Penyedia Jasa
    public function addPenyediaJasaToProyekKonstruksi(string $id, string $penyediaJasaId): ProyekKonstruksi
    {
        $proyekKonstruksi = ProyekKonstruksi::find($id);
        $proyekKonstruksi->penyedia_jasa_id = $penyediaJasaId;

        $proyekKonstruksi->save();

        return $proyekKonstruksi;
    }

    public function getPenyediaJasaIdById(string $id)
    {
        return ProyekKonstruksi::find($id)->penyedia_jasa_id;
    }

    // Pengguna Jasa
    public function addPenggunaJasa(array $data): string
    {
        $penggunaJasa = PenggunaJasa::create([
            'nama'             => $data['nama'],
            'pelaku_pengadaan' => $data['pelaku_pengadaan'],
            'nip'              => $data['nip'],
            'jabatan'          => $data['jabatan'],
            'sk'               => $data['sk'],
            'instansi'         => $data['instansi'],
            'alamat'           => $data['alamat'],
            'created_by'       => $data['created_by'],
        ]);

        return $penggunaJasa->id;
    }

    public function updatePenggunaJasa(string $id, array $data): string
    {
        $penggunaJasa = PenggunaJasa::find($id);

        $penggunaJasa->nama = $data['nama'];
        $penggunaJasa->pelaku_pengadaan = $data['pelaku_pengadaan'];
        $penggunaJasa->nip = $data['nip'];
        $penggunaJasa->jabatan = $data['jabatan'];
        $penggunaJasa->sk = $data['sk'];
        $penggunaJasa->instansi = $data['instansi'];
        $penggunaJasa->alamat = $data['alamat'];

        $penggunaJasa->save();

        return $penggunaJasa->id;
    }

    public function addPenggunaJasaToProyekKonstruksi(string $id, string $penggunaJasaId): string
    {
        $proyek = ProyekKonstruksi::find($id);
        $proyek->pengguna_jasa_id = $penggunaJasaId;

        $proyek->save();

        return $proyek->id;
    }
}
