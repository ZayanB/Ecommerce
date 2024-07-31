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
}
