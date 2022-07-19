import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { buildComponentSets } from './build.mjs';
import { watchComponentSets } from './watch.mjs';

const argv = yargs(hideBin(process.argv))
    .command(
        'node build.mjs',
        'validate and build component sets',
        () => {},
        (argv) => {
            console.info(argv);
        },
    )
    .option('watch', {
        alias: 'w',
        type: 'boolean',
        description: 'Run in watch mode, does not rebuild vendor.js and design.css',
    })
    .parse();

if (argv.watch) {
    console.log('Running in watch mode: ');
    await watchComponentSets();
} else {
    await buildComponentSets();
}
