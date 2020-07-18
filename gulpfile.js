var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var rename = require("gulp-rename");
var pug = require('gulp-pug');
var browserSync = require('browser-sync').create();

gulp.task('sass', function(){
    return gulp.src('app/assets/sass/**/*.scss')
        .pipe(sass()) // Converts Sass to CSS with gulp-sass
        .pipe(gulp.dest('app/assets/css')) // Select destination to export
        .pipe(browserSync.stream());
})


//If you want minify your style.css file, just remove comments

/*gulp.task('cssnano', function(){
    return gulp.src('app/assets/css/style.css')
        .pipe(cssnano())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('app/assets/css'));
});*/

gulp.task('js', function(){
    return gulp.src('app/assets/js/main.js')
        .pipe(browserSync.stream());
})

gulp.task('pug', function(){
    return gulp.src('app/assets/pug/**/*.pug')
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest('app'))
});

gulp.task('watch', function(){
    browserSync.init({
        server: 'app',
  	}),
    gulp.watch('app/assets/sass/**/*.scss', gulp.series('sass')); 
    //gulp.watch('app/assets/css/style.css', gulp.series('cssnano')); 
    gulp.watch('app/assets/pug/**/*.pug', gulp.series('pug'), { ignoreInitial: false }); 
    gulp.watch('app/assets/js/main.js', gulp.series('js')); 
    gulp.watch('app/*.html').on('change', browserSync.reload);
})

gulp.task('default', gulp.series('watch'));
