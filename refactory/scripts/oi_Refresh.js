define('oi_Refresh', ["oi_postMessageOCC"], function (oi_postMessageOCC) {

    try {
        var $ = jQuery;

        require.ready(function () {
            console.log("Refresh script");
            refresh = true;
            var payload = "{\"action\":\"refreshPage\",\"value\":\"true\"}";
            
            $("#pl_addons").on('click', function() {

                if (refresh) {
                    oi_postMessageOCC(payload);
                    refresh = false;
                }

            });

            $("#pl_dependentes .group-option input:not(:checked)").on('click', function() {
                oi_postMessageOCC(payload);
            });

        });

    } catch (err) {
        console.error(err);
    }

});