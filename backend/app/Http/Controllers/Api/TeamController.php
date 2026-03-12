<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TeamMember;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    // GET /api/team
    public function index()
    {
        $team = TeamMember::active()
                    ->ordered()
                    ->get();
        
        return response()->json([
            'success' => true,
            'data' => $team
        ]);
    }
    
    // GET /api/team/{id}
    public function show($id)
    {
        $member = TeamMember::find($id);
        
        if(!$member) {
            return response()->json([
                'success' => false,
                'message' => 'Team member not found'
            ], 404);
        }
        
        return response()->json([
            'success' => true,
            'data' => $member
        ]);
    }
}