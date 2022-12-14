<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\Course;
use App\Models\Instructor;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
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
            $admin_credentials = $request->only('username', 'password');
            $auth_token = Auth::guard('admin')->attempt($admin_credentials);
            return !$auth_token ? response()->json([
                'status' => false,
                'message' => 'Username or password incorrect'
            ]) : response()->json([
                'status' => true,
                'message' => 'Successfully logged in',
                'admin' => Auth::guard('admin')->user(),
                'authorization' => [
                    'auth_token' => $auth_token,
                    'type' => 'Bearer',
                ]
            ]);
        }
    }

    public function addStudent(Request $request): JsonResponse
    {
        $student = new Student;
        if (isset($request->name, $request->username, $request->password)) {
            $already_exists = Student::where('username', $request->username);

            // check if student user already exists
            if($already_exists->count()) {
                return response()->json([
                    'message' => 'Student username already exists',
                    'status' => false,
                ]);
            }

            $student->name = $request->name;
            $student->username = $request->username;
            $student->password = bcrypt($request->password);

            if($student->save()) {
                return response()->json([
                    'student' => $student,
                    'message' => 'Student successfully created',
                    'status' => true,
                ]);
            } else {
                return response()->json([
                    'message' => 'Something is missing.',
                    'status' => false,
                ]);
            }
        } else {
            return response()->json([
                'status' => false,
                'message' => 'All fields are required',
            ]);
        }
    }

    public function addInstructor(Request $request): JsonResponse
    {
        $instructor = new Instructor;
        if (isset($request->name, $request->username, $request->password, $request->course)) {
            $already_exists = Student::where('username', $request->username);

            // check if instructor user already exists
            if($already_exists->count()) {
                return response()->json([
                    'instructor' => 'Instructor username already exists',
                    'status' => false,
                ]);
            }

            $instructor->name = $request->name;
            $instructor->username = $request->username;
            $instructor->password = bcrypt($request->password);
            $instructor->assigned_course = $request->course;
        } else {
            return response()->json([
                'status' => false,
                'message' => 'All fields are required',
             ]);
        }

        if($instructor->save()) {
            return response()->json([
                'instructor' => $instructor,
                'message' => 'Instructor successfully created',
                'status' => true,
            ]);
        } else {
            return response()->json([
                'message' => 'Something went wrong.',
                'status' => false,
            ]);
        }
    }

    public function addCourse(Request $request): JsonResponse
    {
        $course = new Course;
        if (isset($request->name, $request->code)) {
            $already_exists = Student::where('code', $request->code);

            // check if the course already exists
            if($already_exists->count()) {
                return response()->json([
                    'course' => 'Course already exists',
                    'status' => false,
                ]);
            }

            $course->name = $request->name;
            $course->code = $request->code;
        } else {
            return response()->json([
                'status' => false,
                'message' => 'All fields are required',
            ]);
        }

        if($course->save()) {
            return response()->json([
                'course' => $course,
                'message' => 'Course successfully created',
                'status' => true,
            ]);
        } else {
            return response()->json([
                'message' => 'Something went wrong.',
                'status' => false,
            ]);
        }
    }

    public function getStudents(): JsonResponse
    {
        $students = Student::all();
        return response()->json([
            'status' => (bool)$students,
            'students' => $students ?: "No students available",
        ]);
    }

    public function getInstructors(): JsonResponse
    {
        $instructors = Instructor::all();
        return response()->json([
            'status' => (bool)$instructors,
            'instructors' => $instructors ?: "No instructors available",
        ]);
    }

    public function getCourses(): JsonResponse
    {
        $courses = Course::all();
        return response()->json([
            'status' => (bool)$courses,
            'courses' => $courses ?: "No courses available",
        ]);
    }
}
