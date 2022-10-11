<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Jenssegers\Mongodb\Auth\User as Authenticatable;

/**
 * @property mixed $name
 * @property mixed $code
 * @property mixed $assignments
 * @method static where(string $string, mixed $username)
 */

class Course extends Authenticatable implements JWTSubject
{
    use HasFactory;
    use Notifiable;

    protected $connection = 'mongodb';
    protected $collection = 'courses';

    protected $fillable = [
        'name',
        'code',
        'assignments',
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
