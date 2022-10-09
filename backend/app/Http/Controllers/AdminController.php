<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;

class AdminController extends Controller
{
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
