<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserInfo extends Model
{
    use HasFactory;

    protected $table = 'user_info';

    public function userAddress(): HasMany
    {
        return $this->hasMany(UserAddress::class);
    }
    public function orderInfo(): HasMany
    {
        return $this->hasMany(OrderInfo::class);
    }
    public function shoppingCart(): HasOne
    {
        return $this->hasOne(ShoppingCart::class);
    }
    public function userRole(): BelongsTo
    {
        return $this->belongsTo(UserRole::class, 'user_role_id');
    }
}
