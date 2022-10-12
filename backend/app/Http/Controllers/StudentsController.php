<?php

namespace App\Http\Controllers;

use App\Models\Course;
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
                'message' => 'Successfully logged in',
                'student' => Auth::guard('student')->user(),
                'authorization' => [
                    'auth_token' => $auth_token,
                    'type' => 'Bearer',
                ]
            ]);
        }
    }

    public function submitAssignment(Request $request): JsonResponse
    {
        if (isset($request->assignment_id)) {
            $assignment_id = $request->assignment_id;

            $remove_assignment = Student::where('_id', Auth::id())->where('assignments.assignment_id', $assignment_id)->pull('assignments', ['assignment_id' => $assignment_id]);

            if ($remove_assignment) {
                return response()->json([
                    'status' => true,
                    'message' => 'Assignment successfully submitted!',
                    'student' => Student::where('_id', Auth::id())->get()
                ]);
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'Method unavailable. Try again later',
                    'student' => Student::where('_id', Auth::id())->get()
                ]);
            }
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Assignment file is required',
            ]);
        }
    }

    public function getEnrolledCourses(): JsonResponse
    {
        return response()->json([
            'status' => true,
            'message' => 'Enrolled courses successfully retrieved',
            'courses' => Student::select('enrolled_courses')->where('_id', Auth::id())->get()
        ]);
    }

    public function getAnnouncements(): JsonResponse
    {
        $announcements = Student::select('announcements')->where('_id', Auth::id())->get();
        return $announcements ? response()->json([
            'status' => true,
            'message' => 'Announcements successfully retrieved',
            'announcements' => $announcements
        ]) : response()->json([
            'status' => false,
            'message' => 'Something went wrong',
        ]);
    }

    public function getAssignments(): JsonResponse
    {
        $assignments = Student::select('assignments')->where('_id', Auth::id())->get();
        return response()->json([
            'status' => (bool)$assignments,
            'assignments' => $assignments ?: "No assignments available",
        ]);
    }
}
