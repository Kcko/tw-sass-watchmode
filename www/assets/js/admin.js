$(function () {
    $.nette.init();

    // real estate, edit
    var realEstateFileFilled = $('input[name="file_filled"]');
    if (realEstateFileFilled.length && realEstateFileFilled.val()) {
        var div = $('<div style="margin-top: 5px;" />');
        var $img = $('<img />');
        var $linkToDel = $('<a />').text('smazat');

        $linkToDel.css('margin-left', '5px');
        $linkToDel.attr('href', '?');
        $linkToDel.on('click', function (e) {
            e.preventDefault();
            var url = $('#image-delete-url').data('url');
            $.get(url);
            div.remove();
            $('input[name="file_filled"]').val('');
        });

        $img.attr('src', realEstateFileFilled.val());

        div.append($img);
        div.append($linkToDel);
        div.insertAfter($('#frm-form-file'));
    }

    $('#gallery').insertAfter('#frm-form-files');
    $('#gallery a').on('click', function (e) {
        e.preventDefault();
        var url = $(this).attr('href');
        $.get(url);
        $(this).closest('div').remove();
    });
});

$(document).on('click', '.modal-close', function () {
    $(document).find('.blocker').addClass('hide');
});

var afterAjax = function () {};

$(document).ready(function () {
    afterAjax();

    if ($('#inactivity-logout').length) {
        var logoutInterval;
        var debounce;

        var logout = function () {
            console.log('spousti se timeout na odhlaseni');
            logoutInterval = setTimeout(function () {
                console.log('ODHLASENI');
                window.location.href = $('#inactivity-logout').data('url');
            }, $('#inactivity-logout').data('time'));
        };

        logout();

        $(document).on('keyup mousemove paste change click focus scroll', function (e) {
            clearTimeout(debounce);
            clearTimeout(logoutInterval);
            console.log('clear');
            debounce = setTimeout(function () {
                logout();
            }, 500);
        });
    }
});

$.nette.ext('afterAjax', {
    before: function (jqXHR, settings) {},
    success: function (payload) {
        afterAjax();
    },
});

$.nette.ext('stopSubmit', {
    before: function (jqXHR, settings) {
        if (!settings.nette) {
            return;
        }

        var $el = settings.nette.el;
        if ($el.hasClass('stopSubmit')) {
            $el.val('Odesílám ...');
            $el.attr('disabled', 'disabled');
        }
        // console.log('before');
        // console.log($el[0]);
        // console.log($el);
    },
    complete: function (jqXHR, status, settings) {
        if (!settings.nette) {
            return;
        }

        var $el = settings.nette.el;
        if ($el.hasClass('stopSubmit')) {
            $el.val('Uložit');
            $el.removeAttr('disabled');
        }
    },
});

//VERSION:1
