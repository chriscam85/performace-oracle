define('oi_pos_IFrame', ["oi_postMessageOCC"], function (oi_postMessageOCC) {

    try {
        var $ = jQuery;

        require.ready(function () {
            console.log("Iframe script");

            $(window).on("scroll", function () {
                var scrollTop = $(window).scrollTop();
                var scrollHeight = $(document).height();
                var windowHeight = $(window).height();

                var positionPerc = (scrollTop + windowHeight) / scrollHeight;

                var payload = "{\"action\":\"iframe-scroll\",\"position-relative\":" + positionPerc + "}";

                oi_postMessageOCC(payload);

            });


        });
    } catch (err) {
        console.error(err);
    }

});