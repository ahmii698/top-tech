<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    // GET /api/testimonials
    public function index()
    {
        $testimonials = Testimonial::active()
                    ->ordered()
                    ->get();
        
        return response()->json([
            'success' => true,
            'data' => $testimonials
        ]);
    }
}