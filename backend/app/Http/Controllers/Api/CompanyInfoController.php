<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CompanyInfo;
use Illuminate\Http\Request;

class CompanyInfoController extends Controller
{
    // GET /api/company-info
    public function index()
    {
        $info = CompanyInfo::first();
        
        return response()->json([
            'success' => true,
            'data' => $info
        ]);
    }
}