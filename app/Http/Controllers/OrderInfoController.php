<?php

namespace App\Http\Controllers;

use App\Models\OrderAddress;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\OrderInfo;
use App\Models\OrderItem;
use App\Models\OrderPayment;
use App\Models\ShippingDetails;
use App\Models\ShoppingCart;

class OrderInfoController extends Controller {
    public function createOrder(Request $request) {
        $user = Auth::user();
        $userId = $user->user_id_pkey;

        $shoppingCart = ShoppingCart::where('user_id', $userId)->first();
        $cartId = $shoppingCart->cart_id_pkey;

        $cartItems = $shoppingCart->cartItem;

        $validatedData = $request->validate([
            'addressId' => 'required',
            'shippingMethod' => 'required',
            'paymentMethod' => 'required',
        ]);

        $orderAddress = OrderAddress::where('address_id', $validatedData['addressId'])->first();
        $orderAddressId = $orderAddress->order_address_id_pkey;
        $orderTotal = $request->input('total');

        $shippingDetails = ShippingDetails::firstOrCreate([
            'shipping_method_id' => $validatedData['shippingMethod'],
        ]);
        $shippingMethod = $shippingDetails->shippingMethod->method;

        $paymentDetails = OrderPayment::firstOrCreate([
            'payment_method_id' => $validatedData['paymentMethod'],
        ]);
        $paymentMethod = $paymentDetails->paymentMethod->method;

        try {
            $order = OrderInfo::create([
                'user_id' => $userId,
                'order_address_id' => $orderAddressId,
                'payment_details_id' => $paymentMethod,
                'shipping_details' => $shippingMethod,
                'cart_id' => $cartId,
                'order_total' => $orderTotal,
            ]);

            // Loop through each cart item and create an OrderItem
            foreach ($cartItems as $cartItem) {
                OrderItem::create([
                    'order_id' => $order->order_id_pkey,
                    'product_id' => $cartItem->product_id, // Assuming you have product_id in your cart item
                    'price' => $cartItem->product->product_price,
                    'quantity' => $cartItem->cart_item_quantity,
                    'name' => $cartItem->product->product_name,
                ]);
            }

            return response()->json([
                'message' => 'Order created successfully!',
                'order' => $order
            ], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    public function getOrderInfo() {
        $user = Auth::user();
        $userId = $user->user_id_pkey;

        $orderInfo = OrderInfo::where('user_id', $userId)
            ->with(['orderItems', 'orderAddress.address']) // Include 'address' through 'orderAddress'
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($orderInfo);
    }
}
