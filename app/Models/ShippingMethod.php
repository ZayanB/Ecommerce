<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ShippingMethod extends Model
{
    use HasFactory;

    protected $table = 'shipping_method';
    protected $primaryKey = 'shipping_method_id_pkey';

    public function shippingDetails(): HasMany
    {
        return $this->hasMany(ShippingDetails::class, 'shipping_method_id', 'shipping_method_id_pkey');
    }
}
