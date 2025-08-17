<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreGoatRequest extends FormRequest
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
            'tag_number' => 'required|string|max:255|unique:goats,tag_number',
            'breed' => 'required|string|max:255',
            'gender' => 'required|in:jantan,betina',
            'birth_date' => 'nullable|date|before_or_equal:today',
            'weight' => 'nullable|numeric|min:0',
            'status' => 'required|in:sehat,sakit,dijual,mati',
            'purchase_price' => 'nullable|numeric|min:0',
            'purchase_date' => 'nullable|date|before_or_equal:today',
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
            'tag_number.required' => 'Nomor tag kambing harus diisi.',
            'tag_number.unique' => 'Nomor tag sudah digunakan.',
            'breed.required' => 'Jenis kambing harus diisi.',
            'gender.required' => 'Jenis kelamin harus dipilih.',
            'gender.in' => 'Jenis kelamin harus jantan atau betina.',
            'birth_date.before_or_equal' => 'Tanggal lahir tidak boleh di masa depan.',
            'weight.numeric' => 'Berat harus berupa angka.',
            'weight.min' => 'Berat tidak boleh negatif.',
            'purchase_price.numeric' => 'Harga beli harus berupa angka.',
            'purchase_price.min' => 'Harga beli tidak boleh negatif.',
            'purchase_date.before_or_equal' => 'Tanggal pembelian tidak boleh di masa depan.',
        ];
    }
}