<?php

namespace App\Http\Controllers;

use App\Models\UserInfo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;



class AuthenticationController extends Controller {
    function register(Request $request) {
        $validatedData = $request->validate([
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:user_info,user_email',
            'password' => 'required|string|min:8',
            'birthday' => 'required|date|before:-10 years',
        ], [
            'birthday.before' => 'You must be at least 10 years old'
        ]);

        $user = UserInfo::create([
            'user_first_name' => $validatedData['firstname'],
            'user_last_name' => $validatedData['lastname'],
            'user_email' => $validatedData['email'],
            'user_password' => bcrypt($validatedData['password']),
            'user_birth_date' => date('Y-m-d', strtotime($validatedData['birthday'])),
        ]);

        return "User Created Successfully";
    }

    function login(Request $request) {
        try {
            $validatedData = $request->validate([
                'email' => 'required|string|email|max:255|exists:user_info,user_email',
                'password' => 'required|string',
            ]);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        }

        $user = UserInfo::where('user_email', $validatedData['email'])->first();

        if (!$user || !Hash::check($validatedData['password'], $user->user_password)) {
            return response()->json(['errors' => ['message' => 'Incorrect email or password']], 422);
        }

        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json(['access_token' => $token, 'token_type' => 'Bearer']);
    }

    public function logout(Request $request) {
        // Revoke the current token
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully.'], 200);
    }
}
