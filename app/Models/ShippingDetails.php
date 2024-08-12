<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;



class ShippingDetails extends Model
{
    use HasFactory;

    protected $table = 'shipping_details';
    protected $primaryKey = 'shipping_details_pkey';

    protected $fillable = ([
        'order_id',
        'shipping_method_id'
    ]);

    public $timestamps = true;


    public function shippingStatus(): BelongsTo
    {
        return $this->belongsTo(ShippingStatus::class, 'status_id');
    }
    // 
    public function shippingMethod(): BelongsTo
    {
        return $this->belongsTo(ShippingMethod::class, 'shipping_method_id', 'shipping_method_id_pkey');
    }
    // 
    public function order(): BelongsTo
    {
        return $this->belongsTo(OrderInfo::class, 'order_id', 'order_id_pkey');
    }
}
