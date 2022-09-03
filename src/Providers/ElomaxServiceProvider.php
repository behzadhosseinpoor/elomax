<?php
/** @noinspection PhpUndefinedMethodInspection */

/** @noinspection PhpUnused */

namespace Laravel\Elomax\Providers;

use Illuminate\Contracts\Debug\ExceptionHandler;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use Laravel\Elomax\Console\InstallCommand;
use Laravel\Elomax\Console\PublishCommand;
use Laravel\Elomax\Exceptions\Handler;
use Laravel\Elomax\Http\Middleware\Authorize;

class ElomaxServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any package services.
     *
     * @return void
     */
    public function boot(): void
    {
        $this->registerCommands();
        $this->registerPublishing();

        if (!Config::get('elomax.enabled')) {
            return;
        }

        Route::middlewareGroup('elomax', array_merge(Config::get('elomax.middleware', []), [
            Authorize::class
        ]));

        $this->registerRoutes();
        $this->loadViewsFrom(__DIR__ . '/../../resources/views', 'elomax');
        $this->loadTranslationsFrom(__DIR__ . '/../../lang', 'elomax');

        if (Request::is(Config::get('elomax.path') . '/api/*') && Request::wantsJson()) {
            $this->app->bind(ExceptionHandler::class, Handler::class);
        }
    }

    /**
     * Register the package routes.
     *
     * @return void
     */
    private function registerRoutes(): void
    {
        Route::group($this->routeConfiguration(), function () {
            $this->loadRoutesFrom(__DIR__ . '/../Http/routes.php');
        });
    }

    /**
     * Get the Elomax route group configuration array.
     *
     * @return array
     */
    private function routeConfiguration(): array
    {
        return [
            'domain' => Config::get('elomax.domain'),
            'namespace' => 'Laravel\Elomax\Http\Controllers',
            'prefix' => Config::get('elomax.path'),
            'middleware' => 'elomax',
        ];
    }

    /**
     * Register the package's publishable resources.
     *
     * @return void
     */
    private function registerPublishing(): void
    {
        if ($this->app->runningInConsole()) {
            $this->publishes([
                __DIR__ . '/../../public' => App::publicPath() . '/vendor/elomax',
            ], ['elomax-assets', 'laravel-assets']);

            $this->publishes([
                __DIR__ . '/../../config/elomax.php' => App::configPath('elomax.php'),
            ], 'elomax-config');

            $this->publishes([
                __DIR__ . '/../../stubs/ElomaxServiceProvider.stub' => App::path('Providers/ElomaxServiceProvider.php'),
            ], 'elomax-provider');
        }
    }

    /**
     * Register the package's commands.
     *
     * @return void
     */
    protected function registerCommands(): void
    {
        if ($this->app->runningInConsole()) {
            $this->commands([
                InstallCommand::class,
                PublishCommand::class,
            ]);
        }
    }

    /**
     * Register any package services.
     *
     * @return void
     */
    public function register(): void
    {
        $this->mergeConfigFrom(
            __DIR__ . '/../../config/elomax.php', 'elomax'
        );
    }
}
