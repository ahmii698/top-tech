<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Portfolio;
use Illuminate\Http\Request;

class PortfolioController extends Controller
{
    public function index(Request $request)
    {
        $query = Portfolio::with('technologies')->where('is_active', true);
        
        // Filter by category
        if ($request->has('category') && $request->category != 'all') {
            $query->where('category', $request->category);
        }
        
        // Filter by featured
        if ($request->has('featured')) {
            $query->where('is_featured', $request->featured);
        }
        
        $portfolio = $query->orderBy('order_number')->get();
        
        return response()->json([
            'success' => true,
            'data' => $portfolio
        ]);
    }
    
    public function show($id)
    {
        $portfolio = Portfolio::with('technologies')->find($id);
        
        if (!$portfolio) {
            return response()->json([
                'success' => false,
                'message' => 'Portfolio item not found'
            ], 404);
        }
        
        return response()->json([
            'success' => true,
            'data' => $portfolio
        ]);
    }
}