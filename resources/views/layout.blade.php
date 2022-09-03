<!doctype html>
<html lang="en">
<head>
    <base href="/{{ config('elomax.path') }}">
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="robots" content="noindex, nofollow">
    <link rel="shortcut icon" href="{{ asset('/vendor/elomax/favicon.ico') }}">
    <link href="{{ asset('/vendor/elomax/app.css') }}" rel="stylesheet" type="text/css">
    <title>Elomax{{ config('app.name') ? ' - ' . config('app.name') : '' }}</title>
    <style>
        body {
            background-color: #f7faff;
        }
    </style>
</head>
<body>
<div id="root"></div>
<script>
    window.Elomax = @json($elomaxScriptVariables);
</script>
<script src="{{ asset('/vendor/elomax/app.js') }}" defer></script>
</body>
</html>
