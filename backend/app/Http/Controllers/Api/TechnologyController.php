<?php
namespace App\Http\Controllers\Api;

use App\Models\Technology;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TechnologyController extends Controller
{
    /**
     * Display a listing of all technologies (for admin panel)
     */
    public function index()
    {
        $technologies = Technology::orderBy('display_order')->get();
        return response()->json([
            'success' => true,
            'data' => $technologies
        ]);
    }

    /**
     * Get active technologies grouped by category (for frontend)
     */
    public function getActiveTechnologies()
    {
        $technologies = Technology::where('is_active', true)
            ->orderBy('display_order')
            ->get()
            ->groupBy('category');
        
        return response()->json([
            'success' => true,
            'data' => $technologies
        ]);
    }

    /**
     * Store a newly created technology
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|max:100',
            'icon' => 'required|max:50',
            'category' => 'required|max:50',
            'display_order' => 'nullable|integer',
            'is_active' => 'nullable|boolean'
        ]);

        $technology = Technology::create([
            'name' => $validated['name'],
            'icon' => $validated['icon'],
            'category' => $validated['category'],
            'display_order' => $validated['display_order'] ?? 0,
            'is_active' => $validated['is_active'] ?? true
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Technology created successfully',
            'data' => $technology
        ], 201);
    }

    /**
     * Display the specified technology
     */
    public function show($id)
    {
        $technology = Technology::find($id);

        if (!$technology) {
            return response()->json([
                'success' => false,
                'message' => 'Technology not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $technology
        ]);
    }

    /**
     * Update the specified technology
     */
    public function update(Request $request, $id)
    {
        $technology = Technology::find($id);

        if (!$technology) {
            return response()->json([
                'success' => false,
                'message' => 'Technology not found'
            ], 404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|max:100',
            'icon' => 'sometimes|max:50',
            'category' => 'sometimes|max:50',
            'display_order' => 'nullable|integer',
            'is_active' => 'nullable|boolean'
        ]);

        $technology->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Technology updated successfully',
            'data' => $technology
        ]);
    }

    /**
     * Remove the specified technology
     */
    public function destroy($id)
    {
        $technology = Technology::find($id);

        if (!$technology) {
            return response()->json([
                'success' => false,
                'message' => 'Technology not found'
            ], 404);
        }

        $technology->delete();

        return response()->json([
            'success' => true,
            'message' => 'Technology deleted successfully'
        ]);
    }

    /**
     * Toggle technology active status
     */
    public function toggleStatus($id)
    {
        $technology = Technology::find($id);

        if (!$technology) {
            return response()->json([
                'success' => false,
                'message' => 'Technology not found'
            ], 404);
        }

        $technology->is_active = !$technology->is_active;
        $technology->save();

        return response()->json([
            'success' => true,
            'message' => 'Status updated successfully',
            'is_active' => $technology->is_active
        ]);
    }

    /**
     * Get all categories
     */
    public function getCategories()
    {
        $categories = Technology::select('category')
            ->distinct()
            ->orderBy('category')
            ->pluck('category');

        return response()->json([
            'success' => true,
            'data' => $categories
        ]);
    }
}