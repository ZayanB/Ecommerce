<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderAddress extends Model {
    use HasFactory;

    protected $table = 'order_address';
    protected $primaryKey = 'order_address_id_pkey';

    protected $fillable = ([
        'order_id',
        'address_id'
    ]);

    public $timestamps = true;

    public function order(): HasOne {
        return $this->hasOne(OrderInfo::class, 'order_address_id', 'order_address_id_pkey');
    }
    public function address(): BelongsTo {
        return $this->belongsTo(UserAddress::class, 'address_id', 'user_address_id');
    }
}
