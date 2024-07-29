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
    protected $primaryKey = 'shipping_details_id_pkey';

    public function shippingStatus(): BelongsTo
    {
        return $this->belongsTo(ShippingStatus::class, 'status_id');
    }
    public function shippingMethod(): HasMany
    {
        return $this->hasMany(ShippingMethod::class);
    }
    public function order(): HasOne
    {
        return $this->hasOne(OrderInfo::class);
    }
}
