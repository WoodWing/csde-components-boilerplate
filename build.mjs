import fs from 'node:fs/promises';
import fsCallback from 'node:fs';
import path from 'path';
import sass from 'sass';
import UglifyJS from 'uglify-js';
import archiver from 'archiver';
import { validateFolder } from '@woodwing/studio-component-set-tools/dist/validate.js';

const componentSetsDirectory = 'component-sets';

export async function watchComponentSets() {
    // Watch does not rebuild vendor.js and design.css
    await buildComponentSets();

    for (const componentSetPath of await listComponentSetPaths(componentSetsDirectory)) {
        await watchComponentSet(componentSetPath);
    }
}

export async function watchComponentSet(componentSetPath) {
    let dirty = false;
    let activePromise = null;

    const doValidateComponentSet = () => {
        dirty = false;
        activePromise = validateComponentSet(componentSetPath)
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                activePromise = undefined;

                if (dirty) {
                    doValidateComponentSet();
                }
            });
    };

    fsCallback.watch(componentSetPath, { recursive: true }, (eventType, filename) => {
        console.log(`\nThe file "${filename}" was modified!`);
        console.log('The type of change was:', eventType);

        if (activePromise) {
            dirty = true;
        } else {
            doValidateComponentSet();
        }
    });
}

/**
 * Walk through all folders in componentSetsDirectory and build them.
 */
export async function buildComponentSets() {
    for (const componentSetPath of await listComponentSetPaths(componentSetsDirectory)) {
        await buildComponentSet(componentSetPath);
    }
}

async function listComponentSetPaths() {
    let componentSetPaths = [];
    for (const fileName of await fs.readdir(componentSetsDirectory)) {
        const componentSetPath = path.join(componentSetsDirectory, fileName);
        if (!(await fs.stat(componentSetPath)).isDirectory()) continue;
        componentSetPaths.push(componentSetPath);
    }
    return componentSetPaths;
}

/**
 * Build a component set zip for path.
 * @param {string} componentSetPath
 */
async function buildComponentSet(componentSetPath) {
    console.log(`Building component set "${componentSetPath}"`);
    await generateDesignFile(componentSetPath);
    await compileDesignFile(componentSetPath);
    await generateVendorScript(componentSetPath);
    await validateComponentSet(componentSetPath);
    await buildComponentSetZip(componentSetPath);
}

/**
 * Runs component set validation and throws error when something is wrong.
 * @param {string} componentSetPath
 */
async function validateComponentSet(componentSetPath) {
    console.log(`Validating component set "${componentSetPath}"`);
    const valid = await validateFolder(componentSetPath);
    if (!valid) {
        throw new Error(`Package failed validation: "${componentSetPath}". See errors above.`);
    } else {
        console.log(`Component set "${componentSetPath}" is valid!`)
    }
}

/**
 * Generates design.scss from style files.
 * @param {string} componentSetPath
 */
async function generateDesignFile(componentSetPath) {
    console.log(`Generating design.scss for component set "${componentSetPath}"`);
    try {
        const definition = await getComponentDefinition(componentSetPath);
        const componentNames = definition.components.map((compDef) => compDef.name);

        let content = `/*
* This file has been generated while building the components package.
* PLEASE DO NOT MODIFY THIS FILE BY HAND.
*/\n${buildScssString('common')}`;

        for (const componentName of componentNames) {
            content += buildScssString(componentName);
        }

        await fs.writeFile(path.join(componentSetPath, 'styles/design.scss'), content);
    } catch (e) {
        // Don't fail task, but let the components validator generate the actual error,
        // in case the component definition is malformed.
        console.error('Failed to generate design.scss file: \n', e);
        return;
    }
}
/**
 * @param {string} componentSetPath
 */
async function getComponentDefinition(componentSetPath) {
    return JSON.parse(await fs.readFile(path.join(componentSetPath, 'components-definition.json'), 'utf8'));
}

/**
 * @param {string} componentName
 * @returns {string}
 */
function buildScssString(componentName) {
    return `@import "${componentName}";\n`;
}

/**
 * Compiles design.scss.
 * @param {string} componentSetPath
 */
async function compileDesignFile(componentSetPath) {
    console.log(`Compiling design.scss for component set "${componentSetPath}"`);
    const result = sass.compile(path.join(componentSetPath, 'styles/design.scss'));
    await fs.writeFile(path.join(componentSetPath, 'styles/design.css'), result.css);
}

/**
 * Generates vendor script by concatenating and uglifying the result.
 * @param {string} componentSetPath
 */
async function generateVendorScript(componentSetPath) {
    console.log(`Generating vendor.js for component set "${componentSetPath}"`);

    // Scripts bundled into a single vendor.js
    // You can choose to remove scripts in case they are not needed
    // for your components.
    const scriptsDir = path.join('./scripts');
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

    // Concat files
    let content = '';
    for (const scriptFile of scriptFiles) {
        content += `${(await fs.readFile(scriptFile)).toString()}\n`;
    }
    // Uglify result
    const result = UglifyJS.minify(content);
    if (result.error) {
        throw new Error(result.error.message);
    }
    // Write to vendor.js script
    const targetFolder = path.join(componentSetPath, 'scripts');
    await mkdirIfNotExists(targetFolder);
    await fs.writeFile(path.join(targetFolder, 'vendor.js'), result.code);
}

/**
 * Creates component set zip.
 * @param {string} componentSetPath
 */
async function buildComponentSetZip(componentSetPath) {
    const outputPath = path.join('dist', `${path.basename(componentSetPath)}.zip`);
    console.log(`Zipping "${outputPath}" component set "${componentSetPath}"`);

    await mkdirIfNotExists('dist');

    const output = fsCallback.createWriteStream(outputPath);
    const archive = archiver('zip', {
        zlib: { level: 9 }, // Sets the compression level.
    });
    archive.pipe(output);
    archive.directory(componentSetPath, false);
    await archive.finalize();
}

/**
 * @param {string} dirPath
 */
async function mkdirIfNotExists(dirPath) {
    try {
        await fs.mkdir(dirPath);
    } catch (err) {
        if (err.code != 'EEXIST') {
            throw err;
        }
    }
}
