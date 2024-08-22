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

        $blogs = Blog::where('title', 'ilike', "%{$query}%")
            ->orWhere('description', 'ilike', "%{$query}%")
            ->orWhere('description', 'ilike', "%{$query}%")
            ->get();

        return response()->json([
            'products' => $products,
            'blogs' => $blogs,
        ]);
    }
}
