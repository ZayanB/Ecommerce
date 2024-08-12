<?php

namespace App\Http\Controllers;

use App\Models\OrderAddress;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\OrderInfo;
use App\Models\OrderPayment;
use App\Models\ShippingDetails;

class OrderInfoController extends Controller
{
    public function createOrder(Request $request)
    {
        $user = Auth::user();
        $userId = $user->user_id_pkey;
        // $addressId = $request->input('addressId');
        // $shippingMethod = $request->input('shippingMethod');
        // $paymentMethod = $request->input('paymentMethod');

        $validatedData = $request->validate([
            'addressId' => 'required',
            'shippingMethod' => 'required',
            'paymentMethod' => 'required',
        ]);

        $orderAddress = OrderAddress::where('address_id', $validatedData['addressId'])->first();
        $orderAddressId = $orderAddress->order_address_id_pkey;

        $shippingDetails = ShippingDetails::firstOrCreate([
            'shipping_method_id' => $validatedData['shippingMethod'],
        ]);

        $paymentDetails = OrderPayment::firstOrCreate([
            'payment_method_id' => $validatedData['paymentMethod'],
        ]);
        try {

            $order = OrderInfo::create([
                'user_id' => $userId,
                'order_address_id' => $orderAddressId,
                'payment_details_id' => $paymentDetails->order_payment_id,
                'shipping_details_id' => $shippingDetails->shipping_details_pkey,
            ]);
            return response()->json([
                'message' => 'Order created successfully!',
                'order' => $order
            ], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
