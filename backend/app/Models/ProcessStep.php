<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProcessStep extends Model
{
    protected $table = 'process_steps';
    
    protected $fillable = [
        'step_number',
        'title',
        'description',
        'icon_name',
        'order_number',
        'is_active'
    ];
    
    protected $attributes = [
        'is_active' => true,
        'order_number' => 0
    ];
    
    // Sirf active steps
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
    
    // Order by order_number
    public function scopeOrdered($query)
    {
        return $query->orderBy('order_number', 'asc');
    }
    
    // Step number ke hisaab se order (01, 02, 03)
    public function scopeStepOrdered($query)
    {
        return $query->orderBy('step_number', 'asc');
    }
}