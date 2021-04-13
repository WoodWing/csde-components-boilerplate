# `doc-slideshow`

Provides slideshow functionality, providing limited customization. This directive heavily depends on the [slideshow.js](../SCRIPTS.md#slideshowjs) script.

The doc-slideshow directive expects the following properties to exist to work correctly:

-   `slideshow-inside-caption`: controls the inside-caption property of all child component slides. It syncs this property to another property named `inside-caption` inside the child component slides, so these two properties must match.
-   `slideshow-play-orientation`: controls play orientation of underlying jssor slideshow library.
-   `slideshow-play-autoplay`: controls auto play setting of underlying jssor slideshow library.
-   `slideshow-filmstrip`: controls showing filmstrip of slideshow

The names and data types of these properties can't be changed, as the `doc-slideshow` directive looks for these properties by name and rebuilds the slideshow when the data of these properties change.
