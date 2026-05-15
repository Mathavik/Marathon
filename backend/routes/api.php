<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\EventController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\AdminAuthController;

use App\Http\Controllers\StudentController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EventRegistrationsController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\PaymentController;

use App\Http\Controllers\GalleryController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\AdvertisementController;
use App\Http\Controllers\Admin\CertificateController;
use App\Http\Controllers\DashboardController;


Route::get('/schools', [StudentController::class, 'getSchools']);

Route::middleware('auth.custom')->group(function () {
    Route::get('/categories', function (Request $request) {
        return "Protected data";
    });
});
use Illuminate\Http\Request; 
Route::middleware('auth.custom')->get('/me', function (Request $request) {
    $token = $request->cookie('token');

    if (!$token) {
        return response()->json(['error' => 'Unauthenticated'], 401);
    }

    $student = \App\Models\Student::where('api_token', $token)->first();

    if (!$student) {
        return response()->json(['error' => 'Invalid token'], 401);
    }

    return $student;
});
// routes/api.php
Route::get('/admin/notifications', function () {
    $admin = \App\Models\Admin::first(); // or auth admin
    return response()->json($admin->notifications);
});

Route::get('/admin/notifications/unread-count', function () {
    $admin = \App\Models\Admin::first();
    return response()->json([
        'count' => $admin->unreadNotifications->count()
    ]);
});

// use Illuminate\Support\Facades\Route;
use App\Models\Admin;

Route::post('/admin/notifications/read', function () {
    $admin = Admin::first(); // later replace with auth()

    $admin->unreadNotifications->markAsRead();

    return response()->json([
        'message' => 'Marked as read'
    ]);
});

// Get all events for a student
Route::get('/student/{id}/events', [EventRegistrationsController::class, 'showEvents']);

// Register student for an event
Route::post('/event/register', [EventRegistrationsController::class, 'registerEvent']);

Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::post('/students', [StudentController::class, 'store']);
// Route::post('/event-register', [EventController::class, 'store']);

Route::get('/events', [EventController::class, 'index']);
Route::post('/events', [EventController::class, 'store']);
Route::get('/events/{id}', [EventController::class, 'show']);
Route::put('/events/{id}', [EventController::class, 'update']);
Route::delete('/events/{id}', [EventController::class, 'destroy']);
Route::post('/events/bulk', [EventController::class, 'bulkStore']);
Route::put('/events/bulk-update', [EventController::class, 'bulkUpdate']);
Route::get('/check-registration', [EventRegistrationsController::class, 'checkRegistration']);
Route::post('/categories/bulk', [CategoryController::class, 'bulkStore']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::post('/categories', [CategoryController::class, 'store']);
Route::get('/categories/{id}', [CategoryController::class, 'show']);
Route::put('/categories/{id}', [CategoryController::class, 'update']);
Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);



Route::post('/register-event', [EventRegistrationsController::class, 'registerEvent']);

Route::get('/payments', [PaymentController::class, 'index']);
Route::post('/payments', [PaymentController::class, 'store']);
Route::get('/payments/{id}', [PaymentController::class, 'show']);
Route::put('/payments/{id}', [PaymentController::class, 'update']);
Route::delete('/payments/{id}', [PaymentController::class, 'destroy']);

Route::post('/admin/login', [AdminAuthController::class, 'login']);
Route::get('/registrations', [StudentController::class, 'getRegistrations']);
Route::post('/team-name', [TeamController::class, 'store']);
Route::get('/team-names', [TeamController::class, 'index']);
Route::get('/team-names/{eventId}', [TeamController::class, 'showByEvent']);
Route::post('/team/register', [TeamController::class, 'registerTeam']);
Route::get('/gallery', [GalleryController::class, 'index']);
Route::post('/gallery', [GalleryController::class, 'store']);

Route::post('/contact', [ContactController::class, 'store']);
Route::get('/contacts', [ContactController::class, 'index']); // admin

Route::get('/event/{id}/students', [EventController::class, 'getEventStudents']);
Route::post('/event/assign-winners', [EventController::class, 'assignWinners']);
Route::get('/event/{id}/certificate', [EventController::class, 'sendCertificates']);
Route::get('/event/{id}/schools-students', [EventController::class, 'eventSchoolStudents']);
Route::get('/event/{id}/schools-students/download', [EventController::class, 'downloadEventSchoolStudents']);

Route::get('/event/{id}/schools', [EventController::class, 'eventSchoolsOnly']);
Route::get('/event/{id}/schools/download', [EventController::class, 'downloadEventSchools']);

Route::get('/school-report', [EventController::class, 'schoolWiseReport']);
Route::get('/school-report/download', [EventController::class, 'downloadSchoolReport']);

Route::post('/ads', [AdvertisementController::class, 'store']); // create
Route::get('/ads/active', [AdvertisementController::class, 'activeAds']); // fetch
Route::post('/ads/{id}', [AdvertisementController::class, 'update']); // update
Route::delete('/ads/{id}', [AdvertisementController::class, 'destroy']); // delete
Route::get('/overall-winners', [EventController::class, 'overallWinners']);
Route::match(['post', 'put'], '/ads/{id}', [AdvertisementController::class, 'update']);
// Route::post('/ads/{id}', [AdvertisementController::class, 'update']);





Route::get('/admin/certificate', [CertificateController::class, 'index']);
Route::post('/admin/certificate', [CertificateController::class, 'store']);
Route::post('/admin/certificate/update', [CertificateController::class, 'update']);
Route::delete('/admin/certificate/delete', [CertificateController::class, 'destroy']);
Route::get('/admin/notification-data', [StudentController::class, 'getNotificationRegistrations']);


Route::get('/chart-data', [DashboardController::class, 'getChartData']);
Route::get('/dashboard-counts', [DashboardController::class, 'getCounts']);
Route::get('/school-student-report/download', [EventController::class, 'downloadSchoolStudentReport']); 

Route::get('/schools', [EventRegistrationsController::class, 'getSchools']);
Route::get('/events-by-school/{school}', [EventRegistrationsController::class, 'getEventsBySchool']);
Route::get('/students-by-event/{event}', [EventRegistrationsController::class, 'getStudentsByEvent']);
Route::get('/download-certificate/{event}/{school}', [EventRegistrationsController::class, 'downloadCertificate']);
