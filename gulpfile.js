let gulp = require('gulp'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    uglify = require('gulp-uglify'),
    strip = require('gulp-strip-comments'),
    minifyCSS = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename');

let gulpPaths = {
    "bc": "./bower_components/",
    "js": "./src/js/",
    "sass": "./src/scss/",
    "build": "./build/",
    "views": "./src/views/",
    "img": "./src/img/",
    "fonts": "./src/fonts/"
};

let app = function () {
    return gulp.src([
        gulpPaths.js + '**/*.js'
    ])
    .pipe(strip())
    .pipe(concat('index.js'))
    .pipe(gulp.dest(gulpPaths.build + 'js'))
    .pipe(uglify())
    .pipe(rename('index.min.js'))
    .pipe(gulp.dest(gulpPaths.build + 'js'));
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
    .pipe(gulp.dest(gulpPaths.build + 'js'))
    .pipe(uglify())
    .pipe(rename('vendor.min.js'))
    .pipe(gulp.dest(gulpPaths.build + 'js'));
};

let style = function () {
    return gulp.src([
        // Add css files from bower here
        gulpPaths.bc + 'bootstrap/dist/css/bootstrap.min.css',
    ])
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest(gulpPaths.build+'css'))
    .pipe(plumber())
    .pipe(minifyCSS())
    .pipe(rename('vendor.min.css'))
    .pipe(gulp.dest(gulpPaths.build+'css'))
};

let sassBuild = function () {
    return gulp.src([
        gulpPaths.sass + 'main.scss'
    ])
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('index.css'))
    .pipe(gulp.dest(gulpPaths.build+'css'))
    .pipe(plumber())
    .pipe(rename('index.min.css'))
    .pipe(gulp.dest(gulpPaths.build+'css'));
};

let viewsBuild = function () {
    return gulp.src([
        gulpPaths.views + '*'
    ])
    .pipe(strip())
    .pipe(gulp.dest(gulpPaths.build+'views'));
};

let fonts = function () {
    return gulp.src([
        gulpPaths.fonts + '*'
    ])
    .pipe(gulp.dest(gulpPaths.build+'fonts'));
};

let images = function () {
    return gulp.src([
        gulpPaths.img + '*'
    ])
    .pipe(gulp.dest(gulpPaths.build+'img'));
};

let index = function () {
    return gulp.src([
        './index.html'
    ])
    .pipe(gulp.dest(gulpPaths.build));
};

gulp.task('app', app);
gulp.task('vendor', vendor);
gulp.task('style', style);
gulp.task('sass', sassBuild);
gulp.task('views', viewsBuild);
gulp.task('fonts', fonts);
gulp.task('images', images);
gulp.task('index', index);

gulp.task('default', ['views', 'images', 'fonts', 'style', 'vendor', 'sass', 'app', 'index', 'watch']);

gulp.task('watch', function () {
    gulp.watch(gulpPaths.sass + '*.scss', ['sass']);
    gulp.watch(gulpPaths.js + '**/*.js', ['app']);
    gulp.watch(gulpPaths.views + '**/*.html', ['views']);
    gulp.watch(gulpPaths.fonts + '*', ['fonts']);
    gulp.watch(gulpPaths.img + '*', ['images']);
    // gulp.watch(gulpPaths.bc + '*', ['vendor', 'style']);
});
