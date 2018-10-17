define('oi_internet_ScriptLoader', ["oi_constants"], function (oi_constants) {

    return function () {

        try {
            // pos pago detalhes oferta
            if (!!document.getElementById(oi_constants.idScriptInternetDetalheOferta)) {

                console.log("Loading " + oi_constants.idScriptInternetDetalheOferta + " Scripts")

                // start pos pago cart code
                modules = [
                    
                ];

                require(modules, function () {

                  
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