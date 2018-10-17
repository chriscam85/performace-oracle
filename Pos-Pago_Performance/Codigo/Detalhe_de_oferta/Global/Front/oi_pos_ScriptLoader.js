define('oi_pos_ScriptLoader', ["oi_constants"], function (oi_constants) {

    return function () {

        try {
            // pos pago detalhes oferta
            if (!!document.getElementById(oi_constants.idScriptPosDetalheOferta)) {

                console.log("Loading " + oi_constants.idScriptPosDetalheOferta + " Scripts")

                // start pos pago cart code
                modules = [
                    "oi_pos_modernCart",
                    "oi_pos_appMinhaOi",
                    "oi_pos_addons",
                    "oi_pos_lucrosPos",
                    "oi_smoothScroll"
                ];

                require(modules, function () {

                    console.log("oi_pos_modernCart Loaded");
                    console.log("oi_pos_appMinhaOi Loaded");
                    console.log("oi_pos_addons Loaded");
                    console.log("oi_pos_lucrosPos Loaded");
                    console.log("oi_smoothScroll Loaded");

                    // close loading dialog
                    setTimeout(function(){
                        $("#loading-mask").hide();
                    }, 1000);
                    
                });
            }
        } catch (err) {
            console.error(err);
        }


    };
});