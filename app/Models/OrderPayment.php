<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class OrderPayment extends Model
{
    use HasFactory;

    protected $table = 'order_payment';

    public function paymentMethod(): BelongsTo
    {
        return $this->belongsTo(PaymentMethod::class, 'payment_method_id');
    }
    public function orderInfo(): HasOne
    {
        return $this->hasOne(OrderInfo::class, 'order_id');
    }
}
