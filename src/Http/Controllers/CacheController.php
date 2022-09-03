<?php /** @noinspection PhpUndefinedMethodInspection */

namespace Laravel\Elomax\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
use Laravel\Elomax\Http\Requests\Caches\IndexRequest;

class CacheController extends Controller
{
    public function index(IndexRequest $request): JsonResponse
    {
        $keys = [];
        $store = $request->input('store');
        $cache = Cache::store($store);

        if ($store === 'redis') {
            $keys = $cache->getRedis()->keys("*");
        }

        return $this->json(200, null, array_map(function ($key) {
            return [
                'key' => $key
            ];
        }, $keys));
    }
}
