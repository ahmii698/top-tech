<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class AdminController extends Controller
{

    public function index($table)
    {
        $data = DB::table($table)->get();
        return response()->json($data);
    }

    public function show($table, $id)
    {
        $data = DB::table($table)->where('id', $id)->first();
        return response()->json($data);
    }

    public function store(Request $request, $table)
    {
        $id = DB::table($table)->insertGetId($request->all());

        return response()->json([
            "message" => "Record Created",
            "id" => $id
        ]);
    }

    public function update(Request $request, $table, $id)
    {
        DB::table($table)->where('id', $id)->update($request->all());

        return response()->json([
            "message" => "Record Updated"
        ]);
    }

    public function destroy($table, $id)
    {
        DB::table($table)->where('id', $id)->delete();

        return response()->json([
            "message" => "Record Deleted"
        ]);
    }
}