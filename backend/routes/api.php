<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\EventController;

use App\Http\Controllers\PaymentController;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\MarathonRegistrationController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\AdvertisementController;
use App\Http\Controllers\Admin\CertificateController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EventHighlightController;
use App\Http\Controllers\HeroSectionController;

// REGISTER
Route::post('/register', [MarathonRegistrationController::class, 'store']);
Route::post('/marathon/register', [MarathonRegistrationController::class, 'store']);

// LOGIN
Route::post('/login', [AuthController::class, 'login']);

// LOGOUT
Route::post('/logout', [AuthController::class, 'logout']);
Route::post('/students', [StudentController::class, 'store']);
// Route::post('/event-register', [EventController::class, 'store']);

Route::get('/events', [EventController::class, 'index']);
Route::get('/hero', [EventController::class, 'hero']);
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




Route::post('/payment/create-order', [PaymentController::class, 'createOrder']);

Route::post('/payment/verify', [PaymentController::class, 'verifyPayment']);

Route::post('/register-event', [EventController::class, 'registerEvent']);

Route::get('/chart-data', [DashboardController::class, 'getChartData']);
Route::get('/dashboard-counts', [DashboardController::class, 'getCounts']);
Route::get('/school-student-report/download', [EventController::class, 'downloadSchoolStudentReport']); 

Route::get('/schools', [EventRegistrationsController::class, 'getSchools']);
Route::get('/events-by-school/{school}', [EventRegistrationsController::class, 'getEventsBySchool']);
Route::get('/students-by-event/{event}', [EventRegistrationsController::class, 'getStudentsByEvent']);
Route::get('/download-certificate/{event}/{school}', [EventRegistrationsController::class, 'downloadCertificate']);



Route::get('/hero-section', [HeroSectionController::class, 'index']);
Route::post('/hero-section', [HeroSectionController::class, 'store']);


Route::get('/event-highlights', [EventHighlightController::class, 'index']);

Route::post('/event-highlights', [EventHighlightController::class, 'store']);

use App\Http\Controllers\MarathonCategoryController;

Route::get('/marathon-category', [MarathonCategoryController::class, 'index']);
Route::post('/marathon-category', [MarathonCategoryController::class, 'store']);