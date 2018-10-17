/**
 * @param dependencies {Array} name of modules this code depends on. Can exclude ".js"
 * @param callback {Function} function containing this module's functionality.
 * @version Fri Feb 25 18:44:56 2011
 */

var oiModulesToLoad = [
  "oi_tagGTM",
  "lazyload.amd.min",
  "bootstrap",
  "oi_pos_IFrame"
];


// =========== pos pago modules ===========

if (!!document.getElementById("config-celular-pos-pago")) {
  var modules = [
    "oi_pos_modernCart.min",
    "oi_pos_appMinhaOi.min",
    "oi_pos_addons.min",
    "oi_pos_lucrosPos.min",
    "oi_smoothScroll.min",
    "oi_Refresh.min",
  ];

  oiModulesToLoad = oiModulesToLoad.concat(modules);
}

// =========== pos pago conversacional modules ===========
if (!!document.getElementById("config-oi_pos_fluxoConversacional")) {
  var modules = [
     "oi_pos_consumo",
     "oi_closeModalConv"
  ];

  oiModulesToLoad = oiModulesToLoad.concat(modules);
}

// =========== internet modules ===========
if (!!document.getElementById("config-internet-2PBL")) {
  var modules = [
    "oi_internet_addons",
    "oi_internet_vantagensDoPlano",
    "oi_internet_carrinho",
    "oi_smoothScroll.min"
  ];

  oiModulesToLoad = oiModulesToLoad.concat(modules);
}


require(oiModulesToLoad, function (oi_tagGTM, lazyload) {
  /*
   * Put all functions for config here
   */

  console.log("Modules loaded");

  //this function runs when the page loads
  require.ready(function () {

    try {

      var myLazyLoad = new lazyload({
        elements_selector: ".lazy",
        class_loading: "lazy-loading",
        class_loaded: "lazy-loaded",
        class_error: "lazy-error"
      });

      // close loading dialog
      setTimeout(function () {
        $("#loading-mask").hide();
        $("#loading-mask").toggleClass("loading-mask-force-show");
      }, 200);

      // load GTM tagging
      oi_tagGTM();

    } catch (err) {
      console.error(err);
    }

  });
});