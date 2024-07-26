<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class UserAddress extends Model
{
    use HasFactory;

    protected $table = 'user_address';
    protected $primaryKey = 'user_address_id';

    public function userInfo(): BelongsTo
    {
        return $this->belongsTo(UserInfo::class, 'user_id');
    }
    public function orderAddress(): HasOne
    {
        return $this->hasOne(OrderAddress::class);
    }
}
