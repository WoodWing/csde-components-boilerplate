(function(document){
    $( document ).on( "mobileinit", function() {
        // Don't initialize, only using jquery mobile for taps right now
        $.mobile.autoInitializePage = false;
        // Causes a SecurityError in iframes on Chrome, so disable:
        $.mobile.pushStateEnabled = false;
    });
})(document);