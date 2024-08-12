<?php

namespace App\Http\Controllers;

use App\Models\OrderAddress;
use Illuminate\Http\Request;

class OrderAddressController extends Controller
{
    public function addOrderAddress(Request $request)
    {
        $addressId = $request->input('addressId');

        OrderAddress::firstOrCreate([
            'address_id' => $addressId,
        ]);

        return response()->json([
            'message' => 'Order address added successfully!',
        ], 201);
    }
}
