define('oi_TimeoutRedirect', ["oi_postMessageOCC"], function (oi_postMessageOCC) {

    return function () {

        var payload = "{\"action\":\"redirect\",\"value\":\"timeout\"}";

        console.log("Timeout triggered");
        oi_postMessageOCC(payload);
    }
});