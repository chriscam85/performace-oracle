define("oi_pos_appMinhaOi", [], function () {

    try {
        var $ = jQuery;

        $(document).ready(function () {

            var transactionTimer = 5000;

            var tabChange = function () {
                var tabs = $("#appMinhaOi-container .nav > li:visible");
                var active = tabs.find(".nav-link").filter(".active");
                var nextTab = active.parent("li").next("li").find(".nav-link");
                var next = nextTab.length ? nextTab : tabs.filter(":first-child").find(".nav-link");
                next[0].click();
            }

            var canPlay = false;

            var videoTags = $("#appMinhaOi-TabContent .tab-pane video");

            if (videoTags[0].canPlayType && videoTags[0].canPlayType('video/mp4').replace(/no/, '')) {
                canPlay = true;
            }

            if (canPlay) {

                $.each(videoTags, function () {
                    $(this)[0].addEventListener("ended", function () {
                        tabChange();
                    });
                });

                videoTags[0].play();

                $("#appMinhaOi-container .nav-link").click(function (e) {

                    e.preventDefault();

                    if (timeout) {
                        clearTimeout(timeout);
                    }

                    timeout = setTimeout(function () {
                        var videoTag = $("#appMinhaOi-TabContent .tab-pane.active video");
                        videoTag[0].play();
                    }, 1000);

                });

            } else {

                var tabCycle = setInterval(tabChange, transactionTimer)
                var timeout;

                $("#appMinhaOi-container .nav-link").click(function (e) {

                    e.preventDefault();

                    clearInterval(tabCycle);

                    if (timeout) {
                        clearTimeout(timeout);
                    }

                    timeout = setTimeout(function () {
                        tabChange();
                        tabCycle = setInterval(tabChange, transactionTimer);
                    }, transactionTimer);

                });
            }



        });

    } catch (err) {
        console.error(err);
    }

});