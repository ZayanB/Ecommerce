<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\ShoppingCart;


class CartItemController extends Controller
{
    public function createCartItem(Request $request)
    {
        $productid = $request->input('productid');
        $productprice = $request->input('productprice');

        $user = Auth::user();
        $userId = $user->user_id_pkey;


        $cart = ShoppingCart::where('user_id', $userId)->first();

        $cartItem = CartItem::where('cart_id', $cart->cart_id_pkey)->where('product_id', $productid)->first();

        if ($cartItem) {
            $cartItem->increment('cart_item_quantity');
        } else {

            CartItem::create([
                'product_id' => $productid,
                'cart_id' => $cart->cart_id_pkey,
                'cart_item_price' => $productprice,
                'cart_item_quantity' => 1,
            ]);
        }


        return response()->json([
            'user' => $user,
            'user_info' => $userId,

        ]);
    }

    public function removeCartItem(Request $request)
    {
        $productid = $request->input('productid');
        $user = Auth::user();
        $userId = $user->user_id_pkey;

        $cart = ShoppingCart::where('user_id', $userId)->first();

        $cartItem = CartItem::where('cart_id', $cart->cart_id_pkey)
            ->where('cart_item_id_pkey', $productid)
            ->first();

        if ($cartItem->cart_item_quantity > 1) {

            $cartItem->decrement('cart_item_quantity');
        } else {

            $cartItem->delete();
        }
    }
}
