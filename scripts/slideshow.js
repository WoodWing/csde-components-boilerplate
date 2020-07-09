/* Support script for doc-directive. Adds slideshow functionality using jssor library. */
(function(document, window, jQuery){
    var INITIATED = '_slideshow_initiated';
    var SLIDER = '_slideshow_slider';
    var WAITING = '_slideshow_waiting';
    var INIT_METHOD = '_slideshow_initmethod';
    var SIZE_RATIO = '_slideshow-size-ratio';
    var CSS_CLASS_FRAME_TO_CONTENT = '_fit-frame-to-content';
    var CSS_CLASS_FRAME_HEIGHT_TO_CONTENT = '_fit-frame-height-to-content';
    var DATA_KEY_LAST_SIZE = '_slideshow_last_size';
    var FITTING_CONTENT_TO_FRAME = 'FITTING_CONTENT_TO_FRAME';
    var FITTING_FRAME_TO_CONTENT = 'FITTING_FRAME_TO_CONTENT';
    var FITTING_FRAME_HEIGHT_TO_CONTENT = 'FITTING_FRAME_HEIGHT_TO_CONTENT';

    // Should be using jssor.slider.mini.js, but it seems to mangle the names.
    // Difference is it disables debug mode (and is minified, but we do that already).
    // http://www.jssor.com/development/
    $JssorDebug$.$DebugMode = false;

    var isIE = /msie/i.test(navigator.userAgent) || /trident/i.test(navigator.userAgent);

    /**
     * Init all slideshows
     */
    function initSlideshows() {
        // jQuery shortcut
        var $ = jQuery;
        // if the height is not set then wait a bit to initialize the slideshows
        if (!$('[doc-slideshow] [u="slides"]').height()) {
            return window.setTimeout(initSlideshows, 50);
        }
        // init slideshows
        $('[data-slideshow-component]').each(function(){
            var slideshowBox = $(this);
            if (!slideshowBox.data(INITIATED) && !slideshowBox.hasClass(WAITING)) {
                slideshowBox.data(INITIATED, true);

                function initThisSlideshow(activeIndex) {
                    initSlideshow(slideshowBox, activeIndex);
                }

                // Store these methods so they can be accessed by the editor
                slideshowBox.data(INIT_METHOD, initThisSlideshow);

                initThisSlideshow();
            }
        });
        // scale
        var body = $('body');
        if (!body.data(INITIATED)) {
            body.data(INITIATED, true);
            var reinitSlider = function() {
                // don't reinit slideshows if they are in the editor
                if ($('.doc-section').length) {
                    return;
                }
                $('[data-slideshow-component]').each(function(){
                    reinitSlideshow($(this));
                });
            };
            var reinitSliderTimer;
            var reinitSliderDelayed = function(){
                window.clearTimeout(reinitSliderTimer);
                reinitSliderTimer = window.setTimeout(reinitSlider, 50);
            };

            reinitSlider();

            $Jssor$.$AddEvent(window, 'load', reinitSliderDelayed);
            $Jssor$.$AddEvent(window, 'resize', reinitSliderDelayed);
            $Jssor$.$AddEvent(window, 'orientationchange', reinitSliderDelayed);
        }
    }

    /**
     * Init slideshow component
     * @param slideshowBox {object} - Slideshow component jQuery DOM object
     */
    function initSlideshow(slideshowBox, activeIndex) {
        // jQuery shortcut
        var $ = jQuery;

        var slideshow = slideshowBox.find('> [doc-slideshow]');
        var size = getSize(slideshowBox);

        if (!slideshowBox.hasClass('_initiated')) {
            slideshowBox.data('_slideshow_content', {
                html: slideshow.html(),
                style: slideshow.attr('style')
            });
        } else {

            // don't reinit if the size is the same
            if (size === slideshowBox.data(DATA_KEY_LAST_SIZE)) {
                return;
            }

            if (activeIndex === undefined) {
                activeIndex = Math.max(0, slideshowBox.data(SLIDER).$CurrentIndex());
            }

            var content = slideshowBox.data('_slideshow_content');
            slideshow.removeAttr('jssor-slider');
            if (content.style) {
                slideshow.attr('style', content.style);
            } else {
                slideshow.removeAttr('style');
            }
            slideshow.html(content.html);
        }

        slideshowBox.data(DATA_KEY_LAST_SIZE, size);

        // generate and set ID
        var id = 'slideshow_' + (new Date()).getTime() + '_' + Math.round(Math.random() * 1000);
        slideshow.attr('id', id);
        var containers = $('[doc-container]', slideshow);
        var slides = $('> *', containers);

        // run script if there is one slide at least
        if (slides.length) {
            // These elements css are adjusted based on the fitting property
            var fittingElementTargets = slides.find('[doc-image]').add(containers);

            slideshowBox.addClass('_initiated');
            // Next line is added to provide back compatibility with already created custom styles
            slideshow.addClass('_initiated');
            // write slides count
            slideshow.get(0)._slides = slides.length;

            // get current fitting
            var fitting = getFitting(slideshowBox);

            var ratio, css, marginLeft;
            // prepare the size
            switch (fitting) {
                case FITTING_CONTENT_TO_FRAME:
                    ratio = slideshow.height() / slideshow.width();
                    css = {
                        width: slideshowBox.width()
                    };
                    // apply width to the thumbnavigator
                    slideshow.find('.thumbnavigator').css(css);
                    css.height = css.width * ratio;
                    // apply size to the slideshow container
                    slideshow.css(css);
                    // apply size to the slides container
                    fittingElementTargets.css(css);

                    marginLeft = Math.round(-css.width / 2);
                    break;
                case FITTING_FRAME_TO_CONTENT:
                    if (isIE) {
                        ratio = slideshow.height() / slideshow.width();
                        css = {
                            width: slideshowBox.width()
                        };
                        slideshow.find('.thumbnavigator').css(css);
                        css.height = css.width * ratio;
                        fittingElementTargets.css(css);
                    }
                    break;
                case FITTING_FRAME_HEIGHT_TO_CONTENT:
                    ratio = parseFloat(slideshow.attr(SIZE_RATIO));
                    css = {
                        paddingBottom: '',
                        width: slideshowBox.width()
                    };
                    css.height = css.width * ratio;
                    slideshow.css(css);

                    if (isIE) {
                        slideshow.find('.thumbnavigator').css({width: css.width});
                        fittingElementTargets.css(css);
                    }
                    break;
                default:
                    break;
            }

            updateCaptions(slideshowBox);

            var options = {
                $AutoPlay: slideshowBox.hasClass('_auto-play'),
                $PlayOrientation: slideshowBox.hasClass('_vertical') ? 2 : 1,
                $DragOrientation: slideshowBox.hasClass('_vertical') ? 2 : 1,
                $ArrowNavigatorOptions: {
                    $Class: $JssorArrowNavigator$,
                    $ChanceToShow: 2
                },
                $ThumbnailNavigatorOptions: {
                    $Class: $JssorThumbnailNavigator$,
                    $ChanceToShow: 0
                }
            };

            // remove from slideshow's box possible applied styles
            slideshowBox.css({
                paddingBottom: ''
            });

            // filmstrip
            if (slideshowBox.hasClass('_filmstrip')) {

                // update css (bug fixing)
                var thumbnavigatorEl = slideshow.find('.thumbnavigator');
                thumbnavigatorEl.css({
                    overflow: 'hidden'
                });
                if (fitting === FITTING_CONTENT_TO_FRAME && thumbnavigatorEl.css('display') !== 'none') {
                    var thumbnavigatorHeight = thumbnavigatorEl.height();
                    slideshowBox.css({
                        paddingBottom: thumbnavigatorHeight
                    });
                    thumbnavigatorEl.css({
                        bottom: -thumbnavigatorHeight
                    });
                }

                // prepare html for thumbnails
                slides.each(function(){
                    var image = $(this);
                    image.attr('u', 'image');
                    image.wrap('<div></div>');
                    $('<div></div>', { u: 'thumb' }).append(
                        $('<div></div>')
                            .css({
                                backgroundImage: image.find('[doc-image]').css('background-image')
                            })
                        )
                        .insertAfter(image);
                });
                // add thumbnail options
                options.$ThumbnailNavigatorOptions = {
                    $Class: $JssorThumbnailNavigator$,
                    $ChanceToShow: 2,
                    $ActionMode: 1,
                    $SpacingX: 8,
                    $DisplayPieces: 10,
                    $ParkingPosition: 360
                };
            }
            slideshowBox.data(SLIDER, new $JssorSlider$(id, options));

            switch (fitting) {
                case FITTING_CONTENT_TO_FRAME:
                    containers.css({
                        marginLeft: marginLeft
                    });
                    break;
            }

            // disable moving slides on caption clicks
            containers.find('[doc-editable]').attr('nodrag', 'nodrag');

            // Restore active index
            if (activeIndex) {
                slideshowBox.data(SLIDER).$GoTo(activeIndex);
            }
        }
    }

    /**
     * Gets the fitting property value.
     *
     * @param {*} slideshowBox
     * @returns {string}
     */
    function getFitting(slideshowBox) {
        var fitting = FITTING_CONTENT_TO_FRAME;
        if (slideshowBox.hasClass(CSS_CLASS_FRAME_TO_CONTENT)) {
            fitting = FITTING_FRAME_TO_CONTENT;
        } else if (slideshowBox.hasClass(CSS_CLASS_FRAME_HEIGHT_TO_CONTENT)) {
            fitting = FITTING_FRAME_HEIGHT_TO_CONTENT;
        }
        return fitting;
    }

    /**
     * Update slides container and doc-editable height.
     * @param {*} slideshowBox
     */
    function updateCaptions(slideshowBox) {
        var fitting = getFitting(slideshowBox);
        var slideshow = slideshowBox.find('> [doc-slideshow]');

        if (isOutsideCaption(slideshowBox) && (fitting === FITTING_CONTENT_TO_FRAME || fitting === FITTING_FRAME_HEIGHT_TO_CONTENT)) {
            // Add extra space for outside caption
            var maxFigCaptionHeight = Math.max.apply(null, slideshow.find("[doc-editable]").map(function () {
                return $(this).outerHeight(true);
            }).get());
            var slidesContainer = slideshow.find('[u="slides"]');
            slideshow.find('.arrow').css('top', ((slidesContainer.height()  / 2)) + 'px');
            slideshow.height(slideshow.height() + maxFigCaptionHeight);

            if (fitting === FITTING_CONTENT_TO_FRAME) {
                // Adapt slides container with extra height for caption
                slidesContainer.height(slidesContainer.height() + maxFigCaptionHeight);
            } else if (fitting == FITTING_FRAME_HEIGHT_TO_CONTENT) {
                // Ensure all captions fill out the space. Otherwise the slide image will
                // center, causing it to not be aligned with other images and spacing
                // between the caption.
                slideshow.find("[doc-editable]").css('min-height', maxFigCaptionHeight);
            }
        }
    }

    /**
     * Test if captions/doc-editables are placed outside the image.
     *
     * @param {*} slideshowBox
     * @returns {boolean}
     */
    function isOutsideCaption(slideshowBox) {
        // Inside captions are overlayed on the figure using absolute positioning.
        // Anything else is outside caption.
        return slideshowBox.find('[doc-editable]').css('position') !== 'absolute' && slideshowBox.find('[doc-editable]').css('display') !== 'none';
    }

    /**
     * Get size as a string key to identify if size changed.
     *
     * @param {JQuery} slideshowBox - Slideshow component jQuery DOM object
     * @returns {string}
     */
    function getSize(slideshowBox) {
        return slideshowBox.width() + 'x' + slideshowBox.height() + 'x' + (slideshowBox.hasClass('_filmstrip') ? 'true' : 'false');
    }

    /**
     * Scale slideshow
     * @param {JQuery} slideshowBox - Slideshow component jQuery DOM object
     * @returns {boolean} - false means that scaling has not been done and needs to be recalled soon
     */
    function reinitSlideshow(slideshowBox) {
        var slider = slideshowBox.data(SLIDER);
        var fitting = getFitting(slideshowBox);
        if (fitting !== FITTING_FRAME_TO_CONTENT && slider) {
            // reinit
            initSlideshow(slideshowBox);
        }
    }

    /* Must be global for Digital Editor doc-slideshow directive. */
    window.initSlideshows = initSlideshows;

    /* One time initialization of all slideshows */
    jQuery(document).ready(function(){
        initSlideshows();
    });

})(document, window, jQuery);
