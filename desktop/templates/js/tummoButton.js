(function ($) {
    $.fn.tummoButton = function (options) {
        var settings = $.extend({
        icon: null,
        text: '',                
        style: 'yellow',
        click: null,                           
        })(options);

        var config = settings[0];
        var id = $(this).attr('id');
        var ele = document.getElementById(id);

        if (config.style == 'yellow') {
            $(this).addClass('tummo-btn-v2 btn-yellow-v2');
        }
        var icon = '';
        if (config.icon != null) {
            icon = '<span class="btn-icon">' + config.icon + '</span>';
            $(this).append(icon);
        }

        $(this).append('<span>' + config.text + '</span>');

        ele?.addEventListener('click', function () {
            if (config.click) {
                config.click();
            }
        });

        return this;
    }

   

})(jQuery);