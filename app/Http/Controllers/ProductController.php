<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function getFeaturedProducts(Request $request)
    {
        $criteria = $request->input('criteria', 'new_arrivals');
        $limit = $request->input('limit', 6);

        $featuredProducts = Product::getFeaturedProducts($criteria, $limit);

        return response()->json($featuredProducts);
    }

    public function getProductsByCategory($categoryId)
    {
        $featuredProducts = Product::getProductsByCategory($categoryId);

        return response()->json($featuredProducts);
    }


    public static function getProductsByFilter(Request $request)
    {
        $products = Product::with('image:product_id,image_url', 'category:category_id_pkey,category_name')->select('product_name', 'product_id_pkey', 'category_id', 'product_size', 'created_at', 'product_sale', 'product_price', 'product_description');

        if ($request->has('categoryId')) {
            $products->where('category_id', $request->input('categoryId'));
        }

        if ($request->has('size')) {
            $size = $request->input('size');
            $products->whereRaw('? = ANY(product_size)', [$size]);
        }

        // if ($request->has('new_arrival')) {
        //     $products->orderBy('created_at', 'desc');
        // }

        if ($request->has('sort')) {
            $sort = $request->input('sort');
            switch ($sort) {
                case 'az':
                    $products->orderBy('product_name', 'asc');
                    break;
                case 'za':
                    $products->orderBy('product_name', 'desc');
                    break;
                case 'priceLowHigh':
                    $products->orderBy('product_price', 'asc');
                    break;
                case 'priceHighLow':
                    $products->orderBy('product_price', 'desc');
                    break;
                case 'dateOldNew':
                    $products->orderBy('created_at', 'asc');
                    break;
                case 'dateNewOld':
                    $products->orderBy('created_at', 'desc');
                    break;
            }
        }

        return response()->json($products->get());
    }

    public function getSingleProduct($productId)
    {
        $productInfo = Product::where('product_id_pkey', $productId)->with('image:product_id,image_url', 'category:category_id_pkey,category_name')->select('product_id_pkey', 'product_name', 'product_size', 'product_price', 'product_sale', 'product_description', 'created_at', 'product_rating', 'sku', 'category_id')->first();

        return response()->json($productInfo);
    }
}
