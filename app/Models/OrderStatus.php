<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class OrderStatus extends Model
{
    use HasFactory;

    protected $table = 'order_status';
    protected $primaryKey = 'order_status_id_pkey';

    public function orderInfo(): HasMany
    {
        return $this->hasMany(OrderInfo::class, 'order_status_id', 'order_status_id');
    }
}
