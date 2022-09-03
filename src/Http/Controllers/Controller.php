<?php

namespace Laravel\Elomax\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    public function json($status, $message = null, $result = null): JsonResponse
    {
        $response = [
            'status' => $status
        ];

        if (!is_null($message)) {
            $response['message'] = $message;
        }

        if (!is_null($result)) {
            $response['result'] = $result;
        }

        return response()->json($response, $response['status'], ['Content-Type' => 'application/json;charset=utf8'], JSON_UNESCAPED_UNICODE);
    }
}
