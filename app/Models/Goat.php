<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Goat
 *
 * @property int $id
 * @property string $tag_number
 * @property string $breed
 * @property string $gender
 * @property \Illuminate\Support\Carbon|null $birth_date
 * @property string|null $weight
 * @property string $status
 * @property string|null $purchase_price
 * @property \Illuminate\Support\Carbon|null $purchase_date
 * @property string|null $notes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Transaction> $transactions
 * @property-read int|null $transactions_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Goat newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Goat newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Goat query()
 * @method static \Illuminate\Database\Eloquent\Builder|Goat whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Goat whereTagNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Goat whereBreed($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Goat whereGender($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Goat whereBirthDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Goat whereWeight($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Goat whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Goat wherePurchasePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Goat wherePurchaseDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Goat whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Goat whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Goat whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Goat healthy()
 * @method static \Database\Factories\GoatFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Goat extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'tag_number',
        'breed',
        'gender',
        'birth_date',
        'weight',
        'status',
        'purchase_price',
        'purchase_date',
        'notes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'birth_date' => 'date',
        'purchase_date' => 'date',
        'weight' => 'decimal:2',
        'purchase_price' => 'decimal:2',
    ];

    /**
     * Get the transactions associated with this goat.
     */
    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }

    /**
     * Scope a query to only include healthy goats.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeHealthy($query)
    {
        return $query->where('status', 'sehat');
    }

    /**
     * Calculate the age of the goat in months.
     *
     * @return int|null
     */
    public function getAgeInMonthsAttribute(): ?int
    {
        if (!$this->birth_date) {
            return null;
        }
        
        return (int) $this->birth_date->diffInMonths(now());
    }
}