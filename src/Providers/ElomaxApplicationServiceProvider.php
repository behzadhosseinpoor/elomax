<?php
/** @noinspection PhpUnused */

namespace Laravel\Elomax\Providers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;
use Laravel\Elomax\Elomax;

class ElomaxApplicationServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot(): void
    {
        $this->authorization();
    }

    /**
     * Configure the Elomax authorization services.
     *
     * @return void
     */
    protected function authorization(): void
    {
        $this->gate();

        Elomax::auth(function (Request $request) {
            return App::isLocal() || Gate::check('viewElomax', [$request->user()]);
        });
    }

    /**
     * Register the Elomax gate.
     *
     * This gate determines who can access Elomax in non-local environments.
     *
     * @return void
     */
    protected function gate(): void
    {
        Gate::define('viewElomax', function ($user) {
            return in_array($user->email, [
                //
            ]);
        });
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register(): void
    {
        //
    }
}
