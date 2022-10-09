<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Jenssegers\Mongodb\Auth\User as Authenticatable;

/**
 * @property mixed $username
 * @property mixed $name
 * @property mixed $password
 * @method static where(string $string, mixed $username)
 */

class Student extends Authenticatable implements JWTSubject
{
    use HasFactory;
    use Notifiable;

    protected $connection = 'mongodb';
    protected $collection = 'students';

    protected $fillable = [
        'name',
        'username',
        'password',
        'enrolled_courses',
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
