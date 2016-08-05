var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');

var spritesmith = require('gulp.spritesmith');
gulp.task('sass',function(){
    return gulp.src('app/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
        stream: true
    }))
})

gulp.task('browserSync',function(){
     browserSync.init({
        server: {
            baseDir:'app'
        },
     })

})

gulp.task('watch',function(){
    gulp.watch('app/scss/**/*.scss',['sass* ']);
    gulp.watch('app/*.html',browserSync.reload);
    gulp.watch('app/js/**/*.js',browserSync.reload);
    gulp.watch(['app/images/sprites/**.*.png'],['sprite']);

})

gulp.task('useref',function(){
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js',uglify()))
        .pipe(gulpIf('*.css',cssnano()))
        .pipe(gulp.dest('dist'))
});

gulp.task('sprite',function(){
    var spriteData = gulp.src('app/images/sprites/*.png')
        .pipe(spritesmith({
            imgName:'../images/sprite.png',
            cssName:'sprite.css'
        }));
    spriteData.img.pipe(gulp.dest('app/images'));
    spriteData.css.pipe(gulp.dest('app/css'));

})

gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/images'))
});

gulp.task('fonts',function(){
    return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
})

gulp.task('clean:dist',function(){
    return del.sync('dist');
})

// gulp.task('cache:clear',function(callback){
//     return cache.clearAll(callback)
// })



gulp.task('default',function(callback){
    runSequence(['sass','browserSync','watch'],
        callback
        )
})

gulp.task('build',function(callback){
    runSequence('clean:dist',
        ['sass','useref','images','fonts'],
        callback
        )
})