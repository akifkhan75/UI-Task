const gulp = require("gulp");
const sass = require("gulp-sass");

sass.compiler = require("node-sass");

gulp.task("sass", function() {
  return gulp
    .src("./sass/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./css"));
});

gulp.task("sass:watch", function() {
  return gulp.watch("./sass/*.scss", gulp.series("sass"));
});

gulp.task("default", gulp.series(["sass", "sass:watch"]));
