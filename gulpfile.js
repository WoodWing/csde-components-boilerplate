const gulp = require('gulp');
const zip = require('gulp-zip');
const argv = require('yargs').argv;

const componentsValidator = require('@woodwing/csde-components-validator');

gulp.task('default', async () => {
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
    return gulp.watch('components/**/*', ['validate']);
});

gulp.task('validate', async () => {
    await componentsValidator.validateFolder('./components');
});
