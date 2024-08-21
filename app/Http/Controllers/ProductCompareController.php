<?php

namespace App\Http\Controllers;

use App\Models\ProductCompare;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductCompareController extends Controller
{
    public function addProductToCompare($id)
    {
        $user = Auth::user();
        $userId = $user->user_id_pkey;

        ProductCompare::create([
            'user_id' => $userId,
            'product_id' => $id,
        ]);

        return response()->json(['message' => 'Product added fro comparison'], 200);
    }

    public function getProductsToCompare()
    {
        $user = Auth::user();
        $userId = $user->user_id_pkey;

        $comparedProducts = ProductCompare::where('user_id', $userId)->get();

        return response()->json($comparedProducts);
    }
}
