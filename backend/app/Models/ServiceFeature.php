<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ServiceFeature extends Model
{
    protected $table = 'service_features';
    
    protected $fillable = [
        'service_id',
        'feature'
    ];
    
    // Relationship - Ye feature kis service ka hai
    public function service()
    {
        return $this->belongsTo(Service::class, 'service_id');
    }
    
    // Kisi specific service ke features lane ke liye
    public function scopeOfService($query, $serviceId)
    {
        return $query->where('service_id', $serviceId);
    }
}