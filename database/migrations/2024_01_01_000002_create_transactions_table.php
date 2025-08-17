<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->date('transaction_date')->comment('Tanggal transaksi');
            $table->enum('type', ['pemasukan', 'pengeluaran'])->comment('Jenis transaksi');
            $table->enum('category', [
                'penjualan_kambing',
                'penjualan_susu',
                'pembelian_kambing',
                'pembelian_pakan',
                'biaya_kesehatan',
                'biaya_operasional',
                'modal_awal',
                'lainnya'
            ])->comment('Kategori transaksi');
            $table->string('description')->comment('Deskripsi transaksi');
            $table->decimal('amount', 15, 2)->comment('Jumlah uang');
            $table->string('reference')->nullable()->comment('Nomor referensi/bukti');
            $table->foreignId('goat_id')->nullable()->constrained()->onDelete('set null');
            $table->text('notes')->nullable()->comment('Catatan tambahan');
            $table->timestamps();
            
            // Indexes untuk laporan keuangan
            $table->index('transaction_date');
            $table->index('type');
            $table->index('category');
            $table->index(['transaction_date', 'type']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};