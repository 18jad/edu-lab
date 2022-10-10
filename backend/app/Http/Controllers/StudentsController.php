<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\Student;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;


class StudentsController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'error' => $validator->errors()
            ]);
        } else {
            $student_credentials = $request->only('username', 'password');
            $auth_token = Auth::guard('student')->attempt($student_credentials);
                return !$auth_token ? response()->json([
                    'status' => false,
                    'message' => 'Username or password incorrect'
                ]) : response()->json([
                    'status' => true,
                    'student' => Auth::guard('student')->user(),
                    'authorization' => [
                        'auth_token' => $auth_token,
                        'type' => 'Bearer',
                    ]
                ]);
        }
    }
}
