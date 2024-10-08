<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    use HasFactory;

    protected $table = 'category';
    protected $primaryKey = 'category_id_pkey';

    public function product(): HasMany
    {
        return $this->hasMany(Product::class, 'category_id');
    }

    public static function getAllCategories()
    {
        $categories = Category::all();
        return $categories;
    }
}
