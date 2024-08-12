<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\ShoppingCart;
use App\Models\CartItem;

class ShoppingCartController extends Controller {
    public function createCartItem(Request $request) {
        $productid = $request->input('productid');
        $productprice = $request->input('productprice');

        $user = Auth::user();
        $userId = $user->user_id_pkey;


        $cart = ShoppingCart::firstOrCreate(
            ['user_id' => $userId],
            ['user_id' => $userId]
        );

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

    public function getCartItems() {
        $user = Auth::user();
        $userId = $user->user_id_pkey;

        $shoppingCart = ShoppingCart::where('user_id', $userId)
            ->with('cartItem.product.image')
            ->first();

        $cartItems = $shoppingCart->cartItem;

        $transformedCartItems = $cartItems->map(function ($cartItem) {
            return [
                'cart_item_id' => $cartItem->cart_item_id_pkey,
                'product_name' => $cartItem->product->product_name,
                'product_price' => $cartItem->product->product_price,
                'product_image' => $cartItem->product->image,
                'quantity' => $cartItem->cart_item_quantity,
            ];
        });

        $totalQuantity = $cartItems->sum('cart_item_quantity');

        $cartTotalPrice = $cartItems->sum(function ($cartItem) {
            return $cartItem->product->product_price * $cartItem->cart_item_quantity;
        });

        $shoppingCart->cart_total_price = $cartTotalPrice;
        $shoppingCart->save();

        $shoppingCart->cart_total_quantity = $totalQuantity;
        $shoppingCart->save();

        return response()->json([
            'cart_items' => $transformedCartItems,
            'cart_items_count' => $totalQuantity,
            'cart_total_price' => $cartTotalPrice,
            // 'cart_item_id' => $transformedCartItems->cart_item_id_key,
        ]);
    }

    public function removeCartItem(Request $request) {
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
