<?php
/** @noinspection PhpUndefinedMethodInspection */

namespace Laravel\Elomax\Console;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Str;

class InstallCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'elomax:install';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Install all of the Elomax resources';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle(): void
    {
        $this->comment('Publishing Elomax Service Provider...');
        $this->callSilent('vendor:publish', ['--tag' => 'elomax-provider']);

        $this->comment('Publishing Elomax Assets...');
        $this->callSilent('vendor:publish', ['--tag' => 'elomax-assets']);

        $this->comment('Publishing Elomax Configuration...');
        $this->callSilent('vendor:publish', ['--tag' => 'elomax-config']);

        $this->registerElomaxServiceProvider();

        $this->info('Elomax scaffolding installed successfully.');
    }

    /**
     * Register the Elomax service provider in the application configuration file.
     *
     * @return void
     */
    protected function registerElomaxServiceProvider(): void
    {
        $namespace = Str::replaceLast('\\', '', $this->laravel->getNamespace());

        $appConfig = file_get_contents(App::configPath('app.php'));

        if (Str::contains($appConfig, $namespace . '\\Providers\\ElomaxServiceProvider::class')) {
            return;
        }

        $lineEndingCount = [
            "\r\n" => substr_count($appConfig, "\r\n"),
            "\r" => substr_count($appConfig, "\r"),
            "\n" => substr_count($appConfig, "\n"),
        ];

        $eol = array_keys($lineEndingCount, max($lineEndingCount))[0];

        file_put_contents(App::configPath('app.php'), str_replace(
            "$namespace\\Providers\RouteServiceProvider::class," . $eol,
            "$namespace\\Providers\RouteServiceProvider::class," . $eol . "        $namespace\Providers\ElomaxServiceProvider::class," . $eol,
            $appConfig
        ));

        file_put_contents(App::path('Providers/ElomaxServiceProvider.php'), str_replace(
            "namespace App\Providers;",
            "namespace $namespace\Providers;",
            file_get_contents(App::path('Providers/ElomaxServiceProvider.php'))
        ));
    }
}