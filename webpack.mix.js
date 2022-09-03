const mix = require("laravel-mix");
const tailwindcss = require("tailwindcss");

mix.setPublicPath("./public")
    .js("resources/js/app.js", "")
    .react()
    .sass("resources/sass/app.scss", "")
    .options({
        postCss: [tailwindcss("./tailwind.config.js")],
    })
    .sourceMaps()
    .version();
