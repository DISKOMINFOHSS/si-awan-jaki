<?php

namespace App\Models\Usaha;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class KesesuaianKegiatanLingkup3 extends Model
{
    use SoftDeletes;

    protected $table = 'kesesuaian_paket_pekerjaan_lingkup_3';

    protected $fillable = [
        'pengawasan_id',
        'paket_id',
        'kesesuaian_bentuk',
        'kesesuaian_kualifikasi',
        'created_by',
    ];

    protected $casts = [
        'kesesuaianBentuk'      => 'boolean',
        'kesesuaianKualifikasi' => 'boolean',
    ];

    public function pengawasan(): BelongsTo
    {
        return $this->belongsTo(PengawasanBUJKLingkup3::class, 'pengawasan_id');
    }

    public function paketPekerjaan(): BelongsTo
    {
        return $this->belongsTo(PaketPekerjaan::class, 'paket_id');
    }
}
