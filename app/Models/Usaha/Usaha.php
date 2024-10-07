<?php

namespace App\Models\Usaha;

use App\Models\User;
use App\Models\Penyelenggaraan\ProyekKonstruksi;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Usaha extends Model
{
    use HasUuids, SoftDeletes;

    protected $table = 'usaha';

    protected $fillable = [
        'nama',
        'nib',
        'dokumen_nib',
        'pjbu',
        'alamat',
        'status',
        'jenis_usaha_id',
        'created_by',
    ];

    protected $casts = [
        'tertib_jenis_usaha'        => 'boolean',
        'tertib_sifat_usaha'        => 'boolean',
        'tertib_klasifikasi_usaha'  => 'boolean',
        'tertib_layanan_usaha'      => 'boolean',
        'tertib_bentuk_usaha'       => 'boolean',
        'tertib_kualifikasi_usaha'  => 'boolean',
        'tertib_persyaratan_sbu'    => 'boolean',
        'tertib_persyaratan_nib'    => 'boolean',
        'tertib_pengembangan_usaha' => 'boolean',
        'tertib_pengawasan'         => 'boolean',
    ];

    public function jenisUsaha(): BelongsTo
    {
        return $this->belongsTo(JenisUsaha::class);
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function pengawasanUsahaPerseorangan(): HasMany
    {
        return $this->hasMany(PengawasanUsahaPerseorangan::class, 'usaha_id');
    }

    public function pengawasanLingkup2(): HasMany
    {
        return $this->hasMany(PengawasanBUJKLingkup2::class, 'usaha_id');
    }

    public function proyekKonstruksi(): HasMany
    {
        return $this->hasMany(ProyekKonstruksi::class, 'penyedia_jasa_id');
    }

    public function pengawasanRutin(): HasMany
    {
        return $this->hasMany(PengawasanBUJKRutin::class, 'usaha_id');
    }

    public function skk(): HasMany
    {
        return $this->hasMany(SertifikatStandarUsahaPerseorangan::class, 'usaha_id');
    }
}
