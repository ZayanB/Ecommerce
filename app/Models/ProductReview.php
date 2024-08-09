<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductReview extends Model
{
    use HasFactory;

    protected $table = 'product_review';
    protected $primaryKey = 'product_review_id_pkey';

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'product_id', 'product_id_pkey');
    }
    public function user(): BelongsTo
    {
        return $this->belongsTo(UserInfo::class, 'user_id', 'user_id_pkey');
    }

    protected $fillable = [
        'product_rating',
        'product_review_description',
        'user_id',
        'product_id'
    ];


    public $timestamps = true;
}
