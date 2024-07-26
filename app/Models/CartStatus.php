<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;


class CartStatus extends Model
{
    use HasFactory;

    protected $table = 'cart_status';
    protected $primaryKey = 'cart_status_id_pkey';

    public function shoppingCart(): HasMany
    {
        return $this->hasMany(ShoppingCart::class);
    }
}
