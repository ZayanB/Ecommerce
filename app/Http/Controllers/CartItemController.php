<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use Illuminate\Http\Request;

class CartItemController extends Controller {
    public function createCartItem(Request $request) {
        $productid = $request->input('productid'); // Corrected to match the request field
        $productprice = $request->input('productprice'); // Corrected to match the request field

        CartItem::create([
            'product_id' => $productid,
            'cart_item_price' => $productprice
        ]);

        return response()->json(['message' => 'Product added to cart successfully!'], 200);
    }
}
