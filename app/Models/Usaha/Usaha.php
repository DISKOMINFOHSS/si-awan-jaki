<?php

namespace App\Models\Usaha;

use App\Models\File;
use App\Models\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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

    public function jenisUsaha(): BelongsTo
    {
        return $this->belongsTo(JenisUsaha::class);
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
