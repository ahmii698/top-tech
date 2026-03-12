<?php

use Illuminate\Support\Facades\Route;

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
| ADMIN LOGIN API
|--------------------------------------------------------------------------
*/

// routes/api.php
Route::post('/admin-login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| ADMIN PANEL GENERIC CRUD
|--------------------------------------------------------------------------
*/

Route::prefix('admin')->group(function () {

    Route::get('/{table}', [AdminController::class, 'index']);
    Route::get('/{table}/{id}', [AdminController::class, 'show']);
    Route::post('/{table}', [AdminController::class, 'store']);
    Route::put('/{table}/{id}', [AdminController::class, 'update']);
    Route::delete('/{table}/{id}', [AdminController::class, 'destroy']);

});