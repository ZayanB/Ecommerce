<?php

namespace App\Http\Controllers;

use App\Models\UserAddress;
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;

class UserAddressController extends Controller {

    public function getAddress() {
        $user = Auth::user();
        $userId = $user->user_id_pkey;

        $address = UserAddress::where('user_id', $userId)->get();

        return response()->json($address);
    }

    public function addAddress(Request $request) {
        $user = Auth::user();
        $userId = $user->user_id_pkey;

        $validatedData = $request->validate([
            'country' => 'required',
            'state' => 'required',
            'city' => 'required',
            'street' => 'required',
            'building' => 'required',
            'label' => 'required',
            'zipCode' => 'required'
        ]);

        try {

            UserAddress::create([
                'user_id' => $userId,
                'country' => $validatedData['country'],
                'state' => $validatedData['state'],
                'city' => $validatedData['city'],
                'street' => $validatedData['street'],
                'building' => $validatedData['building'],
                'zip_code' => $validatedData['zipCode'],
                'label' => $validatedData['label'],
            ]);

            return response()->json(['message' => 'Address added succesfully'], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
