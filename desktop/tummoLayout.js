(function ($) {
    $.fn.tummoLayout = function (options) {
        var settings = $.extend({
            width: null,
            height: null,
            layout: [{ id: 'page1', width: 0 }, { id: 'page2', width: 200 }, { id: 'page3', width: 0 }],
        }, options);

        var startRezise = false;
        var defaultWidth = 0;
        var lastwidth = 0;
        var lastX = 0;
        var lastY = 0;
        var currentX = 0;
        var currentY = 0;
        var currentWidth = 0;
        var currentElement;
        var columnID = '';
        var parentID = $(this).attr('id');                
        var lastColumnID = settings.layout[settings.layout.length - 1].id;
        var lastElement = $('#' + lastColumnID);
        var lastElementWidth = 0;

        $(this).css('width', convertValue(settings.width));
        $(this).css('height', convertValue(settings.height));

        if (settings.layout.length == 1) {
            $('#' + settings.layout[0].id).css('width', '100%');
        } else {
            for (var i=0; i < settings.layout.length; i++) {
                $('#' + settings.layout[i].id).css('width', convertValue(settings.layout[i].width));
            };
        }
       
        $('.resize-line').on('mousedown', function (e) {
            startRezise = true;
            columnID = $(this).parent().attr('id');
            lastwidth = $(this).parent().width();
            currentWidth = lastwidth;
            defaultWidth = lastwidth;
            lastX = e.pageX || e.screenX;
            currentElement = document.getElementById(columnID);
            lastElementWidth = lastElement.width();
            if (hasScrollbar(columnID)) {
                $('#' + columnID).css('overflow', 'hidden');
            }
        });
        
        $(this).on('mouseup', function () {
           if (startRezise) {
            startRezise = false;
            currentElement.style.width = currentWidth;                
                lastX = currentX;
                lastwidth = currentWidth;          
           } 
        });

        $(window).on('mousemove', function (e) {
           
                var x = e.pageX || e.screenX;
                var width;
                currentX = x;
                let lastw;
                if (x < lastX) {
                    width = lastwidth + (x - lastX);
                    currentWidth = width
                    
                    lastw   = lastElementWidth + (defaultWidth - width);
                   
                } else if (x > lastX) {
                    width = lastwidth - (lastX - x);
                    currentWidth = width;                    
                    lastw = lastElementWidth - (defaultWidth - width);
                    
                }

            if (startRezise) {
                currentElement.style.width = width + 'px';
                lastElement.css('width', lastw);
            }
        });


    }
})(jQuery);