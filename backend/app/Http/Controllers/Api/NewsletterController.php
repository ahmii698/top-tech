<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\NewsletterSubscriber;
use Illuminate\Http\Request;

class NewsletterController extends Controller
{
    // POST /api/newsletter
    public function store(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|unique:newsletter_subscribers,email'
        ]);
        
        $subscriber = NewsletterSubscriber::create($validated);
        
        return response()->json([
            'success' => true,
            'message' => 'Subscribed successfully!',
            'data' => $subscriber
        ]);
    }
}