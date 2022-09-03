<?php

namespace Laravel\Elomax\Exceptions;

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Exceptions\ThrottleRequestsException;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Lang;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\File\Exception\FileNotFoundException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    protected $dontReport = [
        ElomaxException::class
    ];

    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    public function register(): void
    {
        $this->reportable(function (Throwable $e) {

        });

        $this->renderable(function (Throwable $e) {
            $response = $this->handleException($e);

            return response()->json($response, $response['status'], ['Content-Type' => 'application/json;charset=utf8'], JSON_UNESCAPED_UNICODE);
        });
    }

    private function handleException(Throwable $exception): array
    {
        $response['status'] = method_exists($exception, 'getStatusCode') ? $exception->getStatusCode() : 500;

        if ($exception instanceof AuthenticationException) {
            $response['status'] = 401;
        }

        if ($exception instanceof AuthorizationException) {
            $response['status'] = 403;
        }

        if ($exception instanceof FileNotFoundException) {
            $response['status'] = 404;
        }

        if ($exception instanceof ModelNotFoundException || $exception instanceof NotFoundHttpException) {
            $response['status'] = 404;
        }

        if ($exception instanceof ValidationException) {
            $response['status'] = 400;
        }

        $response['message'] = App::isLocal() ? (empty($exception->getMessage()) ? trans("elomax::errors.err{$response['status']}", [], 'en') : $exception->getMessage()) : trans("elomax::errors.err{$response['status']}", [], 'en');

        if ($exception instanceof ValidationException) {
            $response['message'] = $exception->validator->messages()->first() ?: $response['message'];
        }

        if (get_class($exception) === EloMaxException::class) {
            $response['message'] = $exception->getMessage() ?: $response['message'];
        }

        if ($exception instanceof ThrottleRequestsException) {
            $response['message'] = Lang::get('auth.throttle', ['seconds' => $exception->getHeaders()['Retry-After']]);
        }

        return $response;
    }
}
