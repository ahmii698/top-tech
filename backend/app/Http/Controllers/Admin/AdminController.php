<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class AdminController extends Controller
{

    public function index($table)
    {
        try {
            $data = DB::table($table)->get();
            return response()->json([
                'data' => $data
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Table not found: ' . $table
            ], 404);
        }
    }

    public function show($table, $id)
    {
        try {
            $data = DB::table($table)->where('id', $id)->first();
            if (!$data) {
                return response()->json([
                    'error' => 'Record not found'
                ], 404);
            }
            return response()->json([
                'data' => $data
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Table not found: ' . $table
            ], 404);
        }
    }

    public function store(Request $request, $table)
    {
        try {
            $id = DB::table($table)->insertGetId($request->all());

            return response()->json([
                "success" => true,
                "message" => "Record Created",
                "id" => $id
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "success" => false,
                "error" => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $table, $id)
    {
        try {
            DB::table($table)->where('id', $id)->update($request->all());

            return response()->json([
                "success" => true,
                "message" => "Record Updated"
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "success" => false,
                "error" => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($table, $id)
    {
        try {
            DB::table($table)->where('id', $id)->delete();

            return response()->json([
                "success" => true,
                "message" => "Record Deleted"
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "success" => false,
                "error" => $e->getMessage()
            ], 500);
        }
    }
}