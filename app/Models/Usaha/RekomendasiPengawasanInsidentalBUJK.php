<?php

namespace App\Models\Usaha;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class RekomendasiPengawasanInsidentalBUJK extends Model
{
    use SoftDeles;

    protected $table = 'rekomendasi_pengawasan_insidental_bujk';

    protected $fillable = [
        'pengawasan_id',
        'pengawasan_type',
        'rekomendasi',
        'keterangan',
        'tanggal_temuan',
        'created_by'
    ];

    public function pengawasan(): MorphTo
    {
        return $this->morphTo(__FUNCTION__, 'pengawasan_type', 'pengawasan_id');
    }
}
