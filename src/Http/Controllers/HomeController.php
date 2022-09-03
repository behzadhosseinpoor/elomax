<?php

namespace Laravel\Elomax\Http\Controllers;

use Illuminate\Contracts\View\View;
use Laravel\Elomax\Elomax;

class HomeController extends Controller
{
    /**
     * Display the Elomax view.
     *
     * @return View
     */
    public function index(): View
    {
        return view('elomax::layout', [
            'elomaxScriptVariables' => Elomax::scriptVariables(),
        ]);
    }
}
