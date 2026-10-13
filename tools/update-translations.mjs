const missing = ['LOKALISE_API_KEY', 'LOKALISE_PROJECT_ID', 'LOKALISE_TAGS'].filter((name) => !process.env[name]);
if (missing.length > 0) {
    throw new Error(`Missing environment variables: ${missing.join(', ')}`);
}

// Imported lazily: the package is a private optional dependency, absent for public users of this repo
const { downloadLocalizations } = await import('@woodwing/lokalise-download');
await downloadLocalizations({
    outputDir: 'component-sets/default-components/localization',
    tags: process.env.LOKALISE_TAGS.split(',').map((tag) => tag.trim()),
    projectId: process.env.LOKALISE_PROJECT_ID,
    apiKey: process.env.LOKALISE_API_KEY,
});
