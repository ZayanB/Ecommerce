<?php

namespace App\Http\Controllers;

use App\Models\ProductReview;
use Illuminate\Http\Request;

class ProductReviewController extends Controller
{
    public function getProductReview(Request $request)
    {
        $reviews = ProductReview::with('user:user_id_pkey,user_first_name,user_last_name', 'product:product_id_pkey,product_name')->select('product_review_id_pkey', 'product_id', 'user_id', 'product_rating', 'product_review_description')->get();

        return response()->json(
            $reviews
        );
    }
}
