// const gulp = require('gulp');
// const sass = require('gulp-sass');

// sass.compiler = require('node-sass');

// gulp.task('sass',function() {
//     return gulp.src('./sass/*.scss')
//     .pipe(sass().on('error',sass.logError))
//     .pipe(gulp.dest('./css'));
// });

// gulp.task('sass:watch', function() {
//     return gulp.watch('./sass/*.scss',gulp.series('sass'))
// })

// gulp.task('default', gulp.series(['sass','sass:watch']));

var gulp = require("gulp");
var sass = require("gulp-sass");
var browserSync = require("browser-sync").create();
var useref = require("gulp-useref");
var uglify = require("gulp-uglify-es").default;
var gulpif = require("gulp-if");
var cssNano = require("gulp-cssnano");

gulp.task("default", ["watch"], function() {
  console.log("Hello World..");
});

gulp.task("sass", function() {
  console.log("sass");
  return gulp
    .src("app/assets/sass/*.scss")
    .pipe(sass())
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("app/assets/css"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

gulp.task("watch", ["sass", "useref", "browserSync"], function() {
  gulp.watch("app/assets/sass/*.scss", ["sass"]);
  gulp.watch("app/*.html", browserSync.reload);
  gulp.watch("app/assets/js/*.js", browserSync.reload);
});

gulp.task("browserSync", function() {
  browserSync.init({
    server: {
      baseDir: "dist"
    }
  });
});

gulp.task("useref", function() {
  return gulp
    .src("app/*.html")
    .pipe(useref())
    .pipe(gulpif("*.js", uglify()))
    .pipe(gulpif("*.css", cssNano()))
    .pipe(gulp.dest("dist/"));
});

gulp.task("build", ["watch"], function() {
  console.log("building files");
});
