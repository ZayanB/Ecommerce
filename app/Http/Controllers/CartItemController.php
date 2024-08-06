<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use Illuminate\Http\Request;


class CartItemController extends Controller
{
    public function createCartItem(Request $request)
    {
        $productid = $request->input('productid');
        $productprice = $request->input('productprice');

        CartItem::create([
            'product_id' => $productid,
            'cart_item_price' => $productprice
        ]);

        return response()->json(['message' => 'Product added to cart successfully!'], 200);
    }
}
