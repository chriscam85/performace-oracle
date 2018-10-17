define('oi_Refresh', ["oi_postMessageOCC"], function (oi_postMessageOCC) {

    try {
        var $ = jQuery;

        require.ready(function () {
            console.log("Refresh script");
            refresh = true;

            $("#pl_addons").click(function () {

                if (refresh) {

                    var payload = "{\"action\":\"refreshPage\",\"value\":\"true\"}";
                    oi_postMessageOCC(payload);
                    refresh = false;
                }

            });

            $("#pl_dependentes .group-option input:not(:checked)").click(function () {

                var payload = "{\"action\":\"refreshPage\",\"value\":\"true\"}";
                oi_postMessageOCC(payload);

            });

        });

    } catch (err) {
        console.error(err);
    }

});