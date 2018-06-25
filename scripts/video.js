(function(document, window, $){

    var EVENT_NS = '._video_event';

    var DATA_KEY_SRC = '_video_src';
    var DATA_KEY_ID = '_video_id';
    var DATA_KEY_STORE = '_video_store';
    var DATA_KEY_HLS = '_video_hls';

    var SRC_PATTERN = /\.m3u8(\?.*)?$/i;

    var scripts = document.getElementsByTagName('script');
    var jsPath = scripts[scripts.length - 1].src.replace(/\/[^\/]+$/, '') + '/';
    var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);

    function initVideo(element) {
        $(document).ready(function () {
            _initVideo(element);
        });
    }

    function destroyVideo(element) {
        (element || $('[doc-html]')).each(
            function(){
                var parentEl = $(this);
                var store = parentEl.data(DATA_KEY_STORE) || {};

                // look through stored videos
                for (var i in store) {
                    if (store.hasOwnProperty(i)) {
                        var item = store[i];
                        _destroyHls(item.videoEl);
                        delete store[i];
                    }
                }
            }
        );
    }

    function _initVideo(element) {
        (element || $('[doc-html]')).each(
            function() {
                var parentEl = $(this);

                // look through video tags, get src and set id
                parentEl.find('video').each(
                    function() {
                        var videoEl = $(this);
                        var source = videoEl.find('source');
                        var src = source.length && source.attr('src') || videoEl.attr('src');
                        videoEl.data(DATA_KEY_SRC, src);
                        if (!videoEl.data(DATA_KEY_ID)) {
                            videoEl.data(DATA_KEY_ID, _generateId());
                        }
                    }
                );

                var store = parentEl.data(DATA_KEY_STORE) || {};

                // look through stored videos
                for (var i in store) {
                    if (store.hasOwnProperty(i)) {
                        var item = store[i]; // {id, videoEl, src}
                        if (!$.contains(parentEl.get(0), item.videoEl.get(0)) || item.src !== item.videoEl.data(DATA_KEY_SRC)) {
                            _destroyHls(item.videoEl);
                            delete store[i];
                        }
                    }
                }

                // look through video tags, create hls
                parentEl.find('video').each(
                    function() {
                        var videoEl = $(this);
                        var id = videoEl.data(DATA_KEY_ID);
                        var src = videoEl.data(DATA_KEY_SRC);
                        if (!store.hasOwnProperty(id) && SRC_PATTERN.test(src)) {
                            _createHls(videoEl);
                            store[id] = {
                                id: id,
                                videoEl: videoEl,
                                src: src
                            }
                        }
                    }
                );

                parentEl.data(DATA_KEY_STORE, store);
            }
        )
    }

    function _createHls(videoEl) {
        var src = videoEl.data(DATA_KEY_SRC);
        _loadHls(function(){
            if (Hls.isSupported()) {
                var video = videoEl.get(0);
                var hls = new Hls({
                    autoStartLoad: false
                });
                hls.loadSource(src);
                hls.attachMedia(video);
                videoEl.data(DATA_KEY_HLS, hls);
                videoEl.one('play' + EVENT_NS, function () {
                    hls.startLoad();
                });
            }
        });
    }

    function _generateId() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            /* tslint:disable */
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            /* tslint:enable */
            return v.toString(16);
        });
    }

    function _destroyHls(videoEl) {
        videoEl.off(EVENT_NS);
        var hls = videoEl.data(DATA_KEY_HLS);
        if (hls) {
            hls.destroy();
        }
        videoEl.removeData(DATA_KEY_HLS);
    }

    var _hlsLoaded;
    function _loadHls(callback) {
        if (!_hlsLoaded) {
            $.getScript(jsPath + 'hls.js', callback);
        } else {
            callback();
        }
    }

    if (!isSafari) {
        /* Must be global for Inception Editor */
        window.initVideo = initVideo;
        window.destroyVideo = destroyVideo;

        initVideo();
    }

})(document, window, jQuery);
