<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\ShoppingCart;

class ShoppingCartController extends Controller
{
    public function getCartItems()
    {
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
}
