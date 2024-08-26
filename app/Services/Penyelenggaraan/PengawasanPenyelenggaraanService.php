<?php

namespace App\Services\Penyelenggaraan;

use App\Models\Penyelenggaraan\PengawasanPenyelenggaraan;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;

class PengawasanPenyelenggaraanService
{
    public function addPengawasan(array $data): string
    {
        $pengawasan = PengawasanPenyelenggaraan::create([
            'jenis_pengawasan'     => $data['jenis_pengawasan'],
            'tanggal_pengawasan'   => $data['tanggal_pengawasan'],
            'proyek_konstruksi_id' => $data['proyek_konstruksi_id'],
            'created_by'           => $data['created_by'],
        ]);

        return $pengawasan->id;
    }

    public function checkPengawasanExists(string $id): bool
    {
        return PengawasanPenyelenggaraan::where('id', $id)->exists();
    }

    public function getDaftarPengawasanBySumberDana(string $sumberDana): EloquentCollection
    {
        return PengawasanPenyelenggaraan::withWhereHas(
            'proyekKonstruksi', function ($query) use ($sumberDana)
            {
                $query->leftJoin('usaha', 'proyek_konstruksi.penyedia_jasa_id', 'usaha.id')
                      ->where('proyek_konstruksi.sumber_dana', $sumberDana)
                      ->select(
                        'proyek_konstruksi.id as id',
                        'proyek_konstruksi.nama_paket as namaPaket',
                        'proyek_konstruksi.nomor_kontrak as nomorKontrak',
                        'usaha.nama as penyediaJasa'
                    );
            }
        )->orderBy('created_at')
         ->get();
    }

    public function getPengawasanById(string $id): PengawasanPenyelenggaraan
    {
        return PengawasanPenyelenggaraan::with([
            'proyekKonstruksi' => function (Builder $query)
            {
                $query->leftJoin('usaha', 'proyek_konstruksi.penyedia_jasa_id', 'usaha.id')
                      ->leftJoin('pengguna_jasa_konstruksi as pengguna_jasa', 'proyek_konstruksi.pengguna_jasa_id', 'pengguna_jasa.id')
                      ->select(
                        'proyek_konstruksi.id as id',
                        'proyek_konstruksi.nama_paket as namaPaket',
                        'proyek_konstruksi.sumber_dana as sumberDana',
                        'proyek_konstruksi.nilai_kontrak as nilaiKontrak',
                        'proyek_konstruksi.nomor_kontrak as nomorKontrak',
                        'proyek_konstruksi.mulai_pelaksanaan as tanggalMulaiPelaksanaan',
                        'proyek_konstruksi.selesai_pelaksanaan as tanggalSelesaiPelaksanaan',
                        'usaha.nama as penyediaJasa',
                        'pengguna_jasa.nama as penggunaJasa',
                        'pengguna_jasa.instansi as penggunaJasaInstansi',
                    );
            }
        ])->where('id', $id)->firstOrFail();
    }

    public function verifyPengawasan(string $id, array $data): PengawasanPenyelenggaraan
    {
        $pengawasan = PengawasanPenyelenggaraan::find($id);

        $pengawasan->tertib_proses_pemilihan_penyedia_jasa = $data['tertib_proses_pemilihan_penyedia_jasa'];
        $pengawasan->tertib_penerapan_standar_kontrak = $data['tertib_penerapan_standar_kontrak'];
        $pengawasan->tertib_penggunaan_tkk = $data['tertib_penggunaan_tkk'];
        $pengawasan->tertib_pemberian_pekerjaan = $data['tertib_pemberian_pekerjaan'];
        $pengawasan->tertib_ketersediaan_dokumen_standar_k4 = $data['tertib_ketersediaan_dokumen_standar_k4'];
        $pengawasan->tertib_penerapan_smkk = $data['tertib_penerapan_smkk'];
        $pengawasan->tertib_antisipasi_kecelakaan = $data['tertib_antisipasi_kecelakaan'];
        $pengawasan->tertib_penerapan_manajemen_mutu = $data['tertib_penerapan_manajemen_mutu'];
        $pengawasan->tertib_pemenuhan_penyediaan_mptk = $data['tertib_pemenuhan_penyediaan_mptk'];
        $pengawasan->tertib_penggunaan_mptk = $data['tertib_penggunaan_mptk'];
        $pengawasan->tertib_penggunaan_pdn = $data['tertib_penggunaan_pdn'];
        $pengawasan->tertib_pemenuhan_standar_lingkungan = $data['tertib_pemenuhan_standar_lingkungan'];

        $pengawasan->tertib_pengawasan = $data['tertib_pengawasan'];
        $pengawasan->catatan = $data['catatan'];

        $pengawasan->verified_by = $data['verified_by'];
        $pengawasan->verified_at = now();

        $pengawasan->save();

        return $pengawasan;
    }
}
