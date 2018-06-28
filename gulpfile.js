const path = require('path');
const fs = require('fs');
const {promisify} = require('util');
const gulp = require('gulp');
const zip = require('gulp-zip');
const sass = require('gulp-sass');
const UglifyJS = require("uglify-js");

const componentsValidator = require('@woodwing/csde-components-validator');

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

// Scripts bundled into a single vendor.js
const scriptsDir = path.join(__dirname, './scripts')
const scriptFiles = [
  path.join(scriptsDir, 'dpsHTMLGestureAPI.min.js'),
  path.join(scriptsDir, 'jquery.js'),
  path.join(scriptsDir, 'jquery.mobile.options.js'),
  path.join(scriptsDir, 'jquery.mobile.js'),
  path.join(scriptsDir, 'jssor.js'),
  path.join(scriptsDir, 'jssor.slider.js'),
  path.join(scriptsDir, 'fullscreen.support.js'),
  path.join(scriptsDir, 'slideshow.js'),
  path.join(scriptsDir, 'heroes.js'),
  path.join(scriptsDir, 'video.js')
]

gulp.task('default', ['sass', 'vendor-script'], async () => {
    const valid = await componentsValidator.validateFolder('./components');
    if (!valid) {
        throw new Error('Package failed validation. See errors above.');
    }
    const name = require('./components/components-definition.json').name;
    gulp.src('components/**/*')
        .pipe(zip(`${name}.zip`))
        .pipe(gulp.dest('dist'));
});

gulp.task('dev', ['validate', 'vendor-script'], () => {
    const watcher = gulp.watch('components/**/*', ['validate']);
    watcher.on('ready', () => console.log('Watching for changes in components folder...'));
    return watcher;
});

gulp.task('validate', async () => {
    await componentsValidator.validateFolder('./components');
});

gulp.task('sass', () => {
    return gulp.src('./components/styles/design.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./components/styles/'));
});

gulp.task('vendor-script', async () => {
    // Concat files
    let content = '';
    for (let i = 0; i < scriptFiles.length; i++) {
        content += (await readFileAsync(scriptFiles[i])).toString() + '\n';
    }
    // Uglify result
    const result = UglifyJS.minify(content);
    if (result.error) {
        throw new Error(result.error.message);
    }
    // Write to vendor.js script
    const targetFolder = './components/scripts';
    if (!fs.existsSync(targetFolder)){
        fs.mkdirSync(targetFolder);
    }
    await writeFileAsync(path.join(targetFolder, 'vendor.js'), result.code);
});