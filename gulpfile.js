var gulp = require('gulp');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var jsmin = require('gulp-jsmin');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var watch = require('gulp-watch');

gulp.task('sass', function () {
	return gulp.src('./node_modules/normalize.scss/normalize.scss')
	.pipe(rename({prefix: '_'}))
	.pipe(gulp.dest('./src/scss')) && gulp.src('./src/scss/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(cssmin())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('build/css'));
	});

gulp.task('js', function () {
	gulp.src('./src/*/*.js')
	.pipe(jsmin())
	.pipe(gulp.dest('build'));
	});

gulp.task('fonts', function(){
	return gulp.src('./src/fonts/**/*')
	.pipe(gulp.dest('build/fonts'));
	});

gulp.task('img', function(){
	return gulp.src('./src/img/*')
	.pipe(imagemin())
	.pipe(gulp.dest('build/img'))
	});

gulp.task('watch', ['sass', 'js'], function () {
	gulp.watch('./src/scss/*.scss', ['sass']);
	gulp.watch('./src/*/*.js');
	});
gulp.task('build', function () {
	gulp.start('sass', 'js', 'img', 'fonts');
	});
gulp.task('default', ['watch'], function() {
   gulp.start('sass', 'js');
 });