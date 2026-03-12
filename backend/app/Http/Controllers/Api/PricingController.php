<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PricingPlan;
use Illuminate\Http\Request;

class PricingController extends Controller
{
    // GET /api/pricing
    public function index()
    {
        $plans = PricingPlan::with('features')
                    ->active()
                    ->ordered()
                    ->get();
        
        return response()->json([
            'success' => true,
            'data' => $plans
        ]);
    }
    
    // GET /api/pricing/{id}
    public function show($id)
    {
        $plan = PricingPlan::with('features')->find($id);
        
        if(!$plan) {
            return response()->json([
                'success' => false,
                'message' => 'Pricing plan not found'
            ], 404);
        }
        
        return response()->json([
            'success' => true,
            'data' => $plan
        ]);
    }
}