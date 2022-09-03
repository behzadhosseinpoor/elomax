<?php

use Illuminate\Support\Facades\Route;
use Laravel\Elomax\Http\Controllers\CacheController;
use Laravel\Elomax\Http\Controllers\HomeController;

Route::prefix('api')->group(function () {
    Route::prefix('caches')->group(function () {
        Route::get('', [CacheController::class, 'index']);
    });
});

Route::get('/{view?}', [HomeController::class, 'index'])->where('view', '(.*)')->name('elomax');


