<?php

namespace App\Http\Controllers;

use App\Models\UserInfo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Hash;

class AuthenticationController extends Controller
{
    //
    function addUser(Request $request)
    {
        $validatedData = $request->validate([
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:user_info,user_email',
            'password' => 'required|string|min:8',
            'birthday' => 'required|date|before:-10 years',
        ]);

        UserInfo::create([
            'user_first_name' => $validatedData['firstname'],
            'user_last_name' => $validatedData['lastname'],
            'user_email' => $validatedData['email'],
            'user_password' => bcrypt($validatedData['password']),
            'user_birth_date' => date('Y-m-d', strtotime($validatedData['birthday'])),
        ]);
    }

    public function loginUser(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        // Retrieve the input data
        $email = $request->input('email');
        $password = $request->input('password');

        // Check if the user exists in the database
        $user = UserInfo::where('user_email', $email)->first();

        if ($user && Hash::check($password, $user->user_password)) {
            // Redirect to welcome page if user authenticated
            return Redirect::to('/');
        } else {
            // Echo wrong credential message if credentials are incorrect
            return back()->withErrors(['message' => 'Wrong credentials'])->withInput();
        }
    }
}
