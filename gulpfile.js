var gulp = require('gulp');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var watch = require('gulp-watch');

gulp.task('sass', function () {
	return gulp.src('./src/scss/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(cssmin())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('dist/css'));
	});

gulp.task('fonts', function(){
	return gulp.src('./src/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'));
	});

gulp.task('img', function(){
	return gulp.src('./src/img/*')
	.pipe(imagemin())
	.pipe(gulp.dest('dist/img'))
	});

gulp.task('watch', ['sass'], function () {
	gulp.watch('./src/scss/*.scss', ['sass']);
	});
gulp.task('build', function () {
	gulp.start('sass', 'img', 'fonts');
	});
gulp.task('default', ['watch'], function() {
   gulp.start('sass');
 });