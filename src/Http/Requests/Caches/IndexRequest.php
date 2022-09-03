<?php

namespace Laravel\Elomax\Http\Requests\Caches;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Config;

class IndexRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'store' => 'bail|required|string|in:' . implode(',', array_keys(Config::get('cache.stores'))),
        ];
    }
}
