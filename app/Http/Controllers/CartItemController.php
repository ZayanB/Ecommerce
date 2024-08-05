<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CartItem;

class CartItemController extends Controller
{
    function addCartItem(Request $request)
    {
        $productID = $request->input('productid');
        $productPrice = $request->input('productprice');
        // $quantity = $request->input('quantity');

        CartItem::create([
            'product_id' => $productID,
            'cart_item_price' => $productPrice,
            // 'cart_item_quantity' => $quantity,
        ]);
    }
}
