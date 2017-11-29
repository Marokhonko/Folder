var gulp = require('gulp'),
sass = require('gulp-sass'),
browserSync = require('browser-sync'),
concat = require('gulp-concat'),
uglify = require('gulp-uglify')
cssnano = require('gulp-cssnano')
rename = require('gulp-rename');//connect gulp

// компиляция сас
gulp.task('sass',function(){
	return gulp.src('app/sass/**/*.sass')
	.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream:true})) // стрим авторелоада(инжект);
	
})

	gulp.task('scripts', function(){
		return gulp.src([
			'app/libs/jquery/dist/jquery.min.js'
			])
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('app/js'))

	})


	gulp.task('css-min',function(){
		return gulp.src('app/css/main.css')
		.pipe(cssnano())
		.pipe(rename({suffix:'.min'}))
		.pipe(gulp.dest('app/css/'))
	})


// отслежование релоадов
gulp.task('browser-sync',function(){
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

// просмотр изминений(отслежование)
gulp.task('watch',['browser-sync','css-min', 'scripts' , 'sass'],function(){
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/.js', browserSync.reload);
})



// gulp.task('mytask',function(){ // create task
// 	return gulp.src('source-files') // tacke file
// 	.pipe(plugin()) // do something with file
// 	.pipe(gulp.dest('folder')) // output file
// });