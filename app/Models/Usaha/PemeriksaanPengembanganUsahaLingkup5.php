<?php

namespace App\Models\Usaha;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class PemeriksaanPengembanganUsahaLingkup5 extends Model
{
    use SoftDeletes;

    protected $table = 'pemeriksaan_pengembangan_usaha_lingkup_5';

    protected $fillable = [
        'pengawasan_id',
        'pemeriksaan_id',
        'hasil_pemeriksaan',
        'catatan_pemeriksaan',
        'created_by',
    ];

    public function pengawasan(): BelongsTo
    {
        return $this->belongsTo(PengawasanBUJKLingkup5::class, 'pengawasan_id');
    }
}
