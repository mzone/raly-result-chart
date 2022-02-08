const mix = require('laravel-mix');

mix.setPublicPath('../')
.ts('resources/ts/app.tsx', 'public/js')
.sass('resources/sass/app.scss', 'public/css');
//_