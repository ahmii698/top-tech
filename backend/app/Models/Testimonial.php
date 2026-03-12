<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    protected $table = 'testimonials';
    
    protected $fillable = [
        'client_name',
        'client_role',
        'client_company',
        'client_image',
        'testimonial_text',
        'rating',
        'order_number',
        'is_active'
    ];
    
    protected $casts = [
        'rating' => 'integer',
        'is_active' => 'boolean'
    ];
    
    protected $attributes = [
        'is_active' => true,
        'order_number' => 0,
        'rating' => 5
    ];
    
    // Sirf active testimonials
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
    
    // Order by order_number
    public function scopeOrdered($query)
    {
        return $query->orderBy('order_number', 'asc');
    }
    
    // Filter by rating (e.g., 5 star testimonials)
    public function scopeOfRating($query, $rating)
    {
        return $query->where('rating', $rating);
    }
    
    // Sirf high rating (4+ stars)
    public function scopeHighRated($query)
    {
        return $query->where('rating', '>=', 4);
    }
    
    // Get client full name with company
    public function getClientFullNameAttribute()
    {
        if ($this->client_company) {
            return $this->client_name . ', ' . $this->client_company;
        }
        return $this->client_name;
    }
}