<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Blog extends Model
{
    use HasFactory;

    protected $table = 'blog';
    protected $primaryKey = 'blog_id';

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'product_id', 'product_id_pkey');
    }
}
