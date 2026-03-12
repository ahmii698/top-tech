<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProcessStep;
use Illuminate\Http\Request;

class ProcessStepController extends Controller
{
    // GET /api/process-steps
    public function index()
    {
        $steps = ProcessStep::active()
                    ->ordered()
                    ->get();
        
        return response()->json([
            'success' => true,
            'data' => $steps
        ]);
    }
}