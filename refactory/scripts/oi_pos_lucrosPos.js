define("oi_pos_lucrosPos", ["glide"], function (Glide) {

    console.log("Glide loaded");

    require.ready(function () {

        try {
            var glide = new Glide('.glide', {
                type: 'slider',
                startAt: 0,
                gap: 10,
                focusAt: 'center',
                perView: 2
            }).mount();

            var glide = new Glide('.glideTablet', {
                type: 'slider',
                startAt: 0,
                gap: 10,
                perView: 3.5
            }).mount();

        } catch (err) {
            console.error(err);
        }

    });

});