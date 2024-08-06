<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CartItem extends Model
{
    use HasFactory;

    protected $table = 'cart_item';
    protected $primaryKey = 'cart_item_id_pkey';

    protected $fillable = [
        'product_id',
        'cart_item_price',
        'cart_id',
    ];

    public $timestamps = true;

    public function shoppingCart(): BelongsTo
    {
        return $this->belongsTo(ShoppingCart::class, 'cart_id', 'cart_id_pkey');
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'product_id', 'product_id_pkey');
    }
}
