<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        try {

            $request->validate([
                'email' => 'required|email',
                'password' => 'required'
            ]);

            $user = User::where('email', $request->email)->first();

            if (!$user) {
                return response()->json([
                    'message' => 'User not found'
                ], 404);
            }

            if (!Hash::check($request->password, $user->password)) {
                return response()->json([
                    'message' => 'Invalid password'
                ], 401);
            }

            return response()->json([
                'message' => 'Login successful',
                'user' => $user
            ]);

        } catch (\Exception $e) {

            return response()->json([
                'message' => 'Server error',
                'error' => $e->getMessage(),
                'line' => $e->getLine()
            ], 500);

        }
    }
}