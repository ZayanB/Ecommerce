<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    use HasFactory;

    protected $table = 'product';
    protected $primaryKey = 'product_id_pkey';

    public function image(): HasMany
    {
        return $this->hasMany(Image::class, 'product_id');
    }
    public function cartItem(): HasMany
    {
        return $this->hasMany(CartItem::class);
    }
    public function transactionItem(): HasMany
    {
        return $this->hasMany(TransactionItem::class);
    }
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }


    public static function getFeaturedProducts($criteria = 'new_arrivals', $limit = 6)
    {
        switch ($criteria) {
            case 'new_arrivals':
                $products = Product::orderBy('created_at', 'desc');
                break;

            case 'our_favorites':
                $products = Product::orderBy('product_rating', 'desc');
                break;

            default:
                $products = Product::orderBy('created_at', 'desc');
                break;
        }

        $products = Product::with('image:product_id,image_url')
            ->select(['product_id_pkey', 'product_name', 'product_price', 'product_rating', 'product_url', 'created_at', 'product_sale', 'product_size'])->limit($limit)->get();


        return $products;
    }
}
