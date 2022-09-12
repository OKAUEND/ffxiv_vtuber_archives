module.exports = {
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extends: {},
    },
    plugins: [require('@tailwindcss/line-clamp')],
};
