var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var gulpif = require('gulp-if');
var minifyCSS = require('gulp-minify-css');
var csscomb = require('gulp-csscomb');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var prettify = require('gulp-jsbeautifier');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');

gulp.task('scss', function() {
	return gulp.src('app/scss/*.scss')
	.pipe(sourcemaps.init())
	.pipe(sass().on('error', sass.logError))
	.pipe(autoprefixer({
		browsers: ['last 5 versions', '>0%', 'ie 7'],
		cascade: false
	}))
	.pipe(csscomb())
	.pipe(prettify())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('app/css'));
});


// gulp.task('useref', function(){
// 	return gulp.src('app/*.html')
// 	.pipe(prettify())
// 	.pipe(useref())
// 	.pipe(gulpif('*.css', minifyCSS()))
// 	.pipe(gulpif('*.js', uglify({
// 		mangle: false
// 	})))
// 	.pipe(gulp.dest('dist/'));
// });

// gulp.task('watch', function() {
// 	gulp.watch('app/scss/**/*.*', ['scss']);
// 	gulp.watch('app/js/**/*.*', ['default']);
// });

gulp.task('default', ['scss']);



