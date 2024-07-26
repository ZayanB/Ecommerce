<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    use HasFactory;

    protected $table = 'product';

    public function image(): HasMany
    {
        return $this->hasMany(Image::class);
    }
    public function cartItem(): HasMany
    {
        return $this->hasMany(CartItem::class);
    }
    public function transactionItem(): HasMany
    {
        return $this->hasMany(TransactionItem::class);
    }
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
