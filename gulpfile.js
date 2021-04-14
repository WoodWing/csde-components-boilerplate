const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const gulp = require('gulp');
const zip = require('gulp-zip');
const UglifyJS = require('uglify-js');
const sass = require('node-sass');

const componentsValidator = require('@woodwing/studio-component-set-tools/dist/validate');

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

// Scripts bundled into a single vendor.js
// You can choose to remove scripts in case they are not needed
// for your components.
const scriptsDir = path.join(__dirname, './scripts');
const scriptFiles = [
    // JQuery libraries used by below support scripts
    path.join(scriptsDir, 'jquery.js'),

    // Support scripts for slideshows components
    path.join(scriptsDir, 'jssor.js'),
    path.join(scriptsDir, 'jssor.slider.js'),
    path.join(scriptsDir, 'slideshow.js'),

    // Support script for parallax effect hero components
    path.join(scriptsDir, 'heroes.js'),
];
const stylesDir = path.join(__dirname, './components/styles');

buildScssString = (componentName) => {
    return `@import "${componentName}";\n`;
};

function getComponentDefinition() {
    return require('./components/components-definition.json');
}

/**
 * Runs component set validation, but throws no error.
 * Errors are written to stdout.
 */
async function validateNoBail() {
    await componentsValidator.validateFolder('./components');
}

/**
 * Runs component set validation and throws error when something is wrong.
 */
async function validate() {
    const valid = await componentsValidator.validateFolder('./components');
    if (!valid) {
        throw new Error('Package failed validation. See errors above.');
    }
}

/**
 * Generates design.scss from style files.
 */
async function generateDesignFile() {
    let componentNames;

    try {
        const definition = getComponentDefinition();
        componentNames = definition.components.map((compDef) => compDef.name);
    } catch (e) {
        // Don't fail task, but let the components validator generate the actual error,
        // in case the component definition is malformed.
        console.error('Failed to generate design.scss file: \n', e);
        return;
    }

    let content = `/*
* This file has been generated while building the components package.
* PLEASE DO NOT MODIFY THIS FILE BY HAND.
*/\n${buildScssString('common')}`;

    for (componentName of componentNames) {
        content += buildScssString(componentName);
    }

    await writeFileAsync(path.join(stylesDir, 'design.scss'), content);
}

/**
 * Compiles design.scss.
 */
async function compileDesignFile() {
    await generateDesignFile();
    const result = await promisify(sass.render)({
        file: path.join(stylesDir, 'design.scss'),
    });
    await writeFileAsync(path.join(stylesDir, 'design.css'), result.css);
}

/**
 * Generates vendor script by concatenating and uglifying the result.
 */
async function generateVendorScript() {
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
    if (!fs.existsSync(targetFolder)) {
        fs.mkdirSync(targetFolder);
    }
    await writeFileAsync(path.join(targetFolder, 'vendor.js'), result.code);
}

/**
 * Creates component set zip.
 */
function buildComponentSetZip() {
    const name = getComponentDefinition().name;
    return gulp
        .src(['components/**/*', '!components/**/tms-timestamp'])
        .pipe(zip(`${name}.zip`))
        .pipe(gulp.dest('dist'));
}

/**
 * Watch for changes and re-run component set validation.
 */
function watch() {
    const watcher = gulp.watch('components/**/*', gulp.series(validateNoBail));
    watcher.on('ready', () => console.log('Watching for changes in components folder...'));
    return watcher;
}

const build = gulp.series(gulp.parallel(compileDesignFile, generateVendorScript), validate, buildComponentSetZip);

const dev = gulp.series(gulp.parallel(compileDesignFile, generateVendorScript), watch);

/*
 * Validate component set and produce a zip for uploading in the CS Management Console.
 */
gulp.task('build', build);

/*
 * Validate component set when there are changes.
 */
gulp.task('dev', dev);

/*
 * Define default task that can be called by just running `gulp` from cli
 */
gulp.task('default', build);
