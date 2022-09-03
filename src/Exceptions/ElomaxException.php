<?php

namespace Laravel\Elomax\Exceptions;

use Symfony\Component\HttpKernel\Exception\HttpException;

class ElomaxException extends HttpException
{
    private $statusCode;

    public function __construct($statusCode = 500, string $message = null)
    {
        $this->statusCode = intval($statusCode);

        parent::__construct($this->statusCode, $message);
    }

    public function getStatusCode(): int
    {
        return $this->statusCode;
    }

    public function report(): bool
    {
        return false;
    }
}
