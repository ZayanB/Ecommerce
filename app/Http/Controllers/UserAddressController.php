<?php

namespace App\Http\Controllers;

use App\Models\UserAddress;
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;

class UserAddressController extends Controller
{

    public function getAddress()
    {
        $user = Auth::user();
        $userId = $user->user_id_pkey;

        $address = UserAddress::where('user_id', $userId)
            ->where('deleted', false)
            ->get();

        return response()->json($address);
    }

    public function getAddressById($id)
    {
        $address = UserAddress::where('user_address_id', $id)->first();
        return response()->json($address);
    }

    public function addAddress(Request $request)
    {
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
        ], [
            'country.required' => 'Please select a country',
            'state.required' => 'Please enter a state',
            'city.required' => 'Please enter a city',
            'street.required' => 'Please enter a street',
            'building.required' => 'Please enter a building',
            'label.required' => 'Please enter a label',
            'zipCode.required' => 'Please enter a Zip Code',
        ]);

        try {

            UserAddress::create([
                'user_id' => $userId,
                'country' => $validatedData['country'],
                'state' => $validatedData['state'],
                'city' => $validatedData['city'],
                'street' => $validatedData['street'],
                'building' => $validatedData['building'],
                'zipCode' => $validatedData['zipCode'],
                'label' => $validatedData['label'],
            ]);

            return response()->json(['message' => 'Address added succesfully'], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function updateAddress(Request $request, $id)
    {
        $validatedData = $request->validate([
            'country' => 'required',
            'state' => 'required',
            'city' => 'required',
            'street' => 'required',
            'building' => 'required',
            'label' => 'required',
            'zipCode' => 'required'
        ], [
            'country.required' => 'Please select a country',
            'state.required' => 'Please enter a state',
            'city.required' => 'Please enter a city',
            'street.required' => 'Please enter a street',
            'building.required' => 'Please enter a building',
            'label.required' => 'Please enter a label',
            'zipCode.required' => 'Please enter a Zip Code',
        ]);

        $address = UserAddress::find($id);

        try {

            $address->update($validatedData);

            return response()->json(['message' => 'Address updated succesfully'], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function deleteAddress($id)
    {
        $address = UserAddress::find($id);
        $address->deleted = true;
        $address->save();

        return response()->json(['message' => 'Address deleted successfully'], 200);
    }
}
