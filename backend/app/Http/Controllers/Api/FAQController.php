<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FAQ;
use Illuminate\Http\Request;

class FAQController extends Controller
{
    // GET /api/faqs
    public function index(Request $request)
    {
        $query = FAQ::active()->ordered();
        
        // Filter by category
        if($request->has('category')) {
            $query->ofCategory($request->category);
        }
        
        $faqs = $query->get();
        
        return response()->json([
            'success' => true,
            'data' => $faqs
        ]);
    }
}