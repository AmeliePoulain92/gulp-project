var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var gulpif = require('gulp-if');
var minifyCSS = require('gulp-minify-css');
var csscomb = require('gulp-csscomb');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var prettify = require('gulp-jsbeautifier');
var clean = require('gulp-clean');
var rigger = require('gulp-rigger');
var browserSync = require('browser-sync');
var bsReload = browserSync.reload;
var useref = require('gulp-useref');
var svgSprite = require("gulp-svg-sprites");
var spritesmith = require('gulp.spritesmith');
var wiredep = require('wiredep').stream;
var sftp = require('gulp-sftp');


// ======== APP ==========================================================================================================

// =========== html:app ================
gulp.task('rigger:app', function(){
	return gulp.src('app/template-modules/*.html')
	.pipe(rigger())
	.pipe(gulp.dest('app/'))
});
// =========== END:html:app ================

// =========== html:app ================
gulp.task('html:app', function(){
	return gulp.src('app/template-modules/*.html')
	.pipe(rigger())
	.pipe(gulp.dest('app/'))
	.pipe(bsReload({stream:true}));
});
// =========== END:html:app ================

// =========== scss:app ================
gulp.task('scss:app', function() {
	return gulp.src('app/scss/**/*.scss')
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
	.pipe(gulp.dest('app/css'))
	.pipe(bsReload({stream:true}));
});
// =========== END:scss:app ================

// =========== js:app ================
gulp.task('js:app', function(){
	return gulp.src('app/js/js-modules/*.js')
	.pipe(rigger())
	.pipe(gulp.dest('app/js'))
	.pipe(bsReload({stream:true}));
});
// =========== END:js:app ================

// =========== sprite-svg:app ================
gulp.task('sprite-svg:app', function(){
	gulp.src('./app/img/**/*.svg')
	.pipe(svgSprite({
		preview: false,
		svg: {
    	    sprite: 'sprite.svg',
		},
		svgPath: '../img/sprite.svg',
    	cssFile: '../../app/scss/assets/_sprite-svg.scss',
    	templates: {
	    	scss: true
	    },
	}))
	.pipe(gulp.dest('./app/img'));
});
// =========== END:sprite-svg:app ================

// =========== sprite-png:app ================
gulp.task('sprite-png:app', function(){
	var spriteData = 
    gulp.src('./app/img/sprite-png/**/*.png') 
      .pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: '_sprite-png.scss',
        imgPath: '../img/sprite.png'
      }));
  	spriteData.img.pipe(gulp.dest('./app/img/')); 
  	spriteData.css.pipe(gulp.dest('./app/scss/assets/')); 
});
// =========== END:sprite-png:app ================

// ===========:bower:app ================
gulp.task('bower:app', function () {
    gulp.src('app/template-modules/template-assets/**/*.html')
      .pipe(wiredep({
        'ignorePath': '../../',
        directory : "app/bower_components",
        packages:
          {
            js: [ 'bower_components/' ],
            css: [ 'bower_components/' ]
          }
      }))
      .pipe(gulp.dest('app/template-modules/template-assets/'))
      .pipe(bsReload({stream:true}));
  });
// ===========:END:bower:app ================

// ======== END:APP ==========================================================================================================

// ======== DIST ==========================================================================================================

// =========== clean:dist ================
gulp.task('clean:dist', function(){
	return gulp.src('dist/')
	.pipe(clean());
});
// =========== END:clean:dist ================

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

gulp.task('cssMinify:dist', function(){
	return gulp.src('dist/css/**/*.css')
	.pipe(minifyCSS())
	.pipe(gulp.dest('dist/css'));
});
// =========== END:css:dist ================

// =========== js:dist ================
gulp.task('js:dist', function(){
	return gulp.src('app/*.js')
	.pipe(prettify())
	.pipe(gulp.dest('dist/js'));
});


gulp.task('jsUglify:dist', function(){
	return gulp.src('dist/js/**/*.js')
	.pipe(uglify({
		mangle: false
	}))
	.pipe(gulp.dest('dist/js'));
});

// =========== END:js:dist ================

// =========== img:dist ================
gulp.task('img:dist', function(){
	gulp.src('app/img/**/*')
	.pipe(gulp.dest('dist/img/'));
});
// =========== END:img:dist ================

// =========== fonts:dist ================
gulp.task('fonts:dist', function(){
	gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts/'));
});
// =========== END:fonts:dist ================

// =========== DIST ============================================================================
gulp.task('dist', ['clean:dist'], function(){
	gulp.start('html:dist');
	gulp.start('css:dist');
	gulp.start('js:dist');
	gulp.start('img:dist');
	gulp.start('fonts:dist');
	gulp.start('bower:app');
});
// =========== END:DIST ============================================================================

// ======== browserSync ===================
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
// ======== END:browserSync ===================


// ======== sftp ===================
gulp.task('sftp', function () {
   return gulp.src('dist/')
   .pipe(sftp({
      host: 'mashina.ftp.ukraine.com.ua',
      user: 'mashina_artururian',
      pass: '3ck61o4j',
      port: 21,
      remotePath: '/apple/gulp-test/'
   }));
});
// ======== END:sftp ===================

// ======== watch ===================
gulp.task('watch', function() {
	gulp.watch('app/scss/**/*.scss', ['scss:app']);
	gulp.watch(['app/template-modules/**/*.html'],['html:app']);
	gulp.watch('app/js/**/*.js', ['js:app']);
	gulp.watch(['bower.json'],['bower:app']);
});
// ======== END:watch ===================

// ======== default ===================
gulp.task(
	'default', 
	['bower:app', 'scss:app', 'js:app', 'rigger:app', 'watch'], 
	function(){
		gulp.start('browserSync');
	}
);
// ======== default ===================






