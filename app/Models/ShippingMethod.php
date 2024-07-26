<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ShippingMethod extends Model
{
    use HasFactory;

    protected $table = 'shipping_method';

    public function shippingDetails(): HasMany
    {
        return $this->hasMany(ShippingDetails::class);
    }
}
