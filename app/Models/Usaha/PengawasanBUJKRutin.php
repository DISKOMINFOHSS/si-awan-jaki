<?php

namespace App\Models\Usaha;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PengawasanBUJKRutin extends Model
{
    use SoftDeletes;

    protected $table = 'pengawasan_bujk_rutin';

    protected $fillable = [
        'usaha_id',
        'start',
        'end',
        'pengawasan_lingkup_2',
        'pengawasan_lingkup_3',
        'pengawasan_lingkup_4',
        'pengawasan_lingkup_5',
    ];

    public function usaha(): BelongsTo
    {
        return $this->belongsTo(Usaha::class, 'usaha_id');
    }
}
