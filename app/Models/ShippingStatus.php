<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ShippingStatus extends Model
{
    use HasFactory;

    protected $table = 'shipping_status';
    protected $primaryKey = 'shipping_status_id_pkey';

    public function shippingDetails(): HasMany
    {
        return $this->hasMany(shippingDetails::class);
    }
}
