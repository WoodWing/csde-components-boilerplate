import fsCallback from 'node:fs';
import { buildComponentSets, listComponentSetPaths, validateComponentSet } from './build.mjs';

export async function watchComponentSets() {
    // Watch does not rebuild vendor.js and design.css
    await buildComponentSets();

    for (const componentSetPath of await listComponentSetPaths()) {
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
        console.log(`\n${new Date().toLocaleString()}\nThe file "${filename}" was modified!`);
        console.log('The type of change was:', eventType);

        if (activePromise) {
            dirty = true;
        } else {
            doValidateComponentSet();
        }
    });
}
