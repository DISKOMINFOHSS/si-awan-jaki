<?php

namespace App\Models\Usaha;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class PaketPekerjaan extends Model
{
    use SoftDeletes;

    protected $table = 'paket_pekerjaan';

    protected $fillable = [
        'nama',
        'tahun_anggaran',
        'jenis_usaha',
        'sifat_usaha',
        'subklasifikasi_usaha',
        'layanan_usaha',
        'bentuk_usaha',
        'kualifikasi_usaha',
        'usaha_id',
        'created_by',
    ];

    public function usaha(): BelongsTo
    {
        return $this->belongsTo(Usaha::class, 'usaha_id');
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

}
