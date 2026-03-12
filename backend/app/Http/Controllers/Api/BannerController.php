<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use Illuminate\Http\Request;

class BannerController extends Controller
{
    // GET /api/banners
    public function index()
    {
        $banners = Banner::active()
                    ->ordered()
                    ->get();
        
        return response()->json([
            'success' => true,
            'data' => $banners
        ]);
    }
}