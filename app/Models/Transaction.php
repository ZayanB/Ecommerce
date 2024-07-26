<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;


class Transaction extends Model
{
    use HasFactory;

    protected $table = 'transaction';

    public function inventory(): BelongsToMany
    {
        return $this->belongsToMany(Inventory::class);
    }
}
