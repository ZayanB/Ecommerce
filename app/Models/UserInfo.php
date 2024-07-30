<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

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
}
