<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GoatController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\ReportController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Welcome page - showcase the app
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Authenticated routes
Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard (main farm overview)
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Goat management
    Route::resource('goats', GoatController::class);
    
    // Transaction management
    Route::resource('transactions', TransactionController::class);
    
    // Financial reports
    Route::get('reports', [ReportController::class, 'index'])->name('reports.index');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
