<?php

namespace App\Http\Controllers;

use App\Link;
use App\Shortlink;
use Illuminate\Http\Request;
use Auth;

class LinkController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $links = Link::all();
        //authenticates user
        $user = Auth::user();
        //calls on the one to many relationship we made on user Model below User.php
        // public function links()
        $user->links();
        return $user->links()->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
    
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $link = new Link;
        $link->campaign_source = $request->campaign_source;
        $link->campaign_medium = $request->campaign_medium;
        $link->campaign_name = $request->campaign_name;
        $link->campaign_term = $request->campaign_term;
        $link->campaign_content = $request->campaign_content;
        $link->discount_code = $request->discount_code;
        $link->original_content_url = $request->original_content_url;
        $link->original_content_title = $request->original_content_title;
        $link->link_type = $request->link_type;
        $link->user_id = $request->user_id;
        $link->link_url = $request->link_url;

        if($request->link_type != 'custom') {
            $link->original_content_id = $request->original_content_id;
            $link->link_img_url = $request->link_img_url;
        }
        $link->save();
        $shortlink = new Shortlink;
        $shortlink->user_id = $request->user_id;
        $shortlink->link_id = $link->id;
        $shortlink->slug = uniqid();
        $shortlink->save();

        return "Saved Data";
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\link  $link
     * @return \Illuminate\Http\Response
     */
    public function show(link $link)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\link  $link
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $link = Link::find($id);
        return $link;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\link  $link
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $link = Link::find($id);
        $link->campaign_source = $request->campaign_source;
        $link->campaign_medium = $request->campaign_medium;
        $link->campaign_name = $request->campaign_name;
        $link->campaign_term = $request->campaign_term;
        $link->campaign_content = $request->campaign_content;
        $link->discount_code = $request->discount_code;
        $link->original_content_url = $request->original_content_url;
        $link->original_content_title = $request->original_content_title;
        $link->link_type = $request->link_type;
        $link->user_id = $request->user_id;
        $link->link_url = $request->link_url;

        if($request->link_type != 'custom') {
            $link->original_content_id = $request->original_content_id;
            $link->link_img_url = $request->link_img_url;
        }
        
        $link->save();
        return "Updated Data";
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\link  $link
     * @return \Illuminate\Http\Response
     */
    public function destroy(link $link, $id)
    {
        $link = Link::find($id);
        $link->delete();
        return "Link Deleted";
    }
}
