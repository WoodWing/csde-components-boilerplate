(function(document, window, jQuery){

    /**
     * Opt into the Adobe DPS (2015) advanced contract
     * @param elementList - The single or list of HTML elements
     * Source: DPS (2015) HTML Gesture Example
     */
    function optInAdvContract(elementList) {
        try {
            adobeDPS.Gesture.disableNavigation(elementList);
        } catch (error) {
            console.log('error', error);
        }
    }

    /**
     * Constructor for fullscreen helper.
     * @param compEl - The element on which to add fullscreen support
     * @param fullscreenCallback - Callback when fullscreen mode changes.
     * @param tapExcludeSelector - Selector for ignoring taps on child elements (e.g. arrow on slideshow)
     */
    var FullScreenCompHelper = function (compEl, fullscreenCallback, tapExcludeSelector) {
        this.compEl = compEl;
        this.isFullscreen = false;
        this.fullscreenCallback = fullscreenCallback;
        this.tapExcludeSelector = tapExcludeSelector;
    };

    /* Data for full-screen mode */
    var beforeFullscreenData = {};
    var fullscreenWrapper;
    var beforeFullscreenMarker;
    var beforeFullscreenViewportMetaContent;

    /**
     * Toggles fullscreen mode for element.
     */
    FullScreenCompHelper.prototype.toggleFullscreen = function(fullscreenTmpl) {
        var compEl = this.compEl;

        var viewportMeta = document.querySelector('meta[name="viewport"]');
        var articleContainer = $('body > div.articleContainer');

        var wasFullScreenMode = compEl.hasClass('full-screen');
        if (!wasFullScreenMode) {
            beforeFullscreenData = {x: $(window).scrollLeft(), y: $(window).scrollTop()};
            beforeFullscreenViewportMetaContent = viewportMeta && viewportMeta.content;
        }

        compEl.toggleClass('full-screen');
        this.isFullscreen = !wasFullScreenMode;

        // fix slideshow size determining (when slideshow is moved to fullscreen wrapper
        // size of slideshow box is not determined correctly because of different parent element's styles)
        if (compEl.is('[doc-slideshow]') || compEl.find('[doc-slideshow]').length !== 0) {
            if (wasFullScreenMode) {
                compEl.css({
                    overflow: ''
                });
            } else {
                compEl.css({
                    overflow: 'hidden'
                });
            }
        }

        if (wasFullScreenMode) {
            // Show article again
            articleContainer.show();
            if (viewportMeta) {
                viewportMeta.content = beforeFullscreenViewportMetaContent;
            }

            if (beforeFullscreenMarker) {
                /* Re-insert element */
                compEl.detach();
                compEl.insertAfter(beforeFullscreenMarker);

                beforeFullscreenMarker.remove();
                beforeFullscreenMarker = undefined;
            }
            fullscreenWrapper.remove();
            fullscreenWrapper = undefined;

            // Scroll to right position again
            window.scroll(beforeFullscreenData.x, beforeFullscreenData.y);
        } else {
            // Two modes: either move the original element or create a new element.
            // For slideshow we move the element, because otherwise we need to initialize jssor again.
            // For images we create a new element to properly center it.
            var fullscreenEl;
            if (fullscreenTmpl) {
                fullscreenEl = $(fullscreenTmpl);
            } else {
                /* Create a full-screen wrapper and move element into it */
                beforeFullscreenMarker = $('<div></div>');
                beforeFullscreenMarker.insertAfter(compEl);

                compEl.detach();
                fullscreenEl = compEl;
            }

            fullscreenWrapper = $('<div class="fullscreen-wrapper"></div>');
            fullscreenWrapper.append(fullscreenEl);

            articleContainer.hide();

            $(document.body).append(fullscreenWrapper);

            /* Disable Adobe DPS Gestures */
            optInAdvContract([fullscreenWrapper[0]]);
            /* Close fullscreen if tapping the background wrapper */
            this.tapFullscreen(fullscreenWrapper, undefined, this.tapExcludeSelector);

            if (viewportMeta) {
                /* Free scaling by user! */
                viewportMeta.content = 'width=device-width, initial-scale=1';
            }
        }

        if (this.fullscreenCallback) {
            this.fullscreenCallback(this);
        }
    };

    /**
     * Installs tap event handler on element
     * @param el - element
     * @param tmpl - Optional template to be created as fullscreen element. If not specified, will just
     *               move the existing element into the fullscreen wrapper.
     * @param excludeSelector - Selector for ignoring taps on child elements (e.g. arrow on slideshow)
     */
    FullScreenCompHelper.prototype.tapFullscreen = function(el, tmpl, excludeSelector) {
        var self = this;
        el.tap(function(e) {
            if (!excludeSelector || !e.target.closest(excludeSelector)) {
                self.toggleFullscreen(tmpl);
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        });
    };

    function fullscreenEnabled() {
        //  adobeDPSHTMLNative is only set in the Adobe AEM app,
        // in which case full screen is enabled
        return true; // !!window.adobeDPSHTMLNative;
    }

    /* By default, initialize it for all images. Slideshow components are handled in their own file. */
    jQuery(document).ready(function($){
        if (!fullscreenEnabled()) {
            return;
        }
        var images = document.querySelectorAll('[data-tap-fullscreen]');
        for (var i = 0; i < images.length; i++) {
            var image = $(images[i]);

            // Skip for images in slideshow component
            if (image.closest('[doc-slideshow]').length !== 0) {
                continue;
            }
            // Skip individual disabled full-screen components
            if (image.hasClass('_disable-fullscreen')) {
                continue;
            }
            // Pick url of first found image
            var url = image.find('[doc-image]').css('background-image');
            url = url.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
            var tmpl = '<img src="'+url+'" style="max-width: 100%; max-height: 100%;"></img>';
            var fullscreenHelper = new FullscreenSupport.FullScreenCompHelper(image);
            fullscreenHelper.tapFullscreen(image.find('div'), tmpl);
        }
    });

    /* Public API: */
    window.FullscreenSupport = {
        /**
         * Helper class for fullscreen mode on an element.
         *
         * @param compEl - Element for which to add full-screen support
         * @param fullscreenCallback - Callback after full-screen mode changed for element
         * @returns fullscreen helper instance
         */
        FullScreenCompHelper: FullScreenCompHelper,

        /**
         * Tests if fullscreen support is enabled
         * @returns boolean
         */
        fullscreenEnabled: fullscreenEnabled
    };

})(document, window, jQuery);