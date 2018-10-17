define("oi_internet_vantagensDoPlano", ["oi_constants", "glide"], function (oi_constants, Glide) {

    var $ = jQuery;
    var desktopBreakpoint = oi_constants.desktopBreakpoint;
    var fadeTimer = 500;

    try {

        console.log("Glide loaded");

        require.ready(function () {

            var cardCount = $(".lucros-card").length;

            //mobile
            var breakpointOptions = {};
            breakpointOptions[desktopBreakpoint] = {
                perView: 2,
                focusAt: 'center'
            };

            var options = {
                type: 'slider',
                startAt: 0,
                gap: 10,
                focusAt: 0,
                perView: cardCount,
                breakpoints: breakpointOptions
            };

            // desktop options
            var glide = new Glide('.glide', options).mount();

            // overlay
            $(".vant-title").click(function () {
                overlayId = "#" + $(this).attr("vant-overlay");
                $(overlayId).fadeIn(fadeTimer);
            });

            // overlay
            $(".vant-CloseOverlay").click(function () {
                overlayId = "#" + $(this).attr("parent-overlay");
                $(overlayId).fadeOut(fadeTimer);
            });

            mediaHandler();
            $(window).bind("resize", mediaHandler);

            function mediaHandler() {

                glide.update({
                    startAt: 0,
                });

                if (window.innerWidth >= desktopBreakpoint) {
                    //desktop
                    glide.disable();
                } else {
                    // mobile
                    glide.enable();
                }
            }


        });
    } catch (err) {
        console.error(err);
    }

});