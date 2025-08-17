<?php

namespace Database\Factories;

use App\Models\Goat;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Goat>
 */
class GoatFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Goat>
     */
    protected $model = Goat::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'tag_number' => 'KMB-' . $this->faker->unique()->numberBetween(1000, 9999),
            'breed' => $this->faker->randomElement(['Kacang', 'Etawa', 'Jawarandu', 'Boer', 'Saanen']),
            'gender' => $this->faker->randomElement(['jantan', 'betina']),
            'birth_date' => $this->faker->dateTimeBetween('-3 years', '-2 months'),
            'weight' => $this->faker->randomFloat(2, 15, 80),
            'status' => $this->faker->randomElement(['sehat', 'sakit']),
            'purchase_price' => $this->faker->randomFloat(2, 1000000, 5000000),
            'purchase_date' => $this->faker->dateTimeBetween('-2 years', 'now'),
            'notes' => $this->faker->optional(0.3)->sentence(),
        ];
    }

    /**
     * Indicate that the goat is healthy.
     */
    public function healthy(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'sehat',
        ]);
    }

    /**
     * Indicate that the goat is sick.
     */
    public function sick(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'sakit',
        ]);
    }

    /**
     * Indicate that the goat is sold.
     */
    public function sold(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'dijual',
        ]);
    }
}