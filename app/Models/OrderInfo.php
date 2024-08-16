<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class OrderInfo extends Model {
    use HasFactory;

    protected $table = 'order_info';
    protected $primaryKey = 'order_id_pkey';

    public $fillable = ([
        'cart_id',
        'user_id',
        'order_address_id',
        'order_status_id',
        'payment_details_id',
        'shipping_details',
        'order_total',
    ]);

    public $timestamps = true;

    public function shippingDetails(): BelongsTo {
        return $this->belongsTo(ShippingDetails::class, 'shipping_details_id', 'shipping_details_pkey');
    }

    public function orderAddress(): BelongsTo {
        return $this->belongsTo(OrderAddress::class, 'order_address_id', 'order_address_id_pkey');
    }

    public function orderPayment(): BelongsTo {
        return $this->belongsTo(OrderPayment::class, 'payment_details_id', 'order_payment_id');
    }

    public function shoppingCart(): BelongsTo {
        return $this->belongsTo(ShoppingCart::class, 'cart_id', 'cart_id_pkey');
    }
    // 
    public function orderStatus(): BelongsTo {
        return $this->belongsTo(OrderStatus::class, 'order_status_id', 'order_status_id');
    }
    // 
    public function userInfo(): BelongsTo {
        return $this->belongsTo(UserInfo::class, 'user_id', 'user_id_pkey');
    }

    public function orderItems(): HasMany {
        return $this->hasMany(OrderItem::class, 'order_id', 'order_id_pkey');
    }
}
