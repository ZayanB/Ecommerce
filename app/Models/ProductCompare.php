<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductCompare extends Model
{
    use HasFactory;

    protected $table = 'compare_items';
    protected $primaryKey = 'comapre_items_id_pkey';

    protected $fillable = ([
        'user_id',
        'product_id',
    ]);

    public $timestamps = true;

    public function user(): BelongsTo
    {
        return $this->belongsTo(UserInfo::class, 'user_id', 'user_id_pkey');
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'product_id', 'product_id_pkey');
    }
}
