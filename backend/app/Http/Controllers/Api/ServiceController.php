<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    // GET /api/services - Saari services lao
    public function index()
    {
        $services = Service::with('features')
                    ->active()
                    ->ordered()
                    ->get();
        
        return response()->json([
            'success' => true,
            'data' => $services
        ]);
    }
    
    // GET /api/services/{id} - Ek specific service
    public function show($id)
    {
        $service = Service::with('features')->find($id);
        
        if(!$service) {
            return response()->json([
                'success' => false,
                'message' => 'Service not found'
            ], 404);
        }
        
        return response()->json([
            'success' => true,
            'data' => $service
        ]);
    }
}