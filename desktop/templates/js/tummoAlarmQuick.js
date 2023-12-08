(function ($) {
    $.fn.tummoAlarmQuick = function (options) {
        var settings = $.extend({            
            text: 'Tummo Combobox',                                              
        }, options);
        
        var config = settings;
        var id = $(this).attr('id');
        var ele = document.getElementById(id);
        
        $(this).addClass('tummo-dialog-alarm-quick');     
        $(this).css("display", "none");
        $(this).append('<div id="alarmtitle" class="tummo-dialog-alarm-quick-content"></div>');
        
        
        this.show= function show(text) {
            document.getElementById("alarmtitle").innerHTML = text;
            ele.style.display = "block";
             
            setTimeout(function () {
                ele.style.display = "none";
            }, 3000);
        }
        
        this.hide= function hide() {
            ele.style.display = "none";
        }

        return this;
    }
})(jQuery);   