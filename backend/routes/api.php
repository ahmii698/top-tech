<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Controllers
|--------------------------------------------------------------------------
*/

use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\TeamController;
use App\Http\Controllers\Api\TestimonialController;
use App\Http\Controllers\Api\PortfolioController;
use App\Http\Controllers\Api\PricingController;
use App\Http\Controllers\Api\FAQController;
use App\Http\Controllers\Api\BannerController;
use App\Http\Controllers\Api\FeatureController;
use App\Http\Controllers\Api\ProcessStepController;
use App\Http\Controllers\Api\StatisticController;
use App\Http\Controllers\Api\CompanyInfoController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\NewsletterController;
use App\Http\Controllers\Api\SettingController;
use App\Http\Controllers\Api\TechnologyController;
use App\Http\Controllers\Api\AuthController;

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\AppointmentController;
use App\Http\Controllers\Admin\PlanPurchaseController;
use App\Http\Controllers\PlanPurchaseController as FrontPlanPurchaseController;
use App\Http\Controllers\Admin\EmailController;

/*
|--------------------------------------------------------------------------
| 🔥 ADMIN EMAIL ROUTES
|--------------------------------------------------------------------------
*/

// Generic email route
//Route::post('/send-email', [AdminController::class, 'sendEmail']);

// NEW: Specific routes for appointments and plan orders
Route::middleware('auth:sanctum')->group(function () {
    // Appointments email route
    Route::post('/admin/appointments/{id}/send-email', [EmailController::class, 'sendAppointmentEmail']);
    
    // Plan Orders email route  
    Route::post('/admin/plan-orders/{id}/send-email', [EmailController::class, 'sendPlanOrderEmail']);
});

/*
|--------------------------------------------------------------------------
| ✅ APPOINTMENT BOOKING ROUTE
|--------------------------------------------------------------------------
*/

Route::post('/appointments', [AppointmentController::class, 'store']);

/*
|--------------------------------------------------------------------------
| ADMIN EMAIL ACTION FOR APPOINTMENTS (Legacy - keep for compatibility)
|--------------------------------------------------------------------------
*/

Route::post('/admin/appointments/{id}/email', [AppointmentController::class, 'sendEmail']);

/*
|--------------------------------------------------------------------------
| PUBLIC WEBSITE API
|--------------------------------------------------------------------------
*/

Route::get('/services', [ServiceController::class, 'index']);
Route::get('/team', [TeamController::class, 'index']);
Route::get('/testimonials', [TestimonialController::class, 'index']);
Route::get('/portfolio', [PortfolioController::class, 'index']);
Route::get('/pricing', [PricingController::class, 'index']);
Route::get('/faqs', [FAQController::class, 'index']);
Route::get('/banners', [BannerController::class, 'index']);
Route::get('/features', [FeatureController::class, 'index']);
Route::get('/process-steps', [ProcessStepController::class, 'index']);
Route::get('/statistics', [StatisticController::class, 'index']);
Route::get('/company-info', [CompanyInfoController::class, 'index']);
Route::get('/settings', [SettingController::class, 'index']);

/*
|--------------------------------------------------------------------------
| TECHNOLOGY ROUTES
|--------------------------------------------------------------------------
*/

Route::prefix('technologies')->group(function () {

    Route::get('/', [TechnologyController::class, 'index']);
    Route::get('/active', [TechnologyController::class, 'getActiveTechnologies']);
    Route::get('/categories', [TechnologyController::class, 'getCategories']);
    Route::get('/{id}', [TechnologyController::class, 'show']);

    Route::post('/', [TechnologyController::class, 'store']);
    Route::put('/{id}', [TechnologyController::class, 'update']);
    Route::delete('/{id}', [TechnologyController::class, 'destroy']);

    Route::patch('/{id}/toggle-status', [TechnologyController::class, 'toggleStatus']);
});

/*
|--------------------------------------------------------------------------
| CONTACT & NEWSLETTER
|--------------------------------------------------------------------------
*/

Route::post('/contact', [ContactController::class, 'store']);
Route::post('/newsletter', [NewsletterController::class, 'store']);

/*
|--------------------------------------------------------------------------
| ADMIN LOGIN
|--------------------------------------------------------------------------
*/

Route::post('/admin-login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| 🚨 ADMIN GENERIC CRUD (HAMESHA NEECHAY RAKHO)
|--------------------------------------------------------------------------
*/

Route::prefix('admin')->group(function () {

    Route::get('/{table}', [AdminController::class, 'index']);
    Route::get('/{table}/{id}', [AdminController::class, 'show']);
    Route::post('/{table}', [AdminController::class, 'store']);
    Route::put('/{table}/{id}', [AdminController::class, 'update']);
    Route::delete('/{table}/{id}', [AdminController::class, 'destroy']);

});

/*
|--------------------------------------------------------------------------
| PLAN PURCHASE
|--------------------------------------------------------------------------
*/

Route::post('/plan-purchase', [FrontPlanPurchaseController::class, 'store']);

/*
|--------------------------------------------------------------------------
| PRICING DATA
|--------------------------------------------------------------------------
*/

Route::get('/pricing-plans', function() {
    $plans = DB::table('pricing_plans')
               ->where('is_active', 1)
               ->orderBy('order_number')
               ->get();

    return response()->json(['data' => $plans]);
});

Route::get('/pricing-features', function() {
    $features = DB::table('pricing_features')->get();

    return response()->json(['data' => $features]);
});

/*
|--------------------------------------------------------------------------
| 🔐 ADMIN PLAN PURCHASES
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/admin/plan-purchases', [PlanPurchaseController::class, 'index']);
    Route::put('/admin/plan-purchases/{id}', [PlanPurchaseController::class, 'update']);
});

/*
|--------------------------------------------------------------------------
| FORGOT PASSWORD
|--------------------------------------------------------------------------
*/

Route::post('/forgot-password', [App\Http\Controllers\ForgotPasswordController::class, 'sendOtp']);
Route::post('/verify-otp', [App\Http\Controllers\ForgotPasswordController::class, 'verifyOtp']);
Route::post('/reset-password', [App\Http\Controllers\ForgotPasswordController::class, 'resetPassword']);

/*
|--------------------------------------------------------------------------
| 📧 SEND EMAIL ROUTE (No auth required for testing)
|--------------------------------------------------------------------------
*/

Route::post('/send-email', [App\Http\Controllers\Admin\EmailController::class, 'sendEmail']);