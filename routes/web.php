<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/test/enva', function () {
    dd(env('DB_USERNAME')); // dump db variable value one by one
});

Route::get('/', function () {
    return view('welcome');
});

Route::get('/app', function () {
    return view('home');
})->middleware(['auth.shopify'])->name('home');

//This will redirect user to login page.
Route::get('/login', function () {
    if (Auth::user()) {
    return redirect()->route('home');
    }
    return view('login');
})->name('login');

Route::get('/app/{path}', [
    'uses' => 'DashboardController@index',
    'as' => 'dashboard',
    'where' => ['path' => '.*']
]);