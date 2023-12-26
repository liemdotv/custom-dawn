import gulp from 'gulp';
import less from 'gulp-less';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import cleanCSS from 'gulp-clean-css';
// import del from 'del';

const assetsDir = `../assets/`;

const paths = {
  styles: {
    src: 'styles/**/*.less',
    dest: assetsDir,
  },
  scripts: {
    src: 'scripts/**/*.js',
    dest: assetsDir,
  },
};

/*
 * For small tasks you can export arrow functions
 */
// export const clean = () => del(['assets']);

/*
 * You can also declare named functions and export them as tasks
 */
export function styles() {
  return (
    gulp
      .src(paths.styles.src)
      .pipe(less())
      .pipe(cleanCSS())
      // pass in options to the stream
      .pipe(
        rename((path) => {
          path.basename = path.basename;
          path.extname = `.css`;
        })
      )
      .pipe(gulp.dest(paths.styles.dest))
  );
}

export function scripts() {
  return gulp
    .src(paths.scripts.src, { sourcemaps: true })
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('common.min.js'))
    .pipe(gulp.dest(paths.scripts.dest));
}

/*
 * You could even use `export as` to rename exported tasks
 */
function watchFiles() {
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.styles.src, styles);
}
export { watchFiles as watch };

const build = gulp.series(gulp.parallel(styles, scripts));
/*
 * Export a default task
 */
export default build;
