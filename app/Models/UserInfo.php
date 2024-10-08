<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;

class UserInfo extends Authenticatable
{
    use HasFactory, HasApiTokens, Notifiable;

    protected $table = 'user_info';
    protected $primaryKey = 'user_id_pkey';

    protected $fillable = [
        'user_first_name',
        'user_last_name',
        'user_email',
        'user_password',
        'user_birth_date',
    ];

    protected $hidden = [
        'user_password',
    ];

    public $timestamps = true;


    public function getAuthPassword()
    {
        return $this->user_password;
    }

    public function cart(): HasOne
    {
        return $this->hasOne(ShoppingCart::class, 'user_id', 'user_id_pkey');
    }
    public function compare(): HasOne
    {
        return $this->hasOne(ProductCompare::class, 'user_id', 'user_id_pkey');
    }

    public function review(): HasMany
    {
        return $this->hasMany(ProductReview::class, 'user_id', 'user_id_pkey');
    }

    public function order(): HasMany
    {
        return $this->hasMany(OrderInfo::class, 'user_id', 'user_id_pkey');
    }
}
