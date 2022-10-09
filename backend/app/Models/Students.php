<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Students extends Eloquent
{
    protected $connection = 'mongodb';
    protected $collection = 'students';

    protected $fillable = [
        'name',
        'username',
        'password'
    ];

    use HasFactory;
}
