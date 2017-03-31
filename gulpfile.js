var gulp = require('gulp')
var typescript = require('gulp-typescript')
var webpack = require('webpack-stream')
var browserSync = require('browser-sync').create()
var sass = require('gulp-sass')

gulp.task('build', function () {
   return gulp.src('src/ts/**/*.ts')
    .pipe(typescript('./tsconfig.json'))
    .pipe(gulp.dest('./src/.tmp'))
    .pipe(webpack({
        resolve: {
            root: [
                "./src/.tmp"
            ]
        },
        externals: {
            'paper': 'paper'
        }, 
        output: {
            filename: 'os.js'
        }
    }))
    //.pipe(uglify({}))
    .pipe(gulp.dest('./dist'))
})

gulp.task('build-watch', ['build'], function(done) {
    browserSync.reload();
    done();
})

gulp.task('sass', function () {
   gulp.src('src/sass/*.scss')
   .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
   .pipe(gulp.dest('./dist'))
   .pipe(browserSync.stream())
})

gulp.task('default', ['build', 'sass'], function() {

   browserSync.init({
      server: "./dist/",
      port: 4000,
      realoadDelay: 300
   });

   gulp.watch('src/sass/**/*.scss', ['sass'])
   gulp.watch('src/ts/**/*.ts', ['build-watch'])

})
