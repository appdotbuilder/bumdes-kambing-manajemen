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
        Schema::create('goats', function (Blueprint $table) {
            $table->id();
            $table->string('tag_number')->unique()->comment('Nomor tag identifikasi kambing');
            $table->string('breed')->comment('Jenis/ras kambing');
            $table->enum('gender', ['jantan', 'betina'])->comment('Jenis kelamin');
            $table->date('birth_date')->nullable()->comment('Tanggal lahir');
            $table->decimal('weight', 8, 2)->nullable()->comment('Berat dalam kg');
            $table->enum('status', ['sehat', 'sakit', 'dijual', 'mati'])->default('sehat')->comment('Status kambing');
            $table->decimal('purchase_price', 15, 2)->nullable()->comment('Harga beli');
            $table->date('purchase_date')->nullable()->comment('Tanggal pembelian');
            $table->text('notes')->nullable()->comment('Catatan tambahan');
            $table->timestamps();
            
            // Indexes untuk performa
            $table->index('tag_number');
            $table->index('status');
            $table->index(['status', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('goats');
    }
};