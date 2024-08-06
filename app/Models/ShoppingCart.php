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

    protected $fillable = ['user_id'];

    public $timestamps = true;

    public function cartItem(): HasMany
    {
        return $this->hasMany(CartItem::class, 'cart_id', 'cart_id_pkey');
    }
    public function cartStatus(): BelongsTo
    {
        return $this->belongsTo(CartStatus::class, 'cart_status_id');
    }
    public function order(): HasOne
    {
        return $this->hasOne(OrderInfo::class);
    }
    public function userInfo(): BelongsTo
    {
        return $this->belongsTo(UserInfo::class, 'user_id', 'user_id_pkey');
    }
}
