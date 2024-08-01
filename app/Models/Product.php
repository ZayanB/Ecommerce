<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model {
    use HasFactory;

    protected $table = 'product';
    protected $primaryKey = 'product_id_key';

    public function image(): HasMany {
        return $this->hasMany(Image::class, 'product_id');
    }
    public function cartItem(): HasMany {
        return $this->hasMany(CartItem::class);
    }
    public function transactionItem(): HasMany {
        return $this->hasMany(TransactionItem::class);
    }
    public function category(): BelongsTo {
        return $this->belongsTo(Category::class, 'category_id');
    }


    public static function getFeaturedProducts($criteria = 'new_arrivals', $limit = 6) {
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
            ->select(['product_id_key', 'product_name', 'product_price', 'product_rating', 'created_at', 'product_sale', 'product_size', 'product_description'])->limit($limit)->get();


        return $products;
    }


    public static function getProductsCategory($category = 'artDecor') {
        $products = Product::with('image:product_id,image_url', 'category:category_id_pkey,category_name');

        switch ($category) {
            case 'pottery':
                $products = $products->whereHas('category', function ($query) {
                    $query->where('category_name', 'pottery');
                });

                break;


            case 'casesDocks':
                $products = $products->whereHas('category', function ($query) {
                    $query->where('category_name', 'cases & docks');
                });
                break;
            case 'cosmetic':
                $products = $products->whereHas('category', function ($query) {
                    $query->where('category_name', 'cosmetic');
                });
                break;
            case 'fashion':
                $products = $products->whereHas('category', function ($query) {
                    $query->where('category_name', 'fashion');
                });
                break;
            case 'furniture':
                $products = $products->whereHas('category', function ($query) {
                    $query->where('category_name', 'furniture');
                });
                break;
            case 'jewelry':
                $products = $products->whereHas('category', function ($query) {
                    $query->where('category_name', 'jewelry');
                });
                break;

            default:
                $products = $products->whereHas('category', function ($query) {
                    $query->where('category_name', 'art + decor');
                });
                break;
        }
        $products = $products->select(['product_id_key', 'product_name', 'product_price', 'product_sale', 'product_size', 'category_id'])->get();

        return $products;
    }
}
