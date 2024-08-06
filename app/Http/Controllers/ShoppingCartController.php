<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\ShoppingCart;
use App\Models\CartItem;

class ShoppingCartController extends Controller
{
    public function createCartItem(Request $request)
    {
        $productid = $request->input('productid');
        $productprice = $request->input('productprice');

        $user = Auth::user();
        $userId = $user->user_id_pkey;


        $cart = ShoppingCart::firstOrCreate(
            ['user_id' => $userId],
            ['user_id' => $userId]
        );

        CartItem::create([
            'product_id' => $productid,
            'cart_id' => $cart->cart_id_pkey,
            'cart_item_price' => $productprice,
        ]);

        return response()->json([
            'user' => $user,
            'user_info' => $userId,
            // 'cart_id' => $cart->cart_id_pkey,
        ]);
    }

    public function getCartItems()
    {
        $user = Auth::user();
        $userId = $user->user_id_pkey;

        $cartItems = ShoppingCart::where('user_id', $userId)
            ->with('cartItem.product.image')
            ->first()
            ->cartItem;

        $transformedCartItems = $cartItems->map(function ($cartItem) {
            return [
                'cart_item_id' => $cartItem->cart_item_id_pkey,
                // 'quantity' => $cartItem->quantity,
                'product_name' => $cartItem->product->product_name,
                'product_price' => $cartItem->product->product_price,
                'product_image' => $cartItem->product->image,
            ];
        });

        return response()->json([
            'cart_items' => $transformedCartItems,
        ]);
    }
}
