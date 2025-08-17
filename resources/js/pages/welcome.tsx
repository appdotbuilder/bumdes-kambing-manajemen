import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Sistem Manajemen Peternakan Kambing BUMDes">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50">
                {/* Navigation */}
                <header className="w-full bg-white/70 backdrop-blur-sm border-b border-gray-200/50">
                    <div className="max-w-7xl mx-auto px-6 py-4">
                        <nav className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <span className="text-2xl">🐐</span>
                                <span className="text-xl font-bold text-gray-900">BUMDes Farm</span>
                            </div>
                            <div className="flex items-center gap-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="inline-block rounded-lg bg-green-600 px-6 py-2 text-sm font-medium text-white hover:bg-green-700 transition-colors"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="inline-block rounded-lg border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                        >
                                            Masuk
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="inline-block rounded-lg bg-green-600 px-6 py-2 text-sm font-medium text-white hover:bg-green-700 transition-colors"
                                        >
                                            Daftar
                                        </Link>
                                    </>
                                )}
                            </div>
                        </nav>
                    </div>
                </header>

                {/* Hero Section */}
                <div className="max-w-7xl mx-auto px-6 py-16">
                    <div className="text-center mb-16">
                        <h1 className="text-5xl font-bold text-gray-900 mb-6">
                            🐐 Sistem Manajemen Peternakan Kambing BUMDes
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                            Platform digital lengkap untuk mengelola inventaris kambing, mencatat transaksi keuangan, 
                            dan menghasilkan laporan keuangan yang akurat untuk BUMDes Anda.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-block rounded-lg bg-green-600 px-8 py-3 text-lg font-medium text-white hover:bg-green-700 transition-colors"
                                >
                                    🚀 Buka Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="inline-block rounded-lg bg-green-600 px-8 py-3 text-lg font-medium text-white hover:bg-green-700 transition-colors"
                                    >
                                        🚀 Masuk ke Sistem
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-block rounded-lg border border-green-600 px-8 py-3 text-lg font-medium text-green-600 hover:bg-green-50 transition-colors"
                                    >
                                        📝 Daftar Akun Baru
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                            <div className="text-4xl mb-4">📋</div>
                            <h3 className="text-lg font-semibold mb-2">Inventaris Kambing</h3>
                            <p className="text-gray-600 text-sm">Kelola data kambing lengkap dengan nomor tag, ras, status kesehatan, dan riwayat</p>
                        </div>
                        
                        <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                            <div className="text-4xl mb-4">💰</div>
                            <h3 className="text-lg font-semibold mb-2">Pencatatan Transaksi</h3>
                            <p className="text-gray-600 text-sm">Catat semua pemasukan dan pengeluaran termasuk penjualan, pembelian pakan, biaya kesehatan</p>
                        </div>
                        
                        <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                            <div className="text-4xl mb-4">📊</div>
                            <h3 className="text-lg font-semibold mb-2">Laporan Keuangan</h3>
                            <p className="text-gray-600 text-sm">Laporan laba rugi dan neraca otomatis untuk memantau kesehatan finansial</p>
                        </div>
                        
                        <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                            <div className="text-4xl mb-4">📈</div>
                            <h3 className="text-lg font-semibold mb-2">Dashboard Analitik</h3>
                            <p className="text-gray-600 text-sm">Visualisasi data dan trend keuangan untuk pengambilan keputusan yang tepat</p>
                        </div>
                    </div>

                    {/* Screenshots/Mockups */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">Fitur Utama Sistem</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                                <div className="h-40 bg-gradient-to-br from-green-100 to-green-200 rounded-lg mb-4 flex items-center justify-center">
                                    <div className="text-center">
                                        <span className="text-green-600 text-4xl block mb-2">🐐</span>
                                        <span className="text-green-700 font-bold">Data Kambing</span>
                                    </div>
                                </div>
                                <h3 className="font-semibold mb-2">Manajemen Inventaris</h3>
                                <p className="text-sm text-gray-600">Kelola data kambing dengan detail lengkap mulai dari tag number, breed, kesehatan hingga riwayat transaksi</p>
                            </div>
                            
                            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                                <div className="h-40 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg mb-4 flex items-center justify-center">
                                    <div className="text-center">
                                        <span className="text-blue-600 text-4xl block mb-2">💳</span>
                                        <span className="text-blue-700 font-bold">Transaksi</span>
                                    </div>
                                </div>
                                <h3 className="font-semibold mb-2">Pencatatan Keuangan</h3>
                                <p className="text-sm text-gray-600">Sistem pencatatan keuangan harian yang mudah dengan kategori lengkap dan laporan otomatis</p>
                            </div>
                            
                            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                                <div className="h-40 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg mb-4 flex items-center justify-center">
                                    <div className="text-center">
                                        <span className="text-purple-600 text-4xl block mb-2">📋</span>
                                        <span className="text-purple-700 font-bold">Laporan</span>
                                    </div>
                                </div>
                                <h3 className="font-semibold mb-2">Laporan Keuangan</h3>
                                <p className="text-sm text-gray-600">Laporan laba rugi dan neraca otomatis dengan analisis profitabilitas yang akurat</p>
                            </div>
                        </div>
                    </div>

                    {/* Benefits */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">Mengapa Memilih Sistem Kami?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                    <span className="text-green-600 text-xl">✅</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Efisiensi Operasional</h3>
                                    <p className="text-gray-600">Automatisasi pencatatan mengurangi kesalahan manual dan menghemat waktu pengelolaan peternakan</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                    <span className="text-blue-600 text-xl">✅</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Transparansi Keuangan</h3>
                                    <p className="text-gray-600">Laporan keuangan real-time memberikan akuntabilitas penuh untuk stakeholder BUMDes</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                    <span className="text-purple-600 text-xl">✅</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Monitoring Kesehatan Ternak</h3>
                                    <p className="text-gray-600">Pantau status kesehatan dan produktivitas kambing untuk memaksimalkan hasil peternakan</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                                    <span className="text-yellow-600 text-xl">✅</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Analisis Profitabilitas</h3>
                                    <p className="text-gray-600">Identifikasi sumber keuntungan terbesar dan area penghematan untuk optimasi bisnis</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-gray-100">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">Mulai Kelola Peternakan Anda Sekarang!</h2>
                        <p className="text-gray-600 mb-8 text-lg">
                            Bergabunglah dengan sistem manajemen digital yang membantu BUMDes 
                            mengoptimalkan operasional peternakan kambing dengan mudah dan efisien.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-block rounded-lg bg-green-600 px-8 py-4 text-lg font-medium text-white hover:bg-green-700 transition-colors shadow-lg"
                                >
                                    🚀 Buka Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="inline-block rounded-lg bg-green-600 px-8 py-4 text-lg font-medium text-white hover:bg-green-700 transition-colors shadow-lg"
                                    >
                                        🚀 Masuk ke Sistem
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-block rounded-lg border-2 border-green-600 px-8 py-4 text-lg font-medium text-green-600 hover:bg-green-50 transition-colors"
                                    >
                                        📝 Daftar Akun Baru
                                    </Link>
                                </>
                            )}
                        </div>
                        <p className="text-sm text-gray-500">
                            Sistem khusus untuk BUMDes yang bergerak di bidang peternakan kambing
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-8">
                    <div className="max-w-7xl mx-auto px-6 text-center">
                        <p className="mb-2">© 2024 Sistem Manajemen Peternakan Kambing BUMDes</p>
                        <p className="text-gray-400 text-sm">
                            Mendukung digitalisasi dan transparansi pengelolaan BUMDes di Indonesia
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}