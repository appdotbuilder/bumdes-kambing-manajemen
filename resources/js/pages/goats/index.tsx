import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Goat {
    id: number;
    tag_number: string;
    breed: string;
    gender: string;
    birth_date: string | null;
    weight: number | null;
    status: string;
    purchase_price: number | null;
    purchase_date: string | null;
    notes: string | null;
    created_at: string;
    updated_at: string;
    age_in_months: number | null;
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
    goats: {
        data: Goat[];
        links: PaginationLink[];
        meta: PaginationMeta;
    };
    [key: string]: unknown;
}

function formatCurrency(amount: number | null): string {
    if (!amount) return '-';
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(amount);
}

function formatDate(date: string | null): string {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

function getStatusBadge(status: string) {
    const statusConfig = {
        sehat: { color: 'bg-green-100 text-green-800', emoji: '✅', label: 'Sehat' },
        sakit: { color: 'bg-red-100 text-red-800', emoji: '🏥', label: 'Sakit' },
        dijual: { color: 'bg-purple-100 text-purple-800', emoji: '💰', label: 'Dijual' },
        mati: { color: 'bg-gray-100 text-gray-800', emoji: '💀', label: 'Mati' },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.sehat;

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
            <span className="mr-1">{config.emoji}</span>
            {config.label}
        </span>
    );
}

export default function GoatsIndex({ goats }: Props) {
    const healthyGoats = goats.data.filter(goat => goat.status === 'sehat').length;
    const sickGoats = goats.data.filter(goat => goat.status === 'sakit').length;
    const soldGoats = goats.data.filter(goat => goat.status === 'dijual').length;

    return (
        <AppShell>
            <Head title="Data Kambing" />
            
            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">🐐 Data Kambing</h1>
                        <p className="text-gray-600 mt-2">Kelola inventaris kambing peternakan BUMDes</p>
                    </div>
                    <div className="mt-4 sm:mt-0">
                        <Link href="/goats/create">
                            <Button className="bg-green-600 hover:bg-green-700">
                                ➕ Tambah Kambing
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Kambing</p>
                                <p className="text-2xl font-bold text-gray-900">{goats.meta.total}</p>
                            </div>
                            <div className="text-blue-500 text-2xl">🐐</div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Sehat</p>
                                <p className="text-2xl font-bold text-gray-900">{healthyGoats}</p>
                            </div>
                            <div className="text-green-500 text-2xl">✅</div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-red-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Sakit</p>
                                <p className="text-2xl font-bold text-gray-900">{sickGoats}</p>
                            </div>
                            <div className="text-red-500 text-2xl">🏥</div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-purple-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Terjual</p>
                                <p className="text-2xl font-bold text-gray-900">{soldGoats}</p>
                            </div>
                            <div className="text-purple-500 text-2xl">💰</div>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900">Daftar Kambing</h3>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Kambing
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Jenis & Gender
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Umur & Berat
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Harga Beli
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {goats.data.map((goat) => (
                                    <tr key={goat.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="text-2xl mr-3">🐐</div>
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {goat.tag_number}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        ID: {goat.id}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{goat.breed}</div>
                                            <div className="text-sm text-gray-500 flex items-center">
                                                <span className="mr-1">
                                                    {goat.gender === 'jantan' ? '♂️' : '♀️'}
                                                </span>
                                                {goat.gender === 'jantan' ? 'Jantan' : 'Betina'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {goat.age_in_months ? `${goat.age_in_months} bulan` : '-'}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {goat.weight ? `${goat.weight} kg` : '-'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getStatusBadge(goat.status)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {formatCurrency(goat.purchase_price)}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {formatDate(goat.purchase_date)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                            <Link 
                                                href={`/goats/${goat.id}`}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                👁️ Lihat
                                            </Link>
                                            <Link 
                                                href={`/goats/${goat.id}/edit`}
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

                    {goats.data.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">🐐</div>
                            <p className="text-gray-500 text-lg">Belum ada data kambing</p>
                            <p className="text-gray-400 text-sm">Tambahkan kambing pertama untuk memulai</p>
                            <Link href="/goats/create" className="mt-4 inline-block">
                                <Button className="bg-green-600 hover:bg-green-700">
                                    ➕ Tambah Kambing Pertama
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {goats.links && goats.links.length > 3 && (
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex-1 flex justify-between sm:hidden">
                                {goats.links.find(link => link.label.includes('Previous'))?.url && (
                                    <Link 
                                        href={goats.links.find(link => link.label.includes('Previous'))!.url!}
                                        className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                                    >
                                        Previous
                                    </Link>
                                )}
                                {goats.links.find(link => link.label.includes('Next'))?.url && (
                                    <Link 
                                        href={goats.links.find(link => link.label.includes('Next'))!.url!}
                                        className="relative ml-3 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                                    >
                                        Next
                                    </Link>
                                )}
                            </div>
                            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-gray-700">
                                        Menampilkan <span className="font-medium">{goats.meta.from || 0}</span> hingga{' '}
                                        <span className="font-medium">{goats.meta.to || 0}</span> dari{' '}
                                        <span className="font-medium">{goats.meta.total}</span> kambing
                                    </p>
                                </div>
                                <div>
                                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                        {goats.links.map((link, index) => {
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
                                                        index === goats.links.length - 1 ? 'rounded-r-md' : ''
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