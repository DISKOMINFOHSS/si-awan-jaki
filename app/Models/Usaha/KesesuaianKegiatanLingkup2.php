<?php

namespace App\Models\Usaha;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class KesesuaianKegiatanLingkup2 extends Model
{
    use SoftDeletes;

    protected $table = 'kesesuaian_paket_pekerjaan_lingkup_2';

    protected $fillable = [
        'pengawasan_id',
        'paket_id',
        'kesesuaian_jenis',
        'kesesuaian_sifat',
        'kesesuaian_subklasifikasi',
        'kesesuaian_layanan',
        'created_by',
    ];

    public function pengawasan(): BelongsTo
    {
        return $this->belongsTo(PengawasanBUJKLingkup2::class, 'pengawasan_id');
    }

    public function paketPekerjaan(): BelongsTo
    {
        return $this->belongsTo(PaketPekerjaan::class, 'paket_id');
    }
}
