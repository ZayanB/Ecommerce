<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class UserRole extends Model
{
    use HasFactory;

    protected $table = 'user_role';
    protected $primaryKey = 'user_role_id_pkey';

    public function userInfo(): HasMany
    {
        return $this->hasMany(UserInfo::class);
    }
}
