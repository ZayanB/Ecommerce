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
        return $this->hasMany(Image::class, 'product_id_from');
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


        return $products->with('image:product_id_from,image_url')
            ->select('product_name', 'product_price', 'product_rating')
            ->limit($limit)
            ->get()
            ->map(function ($product) {
                $product->image_urls = $product->images ? $product->images->pluck('image_url') : collect();
                return $product;
            });
    }
}
