<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\Student;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use PhpParser\Node\Expr\Array_;


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

    public function assignStudents(Request $request): JsonResponse
    {
        if (isset($request->student_username, $request->course_id)) {
            $student_username = $request->student_username;
            $course_id = $request->course_id;

            // check if student is available
            $student = Student::where('username', $student_username)->first();
            if (!$student->count()) {
                return response()->json([
                    'status' => false,
                    'message' => "Student doesn't exits"
                ]);
            }

            $course = Course::where('code', $course_id)->get();

            // add the new course to enrolled course array
            $student->push('enrolled_courses', json_decode($course));

            // check if students successfully enrolled
            if ($student->save()) {
                return response()->json([
                    'student' => $student->enrolled_courses,
                    'message' => 'Student successfully added to ' . $course_id,
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

    public function createAnnouncement(Request $request): JsonResponse
    {
        if (isset($request->announcement_title, $request->announcement_body, $request->course_id)) {
            $announcement_title = $request->announcement_title;
            $announcement_body = $request->announcement_body;
            $course_id = $request->course_id;

            // get all students enrolled in course_id
            $students = Student::where('enrolled_courses', 'all', [$course_id])->get();

            $check_creation = true;

            // add announcement to all students
            foreach ($students as $student) {
                $student->push('announcements', [
                    'announcement_title' => $announcement_title,
                    'announcement_body' => $announcement_body
                ]);
                if (!$student->save())
                    $check_creation = false;
            }

            // check if announcement created
            if ($check_creation) {
                return response()->json([
                    'status' => true,
                    'message' => 'Announcements successfully created'
                ]);
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'Something went wrong.'
                ]);
            }
        } else {
            return response()->json([
                'status' => false,
                'message' => 'All fields are required'
            ]);
        }
    }

    public function createAssignment(Request $request): JsonResponse
    {
        if (isset($request->assignment_title, $request->assignment_body, $request->course_id)) {
            $assignment_title = $request->assignment_title;
            $assignment_body = $request->assignment_body;
            $course_id = $request->course_id;

            // get all students enrolled in course_id
            $students = Student::where('enrolled_courses', 'all', [$course_id])->get();

            $check_creation = true;

            // add assignment to all students
            foreach ($students as $student) {
                $student->push('assignments', [
                    'assignment_id' => (string)Str::uuid(),
                    'assignment_title' => $assignment_title,
                    'assignment_body' => $assignment_body,
                ]);
                if (!$student->save())
                    $check_creation = false;
            }

            // check if assignment created
            if ($check_creation) {
                return response()->json([
                    'status' => true,
                    'message' => 'Assignment successfully created'
                ]);
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'Something went wrong.'
                ]);
            }
        } else {
            return response()->json([
                'status' => false,
                'message' => 'All fields are required'
            ]);
        }
    }
}
