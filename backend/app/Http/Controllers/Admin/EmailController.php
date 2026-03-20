<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\AppointmentResponseMail;

class EmailController extends Controller
{
    public function sendAppointmentEmail(Request $request, $id)
    {
        try {
            $appointment = Appointment::findOrFail($id);
            
            $request->validate([
                'subject' => 'required|string',
                'response_message' => 'required|string',
                'status' => 'nullable|string'
            ]);

            // Update status if provided
            if ($request->has('status') && $request->status) {
                $appointment->status = $request->status;
                $appointment->save();
            }

            // Prepare email data
            $emailData = [
                'to_name' => $appointment->full_name,
                'to_email' => $appointment->email,
                'subject' => $request->subject,
                'message_body' => $request->response_message,
                'appointment_date' => $appointment->appointment_date,
                'appointment_time' => $appointment->appointment_time,
                'status' => $appointment->status
            ];

            // Send email
            Mail::to($appointment->email)->send(new AppointmentResponseMail($emailData));

            return response()->json([
                'success' => true,
                'message' => 'Email sent successfully to ' . $appointment->email
            ]);

        } catch (\Exception $e) {
            \Log::error('Email sending failed: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to send email: ' . $e->getMessage()
            ], 500);
        }
    }
}