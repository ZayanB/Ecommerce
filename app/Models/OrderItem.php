<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderItem extends Model {
    use HasFactory;

    protected $table = 'order_items';
    protected $primaryKey = 'order_item_pkey';

    protected $fillable = ([
        'order_id',
        'product_id',
        'price',
        'quantity',
        'name'
    ]);

    public function order(): BelongsTo {
        return $this->belongsTo(OrderInfo::class, 'order_id', 'order_id_pkey');
    }


    public $timestamps = true;
}
