module.exports = {
    mode: "jit",
    darkMode: "class",
    purge: [
        "./storage/framework/views/*.php",
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.vue",
    ],
    theme: {
        extend: {},
    },
    variants: {
        extend: {
            opacity: ['disabled'],
            ring: ["focus"],
        },
    },
    plugins: [],
};
