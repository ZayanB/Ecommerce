<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Vendor extends Model
{
    use HasFactory;

    protected $table = 'vendor';

    public function transaction(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }
}
