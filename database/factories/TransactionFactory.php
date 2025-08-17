<?php

namespace Database\Factories;

use App\Models\Transaction;
use App\Models\Goat;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Transaction>
     */
    protected $model = Transaction::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $type = $this->faker->randomElement(['pemasukan', 'pengeluaran']);
        
        if ($type === 'pemasukan') {
            $category = $this->faker->randomElement(['penjualan_kambing', 'penjualan_susu', 'modal_awal']);
            $amount = $this->faker->randomFloat(2, 500000, 8000000);
            $description = $this->getIncomeDescription($category);
        } else {
            $category = $this->faker->randomElement(['pembelian_kambing', 'pembelian_pakan', 'biaya_kesehatan', 'biaya_operasional']);
            $amount = $this->faker->randomFloat(2, 50000, 3000000);
            $description = $this->getExpenseDescription($category);
        }

        return [
            'transaction_date' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'type' => $type,
            'category' => $category,
            'description' => $description,
            'amount' => $amount,
            'reference' => $this->faker->optional(0.5)->regexify('REF[0-9]{6}'),
            'goat_id' => $this->faker->optional(0.3)->randomElement(Goat::pluck('id')->toArray()),
            'notes' => $this->faker->optional(0.3)->sentence(),
        ];
    }

    /**
     * Get description for income categories.
     */
    protected function getIncomeDescription(string $category): string
    {
        return match ($category) {
            'penjualan_kambing' => 'Penjualan kambing ' . $this->faker->randomElement(['jantan', 'betina', 'dewasa', 'muda']),
            'penjualan_susu' => 'Penjualan susu kambing ' . $this->faker->numberBetween(5, 20) . ' liter',
            'modal_awal' => 'Modal awal BUMDes peternakan',
            default => 'Pemasukan lainnya',
        };
    }

    /**
     * Get description for expense categories.
     */
    protected function getExpenseDescription(string $category): string
    {
        return match ($category) {
            'pembelian_kambing' => 'Pembelian kambing ' . $this->faker->randomElement(['bibit', 'dewasa', 'betina produktif']),
            'pembelian_pakan' => 'Pembelian ' . $this->faker->randomElement(['rumput', 'konsentrat', 'dedak', 'jagung']),
            'biaya_kesehatan' => $this->faker->randomElement(['Vaksinasi', 'Obat cacing', 'Vitamin', 'Konsultasi dokter hewan']),
            'biaya_operasional' => $this->faker->randomElement(['Listrik kandang', 'Maintenance kandang', 'Transportasi', 'Tenaga kerja']),
            default => 'Pengeluaran lainnya',
        };
    }

    /**
     * Indicate that this is an income transaction.
     */
    public function income(): static
    {
        return $this->state(function (array $attributes) {
            $category = $this->faker->randomElement(['penjualan_kambing', 'penjualan_susu', 'modal_awal']);
            return [
                'type' => 'pemasukan',
                'category' => $category,
                'description' => $this->getIncomeDescription($category),
                'amount' => $this->faker->randomFloat(2, 500000, 8000000),
            ];
        });
    }

    /**
     * Indicate that this is an expense transaction.
     */
    public function expense(): static
    {
        return $this->state(function (array $attributes) {
            $category = $this->faker->randomElement(['pembelian_kambing', 'pembelian_pakan', 'biaya_kesehatan', 'biaya_operasional']);
            return [
                'type' => 'pengeluaran',
                'category' => $category,
                'description' => $this->getExpenseDescription($category),
                'amount' => $this->faker->randomFloat(2, 50000, 3000000),
            ];
        });
    }
}