const gulp = require('gulp');
const zip = require('gulp-zip');
const sass = require('gulp-sass');
const argv = require('yargs').argv;

const componentsValidator = require('@woodwing/csde-components-validator');

gulp.task('default', ['sass'], async () => {
    const valid = await componentsValidator.validateFolder('./components');
    if (!valid) {
        throw new Error('Package failed validation. See errors above.');
    }
    const name = require('./components/components-definition.json').name;
    gulp.src('components/**/*')
        .pipe(zip(`${name}.zip`))
        .pipe(gulp.dest('dist'));
});

gulp.task('dev', ['validate'], () => {
    const watcher = gulp.watch('components/**/*', ['validate']);
    watcher.on('ready', () => console.log('Watching for changes in components folder...'));
    return watcher;
});

gulp.task('validate', async () => {
    await componentsValidator.validateFolder('./components');
});

gulp.task('sass', function () {
    return gulp.src('./components/styles/design.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./components/styles/'));
});
