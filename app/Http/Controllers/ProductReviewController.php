<?php

namespace App\Http\Controllers;

use App\Models\ProductReview;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductReviewController extends Controller
{
    public function getProductReview()
    {
        $reviews = ProductReview::with('user:user_id_pkey,user_first_name,user_last_name', 'product:product_id_pkey,product_name')->select('product_review_id_pkey', 'product_id', 'user_id', 'product_rating', 'product_review_description')->orderBy('created_at', 'desc')->take(3)->get();

        return response()->json($reviews);
    }

    public function addProductReview(Request $request)
    {
        $user = Auth::user();
        $userId = $user->user_id_pkey;
        $productid = $request->input('productid');
        $validatedDate = $request->validate([
            'rating' => 'required',
            'description' => 'required',
        ], [
            'rating.required' => 'Please enter a rating',
            'description.required' => 'Please write a review'

        ]);

        $review = ProductReview::create([
            'user_id' => $userId,
            'product_id' => $productid,
            'product_rating' => $validatedDate['rating'],
            'product_review_description' => $validatedDate['description'],
        ]);

        return response()->json(['message' => 'Review added successfully', 'review' => $review], 201);
    }
}
