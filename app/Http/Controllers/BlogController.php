<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Blog;

class BlogController extends Controller
{
    public function getBlog()
    {
        $blog = Blog::with('product.image')->get();

        return response()->json($blog);
    }

    public function getSingleBlog($id)
    {
        $blog = Blog::where('blog_id', $id)
            ->with('product.image')
            ->get();

        return response()->json($blog);
    }
}
