<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PaymentMethod extends Model
{
    use HasFactory;

    protected $table = 'payment_method';
    protected $primaryKey = 'payment_method_id_pkey';

    public function orderPayment(): HasMany
    {
        return $this->hasMany(OrderPayment::class, 'payment_method_id', 'payment_method_id_pkey');
    }
}
