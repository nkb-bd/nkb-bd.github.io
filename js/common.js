/*
 Template Name: fitnessmoves
 File Name: common.js
 Author Name: ThemeVault
 Author URI: http://www.themevault.net/
 License URI: http://www.themevault.net/license/
 */
$(document).ready(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('#back-to-top').fadeIn();
        } else {
            $('#back-to-top').fadeOut();
        }
    });

    $('#back-to-top').click(function () {
        $("html, body").animate({scrollTop: 0}, 600);
        return false;
    });
});

$(document).ready(function () {
    $(".tv-sidenav a, #myNavbar a, .tv-sidenav-full a, .tv-sidenav-right a ").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 1000, function () {
                window.location.hash = hash;
            });
        }
    });

        // text anim
    // autoplay
    $('#autoplay').textition({
        autoplay: true,
        handler: false,
        interval: 3,
        speed: 1,
        map: { x: 50, y: 20, z: 300 },
        // speed: 1

    });
});

jQuery(function ($) {

    //Initiat WOW JS
    new WOW().init();
    //smoothScroll
    smoothScroll.init();

    // Progress Bar
    $('#tv-skill-list').bind('inview', function (event, visible, visiblePartX, visiblePartY) {
        if (visible) {
            $.each($('div.progress-bar'), function () {
                $(this).css('width', $(this).attr('aria-valuetransitiongoal') + '%');
            });
            $(this).unbind('inview');
        }
    });
});

