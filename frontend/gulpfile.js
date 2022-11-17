// Include gulp
var gulp = require('gulp');

// Include Our Plugins
const sass = require('gulp-sass')(require('sass'));
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');

var sassFolder = [
    'src/assets/lib/**/*.css',
    'src/assets/scss/main.scss',
];

var destFolder = 'src/assets/main';

// Compile Our Sass
gulp.task('sass', function () {
    return gulp.src(sassFolder)
        .pipe(sass())
        .pipe(concat('main.css'))
        .pipe(sass())
        .pipe(gulp.dest(destFolder))
        .pipe(livereload());
});

// Compile Our JavaScript
var jsFolder = [
    'src/assets/lib/**/*.js',
    'src/assets/js/**/*',
]
gulp.task('js', function () {
    return gulp.src(jsFolder)
        .pipe(concat('main.js'))
        .pipe(gulp.dest(destFolder))
        .pipe(livereload());
});

// Watch Files For Changes
gulp.task('watch', function () {
    livereload.listen();
    gulp.watch('src/assets/scss/**/*', gulp.series('sass'));
    gulp.watch(sassFolder, gulp.series('sass'));
    gulp.watch(jsFolder, gulp.series('js'));
});

// Default Task
gulp.task('default', gulp.series('sass', 'js', 'watch'));