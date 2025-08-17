import React, { useState } from 'react';
import { AppShell } from '@/components/app-shell';
import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface DateRange {
    start_date: string;
    end_date: string;
}

interface CategoryData {
    category: string;
    label: string;
    amount: number;
}

interface ProfitLoss {
    income: CategoryData[];
    expense: CategoryData[];
    totalIncome: number;
    totalExpense: number;
    netProfit: number;
}

interface BalanceSheet {
    assets: {
        cash: number;
        inventory: number;
        total: number;
    };
    equity: {
        initialCapital: number;
        retainedEarnings: number;
        total: number;
    };
}

interface Props {
    dateRange: DateRange;
    profitLoss: ProfitLoss;
    balanceSheet: BalanceSheet;
    [key: string]: unknown;
}

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(amount);
}

function formatDate(date: string): string {
    return new Date(date).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export default function ReportsIndex({ dateRange, profitLoss, balanceSheet }: Props) {
    const [startDate, setStartDate] = useState(dateRange.start_date);
    const [endDate, setEndDate] = useState(dateRange.end_date);

    const handleFilterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/reports', {
            start_date: startDate,
            end_date: endDate,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const profitMargin = profitLoss.totalIncome > 0 
        ? ((profitLoss.netProfit / profitLoss.totalIncome) * 100).toFixed(1)
        : '0';

    return (
        <AppShell>
            <Head title="Laporan Keuangan" />
            
            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">📊 Laporan Keuangan</h1>
                        <p className="text-gray-600 mt-2">Analisis keuangan peternakan kambing BUMDes</p>
                    </div>
                </div>

                {/* Date Filter */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <form onSubmit={handleFilterSubmit} className="flex flex-col sm:flex-row gap-4 items-end">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tanggal Mulai
                            </label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tanggal Akhir
                            </label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                            🔍 Filter Laporan
                        </Button>
                    </form>
                </div>

                {/* Period Info */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-md p-6 text-white">
                    <h2 className="text-2xl font-bold mb-2">
                        📅 Periode Laporan
                    </h2>
                    <p className="text-blue-100 text-lg">
                        {formatDate(dateRange.start_date)} sampai {formatDate(dateRange.end_date)}
                    </p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Pemasukan</p>
                                <p className="text-2xl font-bold text-green-600">
                                    {formatCurrency(profitLoss.totalIncome)}
                                </p>
                            </div>
                            <div className="text-green-500 text-3xl">📈</div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Pengeluaran</p>
                                <p className="text-2xl font-bold text-red-600">
                                    {formatCurrency(profitLoss.totalExpense)}
                                </p>
                            </div>
                            <div className="text-red-500 text-3xl">📉</div>
                        </div>
                    </div>

                    <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${
                        profitLoss.netProfit >= 0 ? 'border-blue-500' : 'border-orange-500'
                    }`}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Laba/Rugi Bersih</p>
                                <p className={`text-2xl font-bold ${
                                    profitLoss.netProfit >= 0 ? 'text-blue-600' : 'text-orange-600'
                                }`}>
                                    {formatCurrency(profitLoss.netProfit)}
                                </p>
                            </div>
                            <div className={`text-3xl ${
                                profitLoss.netProfit >= 0 ? 'text-blue-500' : 'text-orange-500'
                            }`}>
                                {profitLoss.netProfit >= 0 ? '💰' : '⚠️'}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Margin Laba</p>
                                <p className="text-2xl font-bold text-purple-600">
                                    {profitMargin}%
                                </p>
                            </div>
                            <div className="text-purple-500 text-3xl">📊</div>
                        </div>
                    </div>
                </div>

                {/* Profit & Loss Statement */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="px-6 py-4 bg-green-50 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-green-800">📈 Laporan Laba Rugi - Pemasukan</h3>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {profitLoss.income.map((item, index) => (
                                    <div key={index} className="flex justify-between items-center border-b pb-2">
                                        <span className="text-gray-700">{item.label}</span>
                                        <span className="font-semibold text-green-600">
                                            {formatCurrency(item.amount)}
                                        </span>
                                    </div>
                                ))}
                                <div className="flex justify-between items-center pt-4 border-t-2 border-green-200">
                                    <span className="font-bold text-gray-900">Total Pemasukan</span>
                                    <span className="font-bold text-xl text-green-600">
                                        {formatCurrency(profitLoss.totalIncome)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="px-6 py-4 bg-red-50 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-red-800">📉 Laporan Laba Rugi - Pengeluaran</h3>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {profitLoss.expense.map((item, index) => (
                                    <div key={index} className="flex justify-between items-center border-b pb-2">
                                        <span className="text-gray-700">{item.label}</span>
                                        <span className="font-semibold text-red-600">
                                            {formatCurrency(item.amount)}
                                        </span>
                                    </div>
                                ))}
                                <div className="flex justify-between items-center pt-4 border-t-2 border-red-200">
                                    <span className="font-bold text-gray-900">Total Pengeluaran</span>
                                    <span className="font-bold text-xl text-red-600">
                                        {formatCurrency(profitLoss.totalExpense)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Net Profit Summary */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">💼 Ringkasan Laba Rugi</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <p className="text-sm text-gray-600">Pemasukan</p>
                            <p className="text-2xl font-bold text-green-600">
                                {formatCurrency(profitLoss.totalIncome)}
                            </p>
                        </div>
                        <div className="text-center">
                            <p className="text-sm text-gray-600">Pengeluaran</p>
                            <p className="text-2xl font-bold text-red-600">
                                {formatCurrency(profitLoss.totalExpense)}
                            </p>
                        </div>
                        <div className="text-center">
                            <p className="text-sm text-gray-600">Laba/Rugi Bersih</p>
                            <p className={`text-3xl font-bold ${
                                profitLoss.netProfit >= 0 ? 'text-blue-600' : 'text-orange-600'
                            }`}>
                                {formatCurrency(profitLoss.netProfit)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Balance Sheet */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="px-6 py-4 bg-blue-50 border-b border-gray-200">
                        <h3 className="text-xl font-semibold text-blue-800">📋 Neraca Sederhana</h3>
                        <p className="text-sm text-blue-600 mt-1">Posisi aset dan modal per hari ini</p>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Assets */}
                            <div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-4">🏦 ASET</h4>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-700">Kas</span>
                                        <span className="font-semibold">
                                            {formatCurrency(balanceSheet.assets.cash)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-700">Inventaris Kambing</span>
                                        <span className="font-semibold">
                                            {formatCurrency(balanceSheet.assets.inventory)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between pt-3 border-t-2 border-blue-200">
                                        <span className="font-bold text-gray-900">Total Aset</span>
                                        <span className="font-bold text-xl text-blue-600">
                                            {formatCurrency(balanceSheet.assets.total)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Equity */}
                            <div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-4">💰 MODAL</h4>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-700">Modal Awal</span>
                                        <span className="font-semibold">
                                            {formatCurrency(balanceSheet.equity.initialCapital)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-700">Laba Ditahan</span>
                                        <span className={`font-semibold ${
                                            balanceSheet.equity.retainedEarnings >= 0 ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                            {formatCurrency(balanceSheet.equity.retainedEarnings)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between pt-3 border-t-2 border-blue-200">
                                        <span className="font-bold text-gray-900">Total Modal</span>
                                        <span className="font-bold text-xl text-blue-600">
                                            {formatCurrency(balanceSheet.equity.total)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Balance Verification */}
                        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-700">Verifikasi Neraca:</span>
                                <span className={`font-bold ${
                                    Math.abs(balanceSheet.assets.total - balanceSheet.equity.total) < 1 
                                        ? 'text-green-600' 
                                        : 'text-red-600'
                                }`}>
                                    {Math.abs(balanceSheet.assets.total - balanceSheet.equity.total) < 1 
                                        ? '✅ Seimbang' 
                                        : '⚠️ Tidak Seimbang'
                                    }
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Print Actions */}
                <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">🖨️ Aksi Laporan</h3>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button 
                            onClick={() => window.print()}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            🖨️ Cetak Laporan
                        </Button>
                        <Button 
                            variant="outline"
                            onClick={() => {
                                // Export functionality could be added here
                                alert('Fitur export akan segera hadir!');
                            }}
                        >
                            📊 Export Excel
                        </Button>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}