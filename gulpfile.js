var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var gulpif = require('gulp-if');
var minifyCSS = require('gulp-minify-css');
var csscomb = require('gulp-csscomb');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var prettify = require('gulp-jsbeautifier');
var rigger = require('gulp-rigger');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');


// ======== APP ==========================================================================================================

// =========== scss:app ================
gulp.task('scss:app', function() {
	return gulp.src('app/scss/*.scss')
	.pipe(sourcemaps.init())
	.pipe(sass().on('error', sass.logError))
	.pipe(autoprefixer({
		browsers: ['last 5 versions', '>0%', 'ie 7'],
		cascade: false
	}))
	.pipe(csscomb())
	.pipe(prettify())
	.pipe(sourcemaps.write(
		'../scss/sourcemaps'
	))
	.pipe(gulp.dest('app/css'));
});
// =========== END:scss:app ================

// =========== js:app ================
gulp.task('js:app', function(){
	return gulp.src('app/js/js-modules/*.js')
	.pipe(rigger())
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({
		stream: true
	}));
});
// =========== END:js:app ================


// =========== html:app ================
gulp.task('html:app', function(){
	return gulp.src('app/template-modules/*.html')
	.pipe(rigger())
	.pipe(prettify())
	.pipe(gulp.dest('app/'));
});
// =========== END:html:app ================

// ======== END:APP ==========================================================================================================





// ======== DIST ==========================================================================================================

// =========== html:dist ================
gulp.task('html:dist', function(){
	return gulp.src('app/*.html')
	.pipe(prettify())
	.pipe(useref())
	.pipe(gulp.dest('dist/'));
});
// =========== END:html:dist ================

// =========== css:dist ================
gulp.task('css:dist', function(){
	return gulp.src('app/*.css')
	.pipe(prettify())
	.pipe(gulp.dest('dist/css'));
});
// =========== END:css:dist ================

// =========== js:dist ================
gulp.task('js:dist', function(){
	return gulp.src('app/*.js')
	.pipe(prettify())
	.pipe(gulp.dest('dist/js'));
});
// =========== END:js:dist ================

// =========== img:dist ================
gulp.task('img:dist', function(){
	gulp.src('app/img/')
	.pipe(gulp.dest('dist/'));
});
// =========== END:img:dist ================

// =========== fonts:dist ================
gulp.task('fonts:dist', function(){
	gulp.src('app/fonts/')
	.pipe(gulp.dest('dist/'));
});
// =========== END:fonts:dist ================

// =========== DIST ============================================================================
gulp.task('dist', function(){
	gulp.start('html:dist');
	gulp.start('css:dist');
	gulp.start('js:dist');
	gulp.start('img:dist');
	gulp.start('fonts:dist');
});
// =========== END:DIST ============================================================================

gulp.task('browserSync', function() {
	browserSync({
		server: {
			baseDir: './app'
		},
		port: 3000,
		open: true,
		browser: 'default',
		startPath: '/',
		notify: false,
	});
});

gulp.task('watch', function() {
	gulp.watch('app/scss/**/*.scss', ['scss:app']);
	gulp.watch("app/*.html").on('change', browserSync.reload);
	gulp.watch('app/js/**/*.js', ['js:app']);
});

gulp.task(
	'default', 
	[
		'scss:app', 
		'js:app',
		'html:app',
		'watch',
		'browserSync', 
	]
);







