<?php

namespace App\Models\Penyelenggaraan;

use App\Models\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PengawasanPenyelenggaraan extends Model
{
    use HasUuids, SoftDeletes;

    protected $table = 'pengawasan_penyelenggaraan_konstruksi';

    protected $fillable = [
        'jenis_pengawasan',
        'tanggal_pengawasan',
        'proyek_konstruksi_id',
        'tertib_proses_pemilihan_penyedia_jasa',
        'tertib_penerapan_standar_kontrak',
        'tertib_penggunaan_tkk',
        'tertib_pemberian_pekerjaan',
        'tertib_ketersediaan_dokumen_standar_k4',
        'tertib_penerapan_smkk',
        'tertib_antisipasi_kecelakaan',
        'tertib_penerapan_manajemen_mutu',
        'tertib_pemenuhan_penyediaan_mptk',
        'tertib_penggunaan_mptk',
        'tertib_penggunaan_pdn',
        'tertib_pemenuhan_standar_lingkungan',
        'tertib_pengawasan',
        'catatan',
        'verified_by',
        'verified_at',
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

    public function proyekKonstruksi(): BelongsTo
    {
        return $this->belongsTo(ProyekKonstruksi::class, 'proyek_konstruksi_id');
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function verifiedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'verified_by')->withDefault();
    }
}
