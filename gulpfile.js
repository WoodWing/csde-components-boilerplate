const gulp = require('gulp');
const zip = require('gulp-zip');
const argv = require('yargs').argv;

gulp.task('default', () => {
    const name = require('./components/components-definition.json').name;
    gulp.src('components/*')
        .pipe(zip(`${name}.zip`))
        .pipe(gulp.dest('dist'))
});