<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use App\Models\Goat;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class ReportController extends Controller
{
    /**
     * Display financial reports.
     */
    public function index(Request $request)
    {
        $startDate = $request->get('start_date', Carbon::now()->startOfYear()->format('Y-m-d'));
        $endDate = $request->get('end_date', Carbon::now()->format('Y-m-d'));

        // Validasi tanggal
        $start = Carbon::parse($startDate);
        $end = Carbon::parse($endDate);

        // Laporan Laba Rugi
        $incomeByCategory = Transaction::where('type', 'pemasukan')
            ->whereBetween('transaction_date', [$start, $end])
            ->selectRaw('category, SUM(amount) as total')
            ->groupBy('category')
            ->get()
            ->pluck('total', 'category');

        $expenseByCategory = Transaction::where('type', 'pengeluaran')
            ->whereBetween('transaction_date', [$start, $end])
            ->selectRaw('category, SUM(amount) as total')
            ->groupBy('category')
            ->get()
            ->pluck('total', 'category');

        $totalIncome = $incomeByCategory->sum();
        $totalExpense = $expenseByCategory->sum();
        $netProfit = $totalIncome - $totalExpense;

        // Neraca Sederhana
        $totalCash = Transaction::selectRaw('
            SUM(CASE WHEN type = "pemasukan" THEN amount ELSE 0 END) - 
            SUM(CASE WHEN type = "pengeluaran" THEN amount ELSE 0 END) as balance
        ')->value('balance') ?: 0;

        $inventoryValue = Goat::whereIn('status', ['sehat', 'sakit'])
            ->sum('purchase_price') ?: 0;

        $totalAssets = $totalCash + $inventoryValue;

        // Modal awal (dari transaksi modal_awal)
        $initialCapital = Transaction::where('category', 'modal_awal')->sum('amount') ?: 0;
        $retainedEarnings = $totalCash - $initialCapital;

        // Kategori labels untuk tampilan
        $categoryLabels = [
            'penjualan_kambing' => 'Penjualan Kambing',
            'penjualan_susu' => 'Penjualan Susu',
            'pembelian_kambing' => 'Pembelian Kambing',
            'pembelian_pakan' => 'Pembelian Pakan',
            'biaya_kesehatan' => 'Biaya Kesehatan',
            'biaya_operasional' => 'Biaya Operasional',
            'modal_awal' => 'Modal Awal',
            'lainnya' => 'Lainnya',
        ];

        return Inertia::render('reports/index', [
            'dateRange' => [
                'start_date' => $startDate,
                'end_date' => $endDate,
            ],
            'profitLoss' => [
                'income' => $incomeByCategory->map(function ($amount, $category) use ($categoryLabels) {
                    return [
                        'category' => $category,
                        'label' => $categoryLabels[$category] ?? $category,
                        'amount' => (float) $amount,
                    ];
                })->values(),
                'expense' => $expenseByCategory->map(function ($amount, $category) use ($categoryLabels) {
                    return [
                        'category' => $category,
                        'label' => $categoryLabels[$category] ?? $category,
                        'amount' => (float) $amount,
                    ];
                })->values(),
                'totalIncome' => (float) $totalIncome,
                'totalExpense' => (float) $totalExpense,
                'netProfit' => (float) $netProfit,
            ],
            'balanceSheet' => [
                'assets' => [
                    'cash' => (float) $totalCash,
                    'inventory' => (float) $inventoryValue,
                    'total' => (float) $totalAssets,
                ],
                'equity' => [
                    'initialCapital' => (float) $initialCapital,
                    'retainedEarnings' => (float) $retainedEarnings,
                    'total' => (float) $totalAssets,
                ],
            ],
        ]);
    }
}