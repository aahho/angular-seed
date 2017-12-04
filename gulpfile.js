let gulp = require('gulp'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    uglify = require('gulp-uglify'),
    strip = require('gulp-strip-comments'),
    minifyCSS = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    inject = require('gulp-inject');

let gulpPaths = {
    "bc": "./bower_components/",
    "js": "./src/js/",
    "sass": "./src/scss/",
    "dist": "./dist/",
    "views": "./src/views/",
    "img": "./src/img/",
    "fonts": "./src/fonts/",
    "build": "./build/"
};

let app = function () {
    return gulp.src([
        gulpPaths.js + '**/*.js'
    ])
    .pipe(strip())
    .pipe(concat('index.js'))
    .pipe(gulp.dest(gulpPaths.dist + 'js'))
    .pipe(uglify())
    .pipe(rename('index.min.js'))
    .pipe(gulp.dest(gulpPaths.dist + 'js'));
};

let vendor = function () {
    return gulp.src([
        // add bower components js here
        gulpPaths.bc + 'jquery/dist/jquery.min.js',
        gulpPaths.bc + 'popper.js/dist/umd/popper.min.js',
        gulpPaths.bc + 'bootstrap/dist/js/bootstrap.min.js',
        gulpPaths.bc + 'angular/angular.min.js',
        gulpPaths.bc + 'angular-ui-router/release/angular-ui-router.min.js'
    ])
    .pipe(strip())
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(gulpPaths.dist + 'js'))
    .pipe(uglify())
    .pipe(rename('vendor.min.js'))
    .pipe(gulp.dest(gulpPaths.dist + 'js'));
};

let style = function () {
    return gulp.src([
        // Add css files from bower here
        gulpPaths.bc + 'bootstrap/dist/css/bootstrap.min.css',
    ])
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest(gulpPaths.dist+'css'))
    .pipe(plumber())
    .pipe(minifyCSS())
    .pipe(rename('vendor.min.css'))
    .pipe(gulp.dest(gulpPaths.dist+'css'))
};

let sassdist = function () {
    return gulp.src([
        gulpPaths.sass + 'main.scss'
    ])
    .pipe(sass().on('error', sass.logError))
    // .pipe(concat('index.css'))
    .pipe(gulp.dest(gulpPaths.dist+'css'))
    .pipe(plumber())
    .pipe(rename('index.min.css'))
    .pipe(gulp.dest(gulpPaths.dist+'css'));
};

let viewsdist = function () {
    return gulp.src([
        gulpPaths.views + '*'
    ])
    .pipe(strip())
    .pipe(gulp.dest(gulpPaths.dist+'views'));
};

let fonts = function () {
    return gulp.src([
        gulpPaths.fonts + '*'
    ])
    .pipe(gulp.dest(gulpPaths.dist+'fonts'));
};

let images = function () {
    return gulp.src([
        gulpPaths.img + '*'
    ])
    .pipe(gulp.dest(gulpPaths.dist+'img'));
};

let index = function () {
    var target = gulp.src('./src/index.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    var sources = gulp.src([
            './dist/js/vendor.min.js', 
            './dist/js/index.min.js', 
            './dist/css/style.min.css',
            './dist/css/index.min.css'
        ], 
        {read: false}
    );

    return target
    .pipe(inject(sources));
};

let index_build = function () {
    var target = gulp.src('./src/index.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    var sources = gulp.src([
            'js/vendor.min.js', 
            'js/index.min.js', 
            'css/style.min.css',
            'css/index.min.css'
        ], 
        {read: false}
    );

    return target
    .pipe(inject(sources));
};

gulp.task('app', app);
gulp.task('vendor', vendor);
gulp.task('style', style);
gulp.task('sass', sassdist);
gulp.task('views', viewsdist);
// gulp.task('fonts', fonts);
gulp.task('images', images);
gulp.task('index', index);

gulp.task('default', ['views', 'images', 'style', 'vendor', 'sass', 'app', 'index', 'watch']);

gulp.task('watch', function () {
    gulp.watch(gulpPaths.sass + '*.scss', ['sass']);
    gulp.watch(gulpPaths.js + '**/*.js', ['app']);
    gulp.watch(gulpPaths.views + '**/*.html', ['views']);
    gulp.watch(gulpPaths.fonts + '*', ['fonts']);
    gulp.watch(gulpPaths.img + '*', ['images']);
    // gulp.watch(gulpPaths.bc + '*', ['vendor', 'style']);
});



gulp.task('build', ['views', 'images', 'style', 'vendor', 'sass', 'app', 'index_build'], function () {
    
    return gulp.src([
        gulpPaths.dist + '*'
    ])
    .pipe(gulpPaths.build)
});
