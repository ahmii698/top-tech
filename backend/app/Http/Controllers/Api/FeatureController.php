<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Feature;
use Illuminate\Http\Request;

class FeatureController extends Controller
{
    // GET /api/features
    public function index()
    {
        $features = Feature::active()
                    ->ordered()
                    ->get();
        
        return response()->json([
            'success' => true,
            'data' => $features
        ]);
    }
}