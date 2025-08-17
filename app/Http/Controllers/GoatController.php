<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreGoatRequest;
use App\Http\Requests\UpdateGoatRequest;
use App\Models\Goat;
use Inertia\Inertia;

class GoatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $goats = Goat::with('transactions')
            ->orderBy('tag_number')
            ->paginate(10);
        
        return Inertia::render('goats/index', [
            'goats' => $goats
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('goats/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreGoatRequest $request)
    {
        $goat = Goat::create($request->validated());

        return redirect()->route('goats.index')
            ->with('success', 'Data kambing berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Goat $goat)
    {
        $goat->load(['transactions' => function ($query) {
            $query->latest('transaction_date');
        }]);

        return Inertia::render('goats/show', [
            'goat' => $goat
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Goat $goat)
    {
        return Inertia::render('goats/edit', [
            'goat' => $goat
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateGoatRequest $request, Goat $goat)
    {
        $goat->update($request->validated());

        return redirect()->route('goats.show', $goat)
            ->with('success', 'Data kambing berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Goat $goat)
    {
        $goat->delete();

        return redirect()->route('goats.index')
            ->with('success', 'Data kambing berhasil dihapus.');
    }
}