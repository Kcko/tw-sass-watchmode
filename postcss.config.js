// postcss.config.js
module.exports = (context) => ({
    parser: 'postcss-scss',
    plugins: {
        //'postcss-import': {},
        'postcss-easy-import': { prefix: '_', extensions: ['.css', '.scss'] },
        tailwindcss: {},
        autoprefixer: {},
        'postcss-advanced-variables': {},
        'postcss-nested': {},
        cssnano: context.env === 'prod' ? {} : false,
        'postcss-cachebuster': {
            imagesPath: '',
            cssPath: '/www/assets/css/',
        },
    },
});
