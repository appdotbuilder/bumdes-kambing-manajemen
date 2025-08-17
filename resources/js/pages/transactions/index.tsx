import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Transaction {
    id: number;
    transaction_date: string;
    type: string;
    category: string;
    description: string;
    amount: number;
    reference: string | null;
    notes: string | null;
    goat: {
        id: number;
        tag_number: string;
        breed: string;
    } | null;
    created_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationMeta {
    current_page: number;
    from: number | null;
    to: number | null;
    total: number;
    per_page: number;
    last_page: number;
}

interface Props {
    transactions: {
        data: Transaction[];
        links: PaginationLink[];
        meta: PaginationMeta;
    };
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

function getCategoryLabel(category: string): string {
    const labels = {
        penjualan_kambing: 'Penjualan Kambing',
        penjualan_susu: 'Penjualan Susu',
        pembelian_kambing: 'Pembelian Kambing',
        pembelian_pakan: 'Pembelian Pakan',
        biaya_kesehatan: 'Biaya Kesehatan',
        biaya_operasional: 'Biaya Operasional',
        modal_awal: 'Modal Awal',
        lainnya: 'Lainnya',
    };
    return labels[category as keyof typeof labels] || category;
}

function getCategoryEmoji(category: string): string {
    const emojis = {
        penjualan_kambing: '🐐',
        penjualan_susu: '🥛',
        pembelian_kambing: '🛒',
        pembelian_pakan: '🌾',
        biaya_kesehatan: '💊',
        biaya_operasional: '⚙️',
        modal_awal: '💰',
        lainnya: '📝',
    };
    return emojis[category as keyof typeof emojis] || '📝';
}

export default function TransactionsIndex({ transactions }: Props) {
    const totalIncome = transactions.data
        .filter(t => t.type === 'pemasukan')
        .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpense = transactions.data
        .filter(t => t.type === 'pengeluaran')
        .reduce((sum, t) => sum + t.amount, 0);

    const netAmount = totalIncome - totalExpense;

    return (
        <AppShell>
            <Head title="Transaksi Keuangan" />
            
            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">💳 Transaksi Keuangan</h1>
                        <p className="text-gray-600 mt-2">Kelola semua pemasukan dan pengeluaran peternakan</p>
                    </div>
                    <div className="mt-4 sm:mt-0">
                        <Link href="/transactions/create">
                            <Button className="bg-green-600 hover:bg-green-700">
                                ➕ Tambah Transaksi
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-md p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-green-100">Total Pemasukan</p>
                                <p className="text-2xl font-bold">{formatCurrency(totalIncome)}</p>
                            </div>
                            <div className="text-3xl opacity-75">📈</div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg shadow-md p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-red-100">Total Pengeluaran</p>
                                <p className="text-2xl font-bold">{formatCurrency(totalExpense)}</p>
                            </div>
                            <div className="text-3xl opacity-75">📉</div>
                        </div>
                    </div>

                    <div className={`bg-gradient-to-r ${netAmount >= 0 
                        ? 'from-blue-500 to-blue-600' 
                        : 'from-orange-500 to-orange-600'
                    } rounded-lg shadow-md p-6 text-white`}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white opacity-90">Saldo Bersih</p>
                                <p className="text-2xl font-bold">{formatCurrency(netAmount)}</p>
                            </div>
                            <div className="text-3xl opacity-75">
                                {netAmount >= 0 ? '💰' : '⚠️'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Transactions Table */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900">Daftar Transaksi</h3>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Tanggal
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Transaksi
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Kategori
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Kambing
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Jumlah
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {transactions.data.map((transaction) => (
                                    <tr key={transaction.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {formatDate(transaction.transaction_date)}
                                            </div>
                                            {transaction.reference && (
                                                <div className="text-sm text-gray-500">
                                                    Ref: {transaction.reference}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-start">
                                                <div className="text-2xl mr-3">
                                                    {transaction.type === 'pemasukan' ? '📈' : '📉'}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {transaction.description}
                                                    </div>
                                                    <div className={`text-sm font-medium ${
                                                        transaction.type === 'pemasukan' 
                                                            ? 'text-green-600' 
                                                            : 'text-red-600'
                                                    }`}>
                                                        {transaction.type === 'pemasukan' ? 'Pemasukan' : 'Pengeluaran'}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <span className="text-lg mr-2">
                                                    {getCategoryEmoji(transaction.category)}
                                                </span>
                                                <div className="text-sm font-medium text-gray-900">
                                                    {getCategoryLabel(transaction.category)}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {transaction.goat ? (
                                                <div className="flex items-center">
                                                    <span className="text-lg mr-2">🐐</span>
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {transaction.goat.tag_number}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {transaction.goat.breed}
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <span className="text-gray-500 text-sm">-</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className={`text-lg font-bold ${
                                                transaction.type === 'pemasukan' 
                                                    ? 'text-green-600' 
                                                    : 'text-red-600'
                                            }`}>
                                                {transaction.type === 'pemasukan' ? '+' : '-'}
                                                {formatCurrency(transaction.amount)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                            <Link 
                                                href={`/transactions/${transaction.id}`}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                👁️ Lihat
                                            </Link>
                                            <Link 
                                                href={`/transactions/${transaction.id}/edit`}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                ✏️ Edit
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {transactions.data.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">💳</div>
                            <p className="text-gray-500 text-lg">Belum ada transaksi</p>
                            <p className="text-gray-400 text-sm">Tambahkan transaksi pertama untuk memulai pencatatan keuangan</p>
                            <Link href="/transactions/create" className="mt-4 inline-block">
                                <Button className="bg-green-600 hover:bg-green-700">
                                    ➕ Tambah Transaksi Pertama
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {transactions.links && transactions.links.length > 3 && (
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex-1 flex justify-between sm:hidden">
                                {transactions.links.find(link => link.label.includes('Previous'))?.url && (
                                    <Link 
                                        href={transactions.links.find(link => link.label.includes('Previous'))!.url!}
                                        className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                                    >
                                        Previous
                                    </Link>
                                )}
                                {transactions.links.find(link => link.label.includes('Next'))?.url && (
                                    <Link 
                                        href={transactions.links.find(link => link.label.includes('Next'))!.url!}
                                        className="relative ml-3 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                                    >
                                        Next
                                    </Link>
                                )}
                            </div>
                            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-gray-700">
                                        Menampilkan <span className="font-medium">{transactions.meta.from || 0}</span> hingga{' '}
                                        <span className="font-medium">{transactions.meta.to || 0}</span> dari{' '}
                                        <span className="font-medium">{transactions.meta.total}</span> transaksi
                                    </p>
                                </div>
                                <div>
                                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                        {transactions.links.map((link, index) => {
                                            if (link.url === null) {
                                                return (
                                                    <span
                                                        key={index}
                                                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium text-gray-300 bg-gray-50 cursor-not-allowed"
                                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                                    />
                                                );
                                            }
                                            return (
                                                <Link
                                                    key={index}
                                                    href={link.url}
                                                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                                        link.active 
                                                            ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                    } ${
                                                        index === 0 ? 'rounded-l-md' : ''
                                                    } ${
                                                        index === transactions.links.length - 1 ? 'rounded-r-md' : ''
                                                    }`}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            );
                                        })}
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}