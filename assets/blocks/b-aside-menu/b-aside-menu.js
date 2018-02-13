;(function() {

    $.preventScrolling = function(selector, options) {

        // запрещаем прокрутку страницы при прокрутке элемента
        var defaults = {

            classes : {
                scrolled : 'is-scrolled',
                onTop    : 'is-onTop',
                onBottom : 'is-onBottom',
            },
            onTop    : function() {},
            onBottom : function() {}
        };

        var options = $.extend({}, defaults, options);

        var scroller = $(selector);

        scroller.on('scroll', function() {

            if (scroller.scrollTop() == 0) {
                scroller
                    .addClass(options.classes.onTop)
                    .removeClass(options.classes.onBottom);
            }

            if (scroller.scrollTop() == (scroller[0].scrollHeight - scroller.height())) {
                scroller
                    .removeClass(options.classes.onTop)
                    .addClass(options.classes.onBottom);
            }
        });

        if (scroller[0].scrollHeight > scroller.height()) {
            scroller.addClass('with-scroll');
        } else {
            scroller.removeClass('with-scroll');
        }

        $(window).on('resize', function() {

            if (scroller[0].scrollHeight > scroller.height()) {
                scroller.addClass('with-scroll');
            } else {
                scroller.removeClass('with-scroll');
            }
        });

        scroller.off('mousewheel DOMMouseScroll').on('mousewheel DOMMouseScroll', function(e) {

            var scrollTo = null;

            if (e.type == 'mousewheel') {
                scrollTo = (e.originalEvent.wheelDelta * -1);
            } else if (e.type == 'DOMMouseScroll') {
                scrollTo = 40 * e.originalEvent.detail;
            }

            if (scrollTo && scroller[0].scrollHeight > scroller.height()) {
                e.stopPropagation();
                e.preventDefault();
                $(this).scrollTop(scrollTo + $(this).scrollTop());
            }
        });
    };

})();
/**
 * Simple menu
 * @version 1.0.0-beta.1
 */
;(function($) {

  $.fn.simpleMenu = function(options) {

    var settings = $.extend(true, {
        timing : 300,
        topMargin : 0,
        menu   : {
            list    : 'ul',
            item    : 'li',
            trigger : 'a'
        },
        classes : {
            opened : 'opened',
            active : 'active',
            used   : 'used'
        },
        attrs : {
            opened : {
                key    : 'opened',
                true   : 'true',
                false  : 'false'
            }
        }
    }, options);

    var $this = this;
    var $trigers = $this.find(settings.menu.list).parent(settings.menu.item).find('> ' + settings.menu.trigger);

    $trigers.on('click', function(event) {

        event.preventDefault();

        var $list = $(this).parent(settings.menu.item).find('> ' + settings.menu.list);

        $list.css({
            display:'block',
        });

        if ($list.parent(settings.menu.item).hasClass(settings.classes.opened)) {

            $list.stop().animate({
                marginTop : -($list.outerHeight(true)-settings.topMargin)
            }, settings.timing, function() {
                $list
                    .attr(settings.attrs.opened.key, settings.attrs.opened.false)
                    .addClass(settings.classes.used)
                    .parent(settings.menu.item).removeClass(settings.classes.opened);
            });

        } else {

            if (!$list.hasClass(settings.classes.used)) {
                $list
                    .css({
                        marginTop : -($list.outerHeight(true)-settings.topMargin)
                    })
                    .addClass(settings.classes.used);
            }

            $list
                .parent(settings.menu.item).addClass('opening')
                .end()
                .stop().animate({
                    marginTop : (0 + settings.topMargin)
                }, settings.timing, function() {
                    $list
                        .attr(settings.attrs.opened.key, settings.attrs.opened.true)
                        .parent(settings.menu.item).removeClass('opening')
                            .end()
                        .addClass(settings.classes.used)
                        .parent(settings.menu.item).addClass(settings.classes.opened);
                });
        }

    });

  };

})(jQuery);
/**
 * Мобильное меню сайта
 */
var asideMenuBtn      = $('.b-aside-menu-btn');
var asideMenu         = $('.b-aside-menu');
var asideHead         = $('.b-aside-menu__head');
var asideMenuContent  = $('.b-aside-menu__content');
var asideMenuScroller = $('.b-aside-menu__scroller-content');
var asideMenuFoot     = $('.b-aside-menu__foot');


function openAsideMenu() {
    asideMenu.addClass('js-animate js-opening');
}

function closeAsideMenu() {

    asideMenu.removeClass('js-animate');

    setTimeout(function() {
        asideMenu.removeClass('js-opening');
    }, 150);
}

var pxScroller = document.querySelector('.b-aside-menu__scroller');

function pxAsideHead(event) {
    asideHead.css({
        transform : 'translateY(' + event.target.scrollTop / 1.8 + 'px)'
    });
}

pxScroller.addEventListener('scroll', pxAsideHead, supportsPassive ? { passive: true } : false);



asideMenuBtn.on('pointerup', function(event) {
    event.preventDefault();
    openAsideMenu();
});

$('.b-aside-menu__close').on('pointerup', function(event) {
    event.preventDefault();
    closeAsideMenu();
});

$('.b-aside-menu__overlay').on('pointerup', function(event) {
    event.preventDefault();
    closeAsideMenu();
});

/**
 * запрещаем прокрутку страницы при прокрутке бокового-мобильного
 */
$.preventScrolling($('.b-aside-menu__scroller'));


/**
 * Клонирование верхнего-левого меню в боковое-мобильное
 */
if ($.exists('.app-header__menu')) {

    var newTopNav = $('.app-header__menu').clone();

        newTopNav.each(function(index, el) {
            $(this).find('.app-header__menu-dropdown-img').unwrap();
            $(this).find('.app-header__menu-dropdown-img').remove();
        });

    newTopNav
        .removeClass('app-header__menu')
        .addClass('aside-nav-list aside-nav-list__app-header-menu')
        .appendTo(asideMenuScroller);

}









/*Добавление стрелочек для li*/
$.each(asideMenuScroller.find('li'), function(index, element) {

    if ($(element).find('ul').length) {

        var triggerIcon = ['<div class="svg-icon svg-icon--angle-down">',
                '<svg class="svg-icon__link" fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">',
                    '<path d="M7 10l5 5 5-5z"/> <path d="M0 0h24v24H0z" fill="none"/>',
                '</svg>',
            '</div>'].join('');

        var subMenuTrigger = $('<div class="sub-menu-trigger">' + triggerIcon + '</div>');

        $(element)
            .addClass('is-has-child')
            .append(subMenuTrigger);
    }
});
if ($.exists('.b-aside-menu')) {
    $('.aside-nav-list').simpleMenu({
        timing : 500,
        menu : {
            trigger : '.sub-menu-trigger'
        }
    });
}
