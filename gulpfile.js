const gulp = require('gulp');
const babel = require('gulp-babel');
const connect = require('gulp-connect');
const babelify = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

gulp.task('babel', () => {
	browserify([
			'src/js/main.js'
		])
		.transform('babelify', {
			presets: ['es2015']
		})
		.bundle()
		.pipe(source('main.js'))
		.pipe(buffer())
		.pipe(gulp.dest('build/'));
});

gulp.task('connect', function() {
    connect.server({
        root: './',
        livereload: true
    });
});

gulp.task('html', () => {
    return gulp.src('index.html')
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch(['./*.html'], ['html']);
    gulp.watch('src/js/**/*.js', ['babel']);
});

gulp.task('development', ['babel', 'connect', 'watch'])