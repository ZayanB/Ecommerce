<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PaymentMethod extends Model
{
    use HasFactory;

    protected $table = 'payment_method';

    public function orderPayment(): HasMany
    {
        return $this->hasMany(OrderPayment::class);
    }
}
