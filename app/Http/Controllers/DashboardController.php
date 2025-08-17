<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Goat;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    /**
     * Display the dashboard with farm overview.
     */
    public function index()
    {
        // Statistik kambing
        $totalGoats = Goat::count();
        $healthyGoats = Goat::where('status', 'sehat')->count();
        $sickGoats = Goat::where('status', 'sakit')->count();
        $soldGoats = Goat::where('status', 'dijual')->count();

        // Statistik keuangan bulan ini
        $currentMonth = Carbon::now()->startOfMonth();
        $monthlyIncome = Transaction::where('type', 'pemasukan')
            ->where('transaction_date', '>=', $currentMonth)
            ->sum('amount');
        
        $monthlyExpense = Transaction::where('type', 'pengeluaran')
            ->where('transaction_date', '>=', $currentMonth)
            ->sum('amount');

        $monthlyProfit = $monthlyIncome - $monthlyExpense;

        // Total nilai inventaris (harga beli kambing yang masih hidup)
        $inventoryValue = Goat::whereIn('status', ['sehat', 'sakit'])
            ->sum('purchase_price');

        // Transaksi terbaru
        $recentTransactions = Transaction::with('goat')
            ->latest('transaction_date')
            ->limit(5)
            ->get();

        // Data untuk grafik income vs expense (6 bulan terakhir)
        $monthlyData = [];
        for ($i = 5; $i >= 0; $i--) {
            $month = Carbon::now()->subMonths($i);
            $monthStart = $month->copy()->startOfMonth();
            $monthEnd = $month->copy()->endOfMonth();
            
            $income = Transaction::where('type', 'pemasukan')
                ->whereBetween('transaction_date', [$monthStart, $monthEnd])
                ->sum('amount');
            
            $expense = Transaction::where('type', 'pengeluaran')
                ->whereBetween('transaction_date', [$monthStart, $monthEnd])
                ->sum('amount');

            $monthlyData[] = [
                'month' => $month->format('M Y'),
                'income' => (float) $income,
                'expense' => (float) $expense,
                'profit' => (float) ($income - $expense)
            ];
        }

        return Inertia::render('dashboard', [
            'stats' => [
                'totalGoats' => $totalGoats,
                'healthyGoats' => $healthyGoats,
                'sickGoats' => $sickGoats,
                'soldGoats' => $soldGoats,
                'monthlyIncome' => (float) $monthlyIncome,
                'monthlyExpense' => (float) $monthlyExpense,
                'monthlyProfit' => (float) $monthlyProfit,
                'inventoryValue' => (float) $inventoryValue,
            ],
            'recentTransactions' => $recentTransactions,
            'monthlyData' => $monthlyData,
        ]);
    }
}