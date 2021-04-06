const gulp = require("gulp");
const sass = require("gulp-sass");

const browserSync = require("browser-sync").create();

sass.compiler = require("node-sass");

gulp.task("sass", function() {
  return gulp
    .src("./sass/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("./css"))
    .pipe(browserSync.stream());
});

gulp.task("sass:watch", function() {
  return gulp.watch("./sass/*.scss", gulp.series("sass"));
});

gulp.task("serve", ["sass"], function() {
  browserSync.init({
    server: "./",
    port: "3000"
  });

  gulp.watch("./sass/*.scss", ["sass"]);
  gulp.watch("./*.html").on("change", browserSync.reload);
});

gulp.task("default", ["serve"]);
