<?php

namespace App\Http\Controllers;

use App\Models\UserInfo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserInfoController extends Controller {
    public function getUserInfo() {
        $user = Auth::user();
        $userId = $user->user_id_pkey;
        $userInfo = UserInfo::where('user_id_pkey', $userId)->first();
        return response()->json($userInfo);
    }
}
