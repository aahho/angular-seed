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
    "dist": "./dist/",
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
    .pipe(gulp.dest(gulpPaths.dist + 'js'))
    .pipe(uglify())
    .pipe(rename('index.min.js'))
    .pipe(gulp.dest(gulpPaths.dist + 'js'));
};

let vendor = function () {
    return gulp.src([
        // add bower components js here
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
    ])
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest(gulpPaths.dist+'css'))
    .pipe(plumber())
    .pipe(rename('vendor.min.css'))
    .pipe(gulp.dest(gulpPaths.dist+'css'))
};

let sassBuild = function () {
    return gulp.src([
        gulpPaths.sass + 'main.scss'
    ])
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('index.css'))
    .pipe(gulp.dest(gulpPaths.dist+'css'))
    .pipe(plumber())
    .pipe(rename('index.min.css'))
    .pipe(gulp.dest(gulpPaths.dist+'css'));
};

let viewsBuild = function () {
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

gulp.task('app', app);
gulp.task('vendor', vendor);
gulp.task('style', style);
gulp.task('sass', sassBuild);
gulp.task('views', viewsBuild);
gulp.task('fonts', fonts);
gulp.task('images', images);

gulp.task('default', ['views', 'images', 'fonts', 'style', 'vendor', 'sass', 'app']);

gulp.task('watch', function () {
    gulp.watch(gulpPaths.sass + '*.scss', ['sass']);
    gulp.watch(gulpPaths.js + '**/*.js', ['app']);
    gulp.watch(gulpPaths.views + '**/*.html', ['views']);
    gulp.watch(gulpPaths.fonts + '*', ['fonts']);
    gulp.watch(gulpPaths.img + '*', ['images']);
    // gulp.watch(gulpPaths.bc + '*', ['vendor', 'style']);
});
