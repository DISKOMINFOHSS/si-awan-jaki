<?php

namespace App\Models\Penyelenggaraan;

use App\Models\User;
use App\Models\Usaha\Usaha;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class ProyekKonstruksi extends Model
{
    use HasUuids, SoftDeletes;

    protected $table = 'proyek_konstruksi';

    protected $fillable = [
        'kode_paket',
        'nama_paket',
        'nomor_kontrak',
        'sumber_dana',
        'tahun_anggaran',
        'nilai_pagu',
        'nilai_kontrak',
        'tanggal_kontrak',
        'mulai_pelaksanaan',
        'selesai_pelaksanaan',
        'penyedia_jasa_id',
        'pengguna_jasa_id',
        'created_by',
    ];

    protected $casts = [
        'tertib_proses_pemilihan_penyedia_jasa'  => 'boolean',
        'tertib_penerapan_standar_kontrak'       => 'boolean',
        'tertib_penggunaan_tkk'                  => 'boolean',
        'tertib_pemberian_pekerjaan'             => 'boolean',
        'tertib_ketersediaan_dokumen_standar_k4' => 'boolean',
        'tertib_penerapan_smkk'                  => 'boolean',
        'tertib_antisipasi_kecelakaan'           => 'boolean',
        'tertib_penerapan_manajemen_mutu'        => 'boolean',
        'tertib_pemenuhan_penyediaan_mptk'       => 'boolean',
        'tertib_penggunaan_mptk'                 => 'boolean',
        'tertib_penggunaan_pdn'                  => 'boolean',
        'tertib_pemenuhan_standar_lingkungan'    => 'boolean',
        'tertib_pengawasan'                      => 'boolean',
    ];

    public function penyediaJasa(): BelongsTo
    {
        return $this->belongsTo(Usaha::class, 'penyedia_jasa_id');
    }

    public function penggunaJasa(): BelongsTo
    {
        return $this->belongsTo(PenggunaJasa::class, 'pengguna_jasa_id');
    }

    public function konsultanPengawas(): BelongsTo
    {
        return $this->belongsTo(Usaha::class, 'konsultan_pengawas_id');
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function pengawasan(): HasMany
    {
        return $this->hasMany(PengawasanPenyelenggaraan::class, 'proyek_konstruksi_id');
    }

    public function pengawasanProgress(): HasOne
    {
        return $this->hasOne(PengawasanProgress::class, 'proyek_konstruksi_id');
    }
}
