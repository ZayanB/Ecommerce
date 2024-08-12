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
    protected $primaryKey = 'order_payment_id';

    protected $fillable = ([
        'order_id',
        'payment_method_id',
    ]);

    public $timestamps = true;

    public function paymentMethod(): BelongsTo
    {
        return $this->belongsTo(PaymentMethod::class, 'payment_method_id', 'payment_method_id_pkey');
    }
    public function orderInfo(): HasOne
    {
        return $this->hasOne(OrderInfo::class, 'payment_details_id', 'order_payment_id');
    }
}
