define('oi_internet_addons', ["oi_constants"], function (oi_constants) {

    try {
        var $ = jQuery;
        var desktopBreakpoint = oi_constants.desktopBreakpoint;

        $(document).ready(function () {

            var fadeTimer = 500;

            $(".addon-channels").click(function () {
                overlayId = "#addon-" + $(this).attr("addon") + "-Overlay";
                $(overlayId).fadeIn(fadeTimer);
            });

            // overlay
            $(".addon-CloseOverlay").click(function () {
                overlayId = "#" + $(this).attr("parent-overlay");
                $(overlayId).fadeOut(fadeTimer);
            });

            if(window.innerWidth >= desktopBreakpoint){
                // expandir primer addon al comenzar
                $("#addon_list-mobile .cardList div:first > div:last").addClass("show");
                $("#addon_list-mobile .cardList div:first .btn-link").attr("aria-expanded", true);
            }

            mediaHandler();
            $(window).bind("resize", mediaHandler);

            function mediaHandler() {

                var cardHeaders = $("#pl_addonsHTML .btn.btn-link");
                var checks = $('#pl_addonsHTML .card-header');

                if (window.innerWidth >= desktopBreakpoint) {
                    //desktop
                    cardHeaders.attr("data-toggle", "false");

                    cardHeaders.bind("mouseover", AddonClickHandler);

                    $("#pl_addons .expand").removeClass('expand');
                    checks.off('click', AddonClickMobile);

                } else {
                    // mobile
                    cardHeaders.attr("data-toggle", "collapse");

                    cardHeaders.unbind("mouseover", AddonClickHandler);

                    $('#addon_list-mobile').find('div.show').removeClass("show");
                    cardHeaders.attr("aria-expanded", false);
                    checks.off('click').on('click', AddonClickMobile);
                }
            }

            function AddonClickMobile(){
                var value = $(this).attr('addon-sku');
                var groupOption = $("#pl_addons input[value="+ value + "]").parent();
                if(!groupOption.hasClass('expand')){
                   $("#pl_addons .expand").removeClass('expand');
                    $("#pl_addons input[value="+ value + "]").parent().addClass('expand');
                }else{
                    $("#pl_addons .expand").removeClass('expand');
                }    
            }

            function AddonClickHandler() {
                var target = $(this).attr("data-target");

                $("#pl_addonsHTML .collapse.show").toggleClass("show");
                $(target).toggleClass("show");

                $("#pl_addonsHTML .btn.btn-link").attr("aria-expanded", false);
                $(this).attr("aria-expanded", true);

            }

        });

    } catch (err) {
        console.log(err);
    }

});
