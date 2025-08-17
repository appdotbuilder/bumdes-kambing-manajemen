<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTransactionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'transaction_date' => 'required|date|before_or_equal:today',
            'type' => 'required|in:pemasukan,pengeluaran',
            'category' => 'required|in:penjualan_kambing,penjualan_susu,pembelian_kambing,pembelian_pakan,biaya_kesehatan,biaya_operasional,modal_awal,lainnya',
            'description' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0.01',
            'reference' => 'nullable|string|max:255',
            'goat_id' => 'nullable|exists:goats,id',
            'notes' => 'nullable|string',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'transaction_date.required' => 'Tanggal transaksi harus diisi.',
            'transaction_date.before_or_equal' => 'Tanggal transaksi tidak boleh di masa depan.',
            'type.required' => 'Jenis transaksi harus dipilih.',
            'type.in' => 'Jenis transaksi harus pemasukan atau pengeluaran.',
            'category.required' => 'Kategori transaksi harus dipilih.',
            'description.required' => 'Deskripsi transaksi harus diisi.',
            'amount.required' => 'Jumlah uang harus diisi.',
            'amount.numeric' => 'Jumlah uang harus berupa angka.',
            'amount.min' => 'Jumlah uang harus lebih dari 0.',
            'goat_id.exists' => 'Kambing yang dipilih tidak valid.',
        ];
    }
}