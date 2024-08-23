<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Blog;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->input('query');

        $products = Product::with('image')
            ->where('product_name', 'ilike', "%{$query}%")
            ->orWhere('product_description', 'ilike', "%{$query}%")
            ->get();

        $blogs = Blog::with('product.image')
            ->where('title', 'ilike', "%{$query}%")
            ->orWhere('description', 'ilike', "%{$query}%")
            ->orWhere('description', 'ilike', "%{$query}%")
            ->get();

        if ($products->isEmpty() && $blogs->isEmpty()) {
            return response()->json([
                'message' => 'No products or blogs found.',
                'products' => [],
                'blogs' => [],
            ]);
        } else {
            return response()->json([
                'message' => 'Results found.',
                'products' => $products,
                'blogs' => $blogs,
            ]);
        }
    }
}
