<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Jenssegers\Mongodb\Auth\User as Authenticatable;

/**
 * @property mixed $username
 * @property mixed $password
 */

class Admin extends Authenticatable implements JWTSubject
{
    use HasFactory;
    use Notifiable;

    protected $connection = 'mongodb';
    protected $collection = 'admin';

    protected $fillable = [
        'username',
        'password',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims(): array
    {
        return [];
    }
}
