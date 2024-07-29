<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderInfo extends Model
{
    use HasFactory;

    protected $table = 'order_info';
    protected $primaryKey = 'order_id_pkey';

    public function shippingDetails(): HasOne
    {
        return $this->hasOne(ShippingDetails::class);
    }
    public function orderAddress(): HasOne
    {
        return $this->hasOne(OrderAddress::class, 'order_address_id');
    }
    public function orderPayment(): HasOne
    {
        return $this->hasOne(OrderPayment::class);
    }
    public function shoppingCart(): HasOne
    {
        return $this->hasOne(ShoppingCart::class, 'cart_id');
    }
    public function orderStatus(): BelongsTo
    {
        return $this->belongsTo(OrderStatus::class, 'order_status_id');
    }
    public function userInfo(): BelongsTo
    {
        return $this->belongsTo(UserInfo::class, 'user_id');
    }
}
