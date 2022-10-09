<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{

    public function login(Request $request): \Illuminate\Http\JsonResponse
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
            $admin_credentials = $request->only('username', 'password');
            $auth_token = Auth::attempt($admin_credentials);
            return !$auth_token ? response()->json([
                'status' => false,
                'message' => 'Username or password incorrect'
            ]) : response()->json([
                'status' => true,
                'admin' => Auth::user(),
                'authorization' => [
                    'auth_token' => $auth_token,
                    'type' => 'Bearer',
                ]
            ]);
        }
    }

    public function addStudent(Request $request): \Illuminate\Http\JsonResponse
    {
        $student = new Student;
        if (isset($request->name, $request->username, $request->password)) {
            $already_exists = Student::where('username', $request->username);

            if($already_exists) {
                return response()->json([
                    'student' => 'Student username already exists',
                    'success' => false,
                ]);
            }

            $student->name = $request->name;
            $student->username = $request->username;
            $student->password = bcrypt($request->password);
        }


        if($student->save()) {
            return response()->json([
                'student' => $student,
                'success' => true,
            ]);
        } else {
            return response()->json([
                'student' => $student,
                'success' => false,
            ]);
        }
    }
}
