<?php

use App\Http\Controllers\AdminController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentsController;
use App\Http\Controllers\InstructorsController;



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::group(['middleware' => 'api', 'prefix' => 'auth'], function ($router) {
//     Route::post('login', [AuthController::class, 'login'])->name('login');
//     Route::post('register', [AuthController::class, 'register']);
//     Route::post('logout', [AuthController::class, 'logout']);
// });


Route::group(["prefix" => 'v1.0'], function() {
    Route::group(['prefix' => 'student'], function() {
        Route::controller(StudentsController::class)->group(function () {
            Route::post('login', 'login');
            Route::middleware(['auth:student'])->group(function() {
                Route::get('logout', 'logout');
                Route::post('submit_assignment', 'submitAssignment');
                Route::get('courses', 'getEnrolledCourses');
                Route::get('announcements', 'getAnnouncements');
            });
        });
    });
    Route::group(['prefix' => 'admin'], function() {
        Route::controller(AdminController::class)->group(function () {
            Route::post('login', 'login');
            Route::middleware(['auth:admin'])->group(function() {
                Route::get('logout', 'logout');
                Route::post('add_student', 'addStudent');
                Route::post('add_instructor', 'addInstructor');
                Route::post('add_course', 'addCourse');
            });
        });
    });
    Route::group(['prefix' => 'instructor'], function() {
        Route::controller(InstructorsController::class)->group(function () {
            Route::post('login', 'login');
            Route::middleware(['auth:instructor'])->group(function() {
                Route::get('logout', 'logout');
                Route::post('assign_students', 'assignStudents');
                Route::post('create_assignment', 'createAssignment');
                Route::post('create_announcement', 'createAnnouncement');
            });
        });
    });
});
