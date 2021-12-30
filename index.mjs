import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { buildComponentSets, watchComponentSets } from './build.mjs';

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
        description: 'Run in watch mode',
    })
    .parse();

if (argv.watch) {
    console.log('Running in watch mode: ');
    watchComponentSets();
} else {
    await buildComponentSets();
}
