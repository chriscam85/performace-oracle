define('oi_pos_modernCart', ["oi_postMessageOCC", "oi_constants"], function (oi_postMessageOCC, oi_constants) {

    try {

        var $ = jQuery;
        var desktopBreakpoint = oi_constants.desktopBreakpoint;

        $(document).ready(function () {

            var slideTimer = 500;

            var selectedOffer = "";

            var mobileActive = true;
            // --------- mobile overlay ---------

            //close overlay
            $("#modernCPQCart-OverlayClose").click(function(){
                if (mobileActive){
                    CloseMobileOverlay();
                }     
            });


            // --------- plans overlay ---------
            //open plans overlay
            $("#modernCPQCart-OverlayPlansButton").click(function () {

                
                var plansSection = $("#modernCPQCart-Overlay .plansSection");

                $("#modernCPQCart-OverlayPlansButton").toggleClass("plans-collapsed");

                var currentHeight = plansSection.innerHeight();
                var autoHeight = plansSection.css('height', 'auto').innerHeight();

                plansSection.css('height', currentHeight).animate({
                    height: (currentHeight == autoHeight ? 0 : autoHeight)
                }, slideTimer, function(){
                    $("#modernCPQCart-Overlay .overlayContent").toggleClass("plansSection-expanded");
                });

            });

            //offer selection
            $(".planButton:not(.offerSelected)").click(function () {
                selectedOffer = $(this).attr("offer");

                $(".offerDialog-Container").fadeIn();
                $(".offerDialog-Container").css("display", "flex");
                $(".offerDialog-overlayMask").fadeIn();


            });

            //offer dialog cancel
            $("#offerDialog-Close").click(function () {
                $(".offerDialog-Container").fadeOut();
                $(".offerDialog-overlayMask").fadeOut();
            });

            //offer dialog change

            $("#offerDialog-Change").click(function () {

                var payload = "{\"action\":\"changeSKU\",\"value\":\"" + selectedOffer + "\"}";

                oi_postMessageOCC(payload);
            });


            // cart link click
            $("a.sectionsubItem").click(function(){
                if (mobileActive){
                    CloseMobileOverlay();
                }
            });

            // --- desktop ---

            mediaHandler();
            $("#modernCPQCart-OpenButton").click(function(){
                if (mobileActive){
                    OpenMobileOverlay();
                }
                
            });
            $(window).bind("resize", mediaHandler);

            function mediaHandler() {

				mobileActive = (window.innerWidth < desktopBreakpoint);
                
                if (!mobileActive){
					CloseMobileOverlay();
				}
            }


            function OpenMobileOverlay() {
                
                $("#modernCPQCart-Overlay").toggleClass("cartOverlayOpened");

                $(".button-bar").hide();
                setTimeout(function(){
                    $(".button-bar").toggleClass("stickBottom");
                    $(".button-bar").show();
                }, slideTimer); 

            }
			
			
            function CloseMobileOverlay() {

                $("#modernCPQCart-Overlay.cartOverlayOpened").toggleClass("cartOverlayOpened");

                $(".button-bar.stickBottom").hide();
                setTimeout(function(){
                    $(".button-bar.stickBottom").toggleClass("stickBottom");
                    $(".button-bar").show();
                }, slideTimer); 

            }

        });

    } catch (err) {
        console.error(err);
    }

});