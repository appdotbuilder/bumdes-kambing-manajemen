import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Head } from '@inertiajs/react';

interface DashboardStats {
    totalGoats: number;
    healthyGoats: number;
    sickGoats: number;
    soldGoats: number;
    monthlyIncome: number;
    monthlyExpense: number;
    monthlyProfit: number;
    inventoryValue: number;
}

interface Transaction {
    id: number;
    transaction_date: string;
    type: string;
    category: string;
    description: string;
    amount: number;
    goat?: {
        id: number;
        tag_number: string;
        breed: string;
    };
}

interface MonthlyData {
    month: string;
    income: number;
    expense: number;
    profit: number;
}

interface Props {
    stats: DashboardStats;
    recentTransactions: Transaction[];
    monthlyData: MonthlyData[];
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
        month: 'short',
        day: 'numeric',
    });
}

export default function Dashboard({ stats, recentTransactions, monthlyData }: Props) {
    return (
        <AppShell>
            <Head title="Dashboard Peternakan" />
            
            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">🐐 Dashboard Peternakan Kambing</h1>
                    <p className="text-gray-600 mt-2">Ringkasan kondisi peternakan dan keuangan BUMDes</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Total Kambing */}
                    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Kambing</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.totalGoats}</p>
                            </div>
                            <div className="text-blue-500 text-3xl">🐐</div>
                        </div>
                    </div>

                    {/* Kambing Sehat */}
                    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Kambing Sehat</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.healthyGoats}</p>
                            </div>
                            <div className="text-green-500 text-3xl">✅</div>
                        </div>
                    </div>

                    {/* Kambing Sakit */}
                    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Kambing Sakit</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.sickGoats}</p>
                            </div>
                            <div className="text-red-500 text-3xl">🏥</div>
                        </div>
                    </div>

                    {/* Kambing Terjual */}
                    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Kambing Terjual</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.soldGoats}</p>
                            </div>
                            <div className="text-purple-500 text-3xl">💰</div>
                        </div>
                    </div>
                </div>

                {/* Financial Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Pemasukan Bulan Ini */}
                    <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-md p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-green-100">Pemasukan Bulan Ini</p>
                                <p className="text-2xl font-bold">{formatCurrency(stats.monthlyIncome)}</p>
                            </div>
                            <div className="text-3xl opacity-75">📈</div>
                        </div>
                    </div>

                    {/* Pengeluaran Bulan Ini */}
                    <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg shadow-md p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-red-100">Pengeluaran Bulan Ini</p>
                                <p className="text-2xl font-bold">{formatCurrency(stats.monthlyExpense)}</p>
                            </div>
                            <div className="text-3xl opacity-75">📉</div>
                        </div>
                    </div>

                    {/* Laba Bulan Ini */}
                    <div className={`bg-gradient-to-r ${stats.monthlyProfit >= 0 
                        ? 'from-blue-500 to-blue-600' 
                        : 'from-orange-500 to-orange-600'
                    } rounded-lg shadow-md p-6 text-white`}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white opacity-90">Laba/Rugi Bulan Ini</p>
                                <p className="text-2xl font-bold">{formatCurrency(stats.monthlyProfit)}</p>
                            </div>
                            <div className="text-3xl opacity-75">
                                {stats.monthlyProfit >= 0 ? '💰' : '⚠️'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Charts and Tables */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Monthly Performance Chart */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Performa 6 Bulan Terakhir</h3>
                        <div className="space-y-4">
                            {monthlyData.map((data, index) => (
                                <div key={index} className="flex items-center justify-between border-b pb-2">
                                    <span className="text-sm font-medium text-gray-600">{data.month}</span>
                                    <div className="flex space-x-4 text-sm">
                                        <span className="text-green-600">
                                            ↗ {formatCurrency(data.income)}
                                        </span>
                                        <span className="text-red-600">
                                            ↘ {formatCurrency(data.expense)}
                                        </span>
                                        <span className={`font-semibold ${
                                            data.profit >= 0 ? 'text-blue-600' : 'text-orange-600'
                                        }`}>
                                            = {formatCurrency(data.profit)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Transactions */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">🗂️ Transaksi Terbaru</h3>
                        <div className="space-y-3">
                            {recentTransactions.map((transaction) => (
                                <div key={transaction.id} className="flex items-center justify-between border-b pb-2">
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900">
                                            {transaction.description}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {formatDate(transaction.transaction_date)}
                                            {transaction.goat && ` • ${transaction.goat.tag_number}`}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className={`text-sm font-semibold ${
                                            transaction.type === 'pemasukan' 
                                                ? 'text-green-600' 
                                                : 'text-red-600'
                                        }`}>
                                            {transaction.type === 'pemasukan' ? '+' : '-'}
                                            {formatCurrency(transaction.amount)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            {recentTransactions.length === 0 && (
                                <p className="text-gray-500 text-center py-4">Belum ada transaksi</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Inventory Value */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">📦 Nilai Total Inventaris</h3>
                            <p className="text-gray-600">Nilai total kambing yang masih hidup berdasarkan harga beli</p>
                        </div>
                        <div className="text-right">
                            <p className="text-3xl font-bold text-blue-600">{formatCurrency(stats.inventoryValue)}</p>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">🚀 Aksi Cepat</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <a
                            href="/goats/create"
                            className="bg-white rounded-lg p-4 shadow hover:shadow-md transition-shadow text-center"
                        >
                            <div className="text-2xl mb-2">🐐</div>
                            <p className="text-sm font-medium text-gray-900">Tambah Kambing</p>
                        </a>
                        <a
                            href="/transactions/create"
                            className="bg-white rounded-lg p-4 shadow hover:shadow-md transition-shadow text-center"
                        >
                            <div className="text-2xl mb-2">💳</div>
                            <p className="text-sm font-medium text-gray-900">Catat Transaksi</p>
                        </a>
                        <a
                            href="/goats"
                            className="bg-white rounded-lg p-4 shadow hover:shadow-md transition-shadow text-center"
                        >
                            <div className="text-2xl mb-2">📋</div>
                            <p className="text-sm font-medium text-gray-900">Lihat Inventaris</p>
                        </a>
                        <a
                            href="/reports"
                            className="bg-white rounded-lg p-4 shadow hover:shadow-md transition-shadow text-center"
                        >
                            <div className="text-2xl mb-2">📊</div>
                            <p className="text-sm font-medium text-gray-900">Laporan Keuangan</p>
                        </a>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}