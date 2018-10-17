define('oi_smoothScroll', [], function () {

    try {
        var $ = jQuery;

        $(document).ready(function () {

            // smooth scroll
            $(".oi-smoothScroll").on('click', function (event) {

                if (this.hash !== "") {

                    event.preventDefault();

                    var hash = this.hash;

                    $('html, body').animate({
                        scrollTop: $(hash).offset().top - 70
                    }, 800);
                }
            });

        });
    } catch (err) {
        console.error(err);
    }

});