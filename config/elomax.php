<?php

return [
    'domain' => env('ELOMAX_DOMAIN'),
    'path' => env('ELOMAX_PATH', 'elomax'),
    'enabled' => env('ELOMAX_ENABLED', true),
    'middleware' => [
        'web'
    ],
];
