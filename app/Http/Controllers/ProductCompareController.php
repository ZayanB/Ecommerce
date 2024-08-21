<?php

namespace App\Http\Controllers;

use App\Models\ProductCompare;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductCompareController extends Controller {
    public function addProductToCompare($id) {
        $user = Auth::user();
        $userId = $user->user_id_pkey;

        ProductCompare::firstOrCreate([
            'user_id' => $userId,
            'product_id' => $id,
        ]);

        return response()->json(['message' => 'Product added fro comparison'], 200);
    }

    public function getProductsToCompare() {
        $user = Auth::user();
        $userId = $user->user_id_pkey;

        $comparedProducts = ProductCompare::where('user_id', $userId)
            ->with(['product.image', 'product.reviews'])
            ->get();

        $comparedProducts->each(function ($productCompare) {
            $averageRating = $productCompare->product->reviews->avg('product_rating') ?? 0;
            $productCompare->product->average_rating = round($averageRating, 1);
        });

        return response()->json($comparedProducts);
    }
}
