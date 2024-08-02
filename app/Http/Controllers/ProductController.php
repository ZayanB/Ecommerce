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

        return response()->json($products->get());
    }

    // public function getProductsByCategory(Request $request)
    // {
    //     $categoryId = $request->input('category');
    //     $products = Product::getProductsByCategory($categoryId);
    //     return response()->json($products);
    // }
}
