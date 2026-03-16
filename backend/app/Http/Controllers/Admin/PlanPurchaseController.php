<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class PlanPurchaseController extends Controller
{
    public function index()
    {
        $purchases = DB::table('plan_purchases')
                      ->orderBy('created_at', 'desc')
                      ->get();
        
        return response()->json(['data' => $purchases]);
    }

    public function update(Request $request, $id)
    {
        DB::table('plan_purchases')
          ->where('id', $id)
          ->update([
              'status' => $request->status,
              'updated_at' => now()
          ]);
        
        return response()->json(['success' => true]);
    }
}