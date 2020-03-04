let mix = require('laravel-mix');
const env = process.env.NODE_ENV;

const startPath = '/testing/php-stylus-mix-template/';
const viewsFolder = '.';
const assetsFolder = '.';
const publicFolder = 'dist/'

// BrowserSync
const browserSyncOptions = {
  proxy: 'localhost',
  startPath: startPath,
  reloadDelay: 1000,
  watch: true,
  reload: true,
  notify: false,
  files: [
    `${publicFolder}/**/*.js`,
    `${publicFolder}/**/*.css`,
    `${viewsFolder}/**/*.php`,
  ]
};


// Javascript
let $jsFiles = [
  `${assetsFolder}/scripts/header.js`,
  `${assetsFolder}/scripts/scripts.js`,  
  `${assetsFolder}/scripts/misc.js`
];
mix.js($jsFiles, 'dist/scripts/scripts.js');

// CSS, Stylus
mix.stylus(
  `${assetsFolder}/style.styl`, 
  `${publicFolder}/style.css`)
.options({
  autoprefixer: {
    options: {
      browsers: ['> 0.5%']
    }
  }
});

mix.stylus( 
   `${assetsFolder}/fonts/fonts.styl`,
   `${publicFolder}/css/fonts/fonts.css`
);

mix.browserSync(browserSyncOptions);