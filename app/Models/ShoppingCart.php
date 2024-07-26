<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class ShoppingCart extends Model
{
    use HasFactory;

    protected $table = 'shopping_cart';
    protected $primaryKey = 'cart_id_pkey';

    public function cartItem(): HasMany
    {
        return $this->hasMany(CartItem::class);
    }
    public function cartStatus(): BelongsTo
    {
        return $this->belongsTo(CartStatus::class, 'cart_status_id');
    }
    public function order(): HasOne
    {
        return $this->hasOne(OrderInfo::class);
    }
    public function userInfo(): HasOne
    {
        return $this->hasOne(UserInfo::class, 'user_id');
    }
}
