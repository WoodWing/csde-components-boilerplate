/* Heroes */
(function(document, window, navigator, jQuery){

    jQuery(document).ready(function($){
        var bodyEl = $('body');
        var bgEl = bodyEl.find('> ._hero-bg-box');

        // When article contains heroes with parallax effect, the html is restructured to allow the effect work on mobile.
        // This is applied to all targets, including desktop browser (to avoid inconsistency or having multiple render outputs)
        if (bgEl.length > 0) {
            var htmlEl = $('html');

            var articleContainer = bodyEl.find('> .articleContainer');
            var bgInfo = [];
            var userAgent = navigator.userAgent || navigator.vendor || window.opera;
            var isAndroid = userAgent.match(/Android/i);

            htmlEl.addClass('hero-js');
            if (isAndroid) {
                htmlEl.addClass('hero-js-android');
            }

            // Link bg items to their corresponding hero items
            var count = 0;
            bgItems = bgEl.find('> ._hero-bg-item');
            articleContainer.find('> [data-hero-mobile]').each(function(){
                var el = $(this);
                if (el.hasClass('_fixed-background')) {
                    return;
                }

                bgInfo.push({
                    bgItemEl: $(bgItems[count]),
                    heroEl: el
                });
                count++;
            });

            var fixSlideshowArrows = new (function() {
                var timer;
                function action(value) {
                    $('.slideshow .arrow').each(function(){
                        $(this).css('opacity', value);
                    });
                }
                function run() {
                    window.clearTimeout(timer);
                    action(0.99);
                    timer = window.setTimeout(function(){
                        action(1);
                    });
                }
                return {
                    run: run
                }
            })();

            var fixBackground = function() {
                var isContentAbsolute = articleContainer.css('position') === 'absolute';
                var scrollTop = !isContentAbsolute && bodyEl.scrollTop() || 0;
                var height = bodyEl.height();
                var bestHero = {};
                // look for current hero
                $.each(bgInfo, function(_index, item){
                    var heroTop = item.heroEl.offset().top - scrollTop;
                    var p = Math.max(0, height - Math.abs(heroTop));
                    if (!bestHero.p || bestHero.p < p) {
                        bestHero.p = p;
                        bestHero.bgItemEl = item.bgItemEl;
                    }
                });
                if (bestHero.p) {
                    var currentItem = bgEl.find('._current');
                    if (!currentItem.is(bestHero.bgItemEl)) {
                        currentItem.removeClass('_current');
                        bestHero.bgItemEl.addClass('_current');
                    }
                }
                fixSlideshowArrows.run();
            };

            $(window).on('scroll resize orientationchange', fixBackground);
            articleContainer.on('scroll', fixBackground);
            fixBackground();
        }
    });

})(document, window, navigator, jQuery);