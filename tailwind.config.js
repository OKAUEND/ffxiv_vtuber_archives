module.exports = {
    mode: 'jit',
    purge: {
        content: ['./pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
    },

    theme: {
        extends: {
            gridTemplateRows:{
                footer:"auto 1fr auto"
            }
        },
    },
    plugins: [],
};
