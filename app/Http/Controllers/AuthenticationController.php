<?php

namespace App\Http\Controllers;

use App\Models\UserInfo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthenticationController extends Controller
{
    function register(Request $request)
    {
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

        $user->createToken('auth_token')->plainTextToken;

        return "User Created Successfully";
    }
    function login(Request $request)
    {
        $validatedData = $request->validate([
            'email' => 'required|string|email|max:255|exists:user_info,user_email',
            'password' => 'required|string',
        ]);

        $user = UserInfo::where('user_email', $validatedData['email'])->first();

        if (!$user || !Hash::check($validatedData['password'], $user->user_password)) {
            return back()->withErrors(['message' => 'Incorrect email or password'])->withInput();
        }

        $user->createToken('auth_token')->plainTextToken;

        return to_route('home');
    }
}
