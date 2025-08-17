<?php

namespace Database\Seeders;

use App\Models\Goat;
use App\Models\Transaction;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FarmSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create initial capital transaction
        Transaction::create([
            'transaction_date' => now()->subYear(),
            'type' => 'pemasukan',
            'category' => 'modal_awal',
            'description' => 'Modal awal BUMDes untuk peternakan kambing',
            'amount' => 50000000,
            'reference' => 'MOD001',
            'notes' => 'Modal awal dari BUMDes untuk memulai usaha peternakan kambing',
        ]);

        // Create goats
        $goats = Goat::factory(25)->create();

        // Create some sold goats for transaction history
        $soldGoats = Goat::factory(5)->sold()->create();

        // Create transactions for goat purchases
        $goats->concat($soldGoats)->each(function ($goat) {
            if ($goat->purchase_price && $goat->purchase_date) {
                Transaction::create([
                    'transaction_date' => $goat->purchase_date,
                    'type' => 'pengeluaran',
                    'category' => 'pembelian_kambing',
                    'description' => "Pembelian kambing {$goat->breed} - {$goat->tag_number}",
                    'amount' => $goat->purchase_price,
                    'goat_id' => $goat->id,
                    'reference' => 'PB' . str_pad((string) $goat->id, 4, '0', STR_PAD_LEFT),
                ]);
            }
        });

        // Create sales transactions for sold goats
        $soldGoats->each(function ($goat) {
            $salePrice = ((float) $goat->purchase_price) * random_int(12, 18) / 10; // 20-80% profit
            Transaction::create([
                'transaction_date' => fake()->dateTimeBetween($goat->purchase_date, 'now'),
                'type' => 'pemasukan',
                'category' => 'penjualan_kambing',
                'description' => "Penjualan kambing {$goat->breed} - {$goat->tag_number}",
                'amount' => $salePrice,
                'goat_id' => $goat->id,
                'reference' => 'JL' . str_pad((string) $goat->id, 4, '0', STR_PAD_LEFT),
            ]);
        });

        // Create additional random transactions (feed, health, milk sales, etc.)
        Transaction::factory(50)->create();

        // Create some milk sales transactions
        for ($i = 0; $i < 20; $i++) {
            Transaction::create([
                'transaction_date' => fake()->dateTimeBetween('-6 months', 'now'),
                'type' => 'pemasukan',
                'category' => 'penjualan_susu',
                'description' => 'Penjualan susu kambing ' . random_int(8, 25) . ' liter',
                'amount' => random_int(8, 25) * 15000, // Rp 15,000 per liter
                'reference' => 'SU' . str_pad((string) ($i + 1), 4, '0', STR_PAD_LEFT),
            ]);
        }
    }


}