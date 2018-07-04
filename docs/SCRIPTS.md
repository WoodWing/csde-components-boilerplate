# Scripts

A number of Javascript files are included in the boilerplate to provide additional functionality to components. These scripts are loaded in the editor and bundled when publishing the html rendition of an article.

The root `scripts` folder contains scripts that are concatenated into `components/scripts/vendor.js` by
`gulpfile.js`. You will need to modify `gulpfile.js` in case you want to add additional scripts or remove scripts you don't need.

You can also add new scripts directly to the `components/scripts` folder and add the new script entry to `components-definition.json`.

## Default scripts included

### `fullscreen.support.js`

Installs a tap handler on components that have `data-tap-fullscreen` set on their root html element and are published to an Adobe AEM channel.

See the `image` component for an example in the default component set.

## `slideshow.js`

Support script for `doc-slideshow` directive.
Initializes the slideshow using the https://www.jssor.com/.

The script depends on `data-slideshow-component` attribute being added to the component root element. The component root element is used to read out the following style `dataType` properties:

- `_fit-frame-to-content` and `_fit-frame-height-to-content` change the fitting behavior. `Frame to content` sizes the slideshow to the first image in the slideshow, while `Frame height to content` sizes it to the height of the first image in the slideshow. The default behavior is to fit the images to the frame of the slideshow.
- `_filmstrip` enables filmstrip. `doc-slideshow` listens for this style dataType property and re-initializes the slideshow when it changes.
- `_auto-play` toggles autoplaying of slideshow. `doc-slideshow` listens for this style dataType property and re-initializes the slideshow when it changes.
- `_vertical` toggles direction of slideshow. `doc-slideshow` listens for this style dataType property and re-initializes the slideshow when it changes.

See the `slideshow` component for an example in the default component set.

## `heroes.js`

Adds parallax effect on mobile devices to "hero" type of components. Applied to any component that has `data-hero-mobile` set on their root html element.

On publishing the article html output will be restructured to support the parallax effect.
Components that have the css class `_fixed-background` applied are skipped (for example through a style property).
If you don't want this behavior at all, remove the data attribute `data-hero-mobile` from the component html template. In addition you can also remove the `heroes.js` scripts from being included in `vendor.js` by editing `gulpfile.js`.

See the `hero` component for an example in the default component set.

### `video.js`

Scans for components with `doc-html` directives and checks content of `doc-html` for `.m3u8` urls. On non Safari browsers the script will dynamically add the support script hls.js to allow playing these types of videos.
