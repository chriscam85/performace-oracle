define('oi_postMessageOCC', ["oi_constants"], function (oi_constants) {

    return function (payload) {

        try {
            var commerceCloudURLs = oi_constants.commerceCloudURL;
            var urlsToValidate =  commerceCloudURLs.split("|");

            var parentWindow = window.parent;

            if (parentWindow !== window) {
                window.top.postMessage(payload, "*");

                $(window).one('message onmessage', function (e) {
                    try {
                        found = false;
                        for (var i = 0; i < urlsToValidate.length; i++) {
                            splitURL = urlsToValidate[i].charAt(urlsToValidate[i].length - 1) == '/' ? urlsToValidate[i].substr(0, urlsToValidate[i].length - 1) : urlsToValidate[i];
                            if (e.originalEvent.origin === splitURL) {
                                found = true;
                                break;
                            }
                        }
                        if (!found) {
                            throw "The parent window URL did not match any allowed endpoints. Please contact your site admin.";
                        }

                    } catch (err) {
                        if (typeof err == "string") {
                            console.error(err);
                        } else {
                            console.error("An unknown error occurred during client integration.");
                        }
                    }
                });
            }
        } catch (err) {
            console.error(err);
        }

    }
});