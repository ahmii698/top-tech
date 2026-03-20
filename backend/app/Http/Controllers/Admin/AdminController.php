<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
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

    /*
    |--------------------------------------------------------------------------
    | 🔥 SEND EMAIL FUNCTION (IMPORTANT)
    |--------------------------------------------------------------------------
    */

   public function sendEmail(Request $request)
{
    try {

        $name = $request->name ?? 'User';
        $email = $request->email ?? null;
        $messageText = $request->message ?? 'No Message';

        if (!$email) {
            return response()->json([
                'success' => false,
                'error' => 'Email is required'
            ], 400);
        }

        Mail::raw(
            "Hello $name,\n\nThank you for contacting us!\n\nWe received your message:\n$messageText\n\nOur team will contact you soon.\n\n- TopTech Team",
            function ($message) use ($email) {
                $message->to($email) // ✅ USER EMAIL
                        ->subject('Thank You for Contacting Us');
            }
        );

        return response()->json([
            'success' => true,
            'message' => 'Email sent to user successfully'
        ]);

    } catch (\Exception $e) {

        return response()->json([
            'success' => false,
            'error' => $e->getMessage()
        ], 500);
    }
}
}