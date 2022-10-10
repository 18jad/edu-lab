<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\Student;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;


class InstructorsController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(data: [
                'status' => false,
                'error' => $validator->errors()
            ]);
        } else {
            $instructor_credentials = $request->only('username', 'password');
            $auth_token = Auth::guard('instructor')->attempt($instructor_credentials);
            return !$auth_token ? response()->json(data: [
                'status' => false,
                'message' => 'Username or password incorrect'
            ]) : response()->json(data: [
                'status' => true,
                'student' => Auth::guard('instructor')->user(),
                'authorization' => [
                    'auth_token' => $auth_token,
                    'type' => 'Bearer',
                ]
            ]);
        }
    }
}
