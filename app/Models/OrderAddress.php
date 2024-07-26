<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class OrderAddress extends Model
{
    use HasFactory;

    protected $table = 'order_address';

    public function order(): HasOne
    {
        return $this->hasOne(OrderInfo::class);
    }
    public function address(): HasOne
    {
        return $this->hasOne(UserAddress::class);
    }
}
