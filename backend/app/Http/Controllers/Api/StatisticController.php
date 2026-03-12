<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Statistic;
use Illuminate\Http\Request;

class StatisticController extends Controller
{
    // GET /api/statistics
    public function index()
    {
        $stats = Statistic::active()
                    ->ordered()
                    ->get();
        
        return response()->json([
            'success' => true,
            'data' => $stats
        ]);
    }
}