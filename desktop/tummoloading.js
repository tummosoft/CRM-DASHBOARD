(function ($) {    
    $.fn.tummoWaiting = function (options) {
        var settings = $.extend({            
            text:'text',            
        })(options);
        var callfrom = '';
        var id = $(this).attr('id');
        var ele = document.getElementById(id);
        var config = settings[0];   
        
        $(this).addClass('tm-loading-wait');
        var html = '<img class="wait-img" src="/icons/labode.svg" alt=""> <div id="' + id + '_text" class="wait-text">PHUOC SON PAGODA</div> <div class="sk-chase"> <div class="sk-chase-dot"></div> <div class="sk-chase-dot"></div> <div class="sk-chase-dot"></div> <div class="sk-chase-dot"></div> <div class="sk-chase-dot"></div> <div class="sk-chase-dot"></div> </div>';
       
        $(this).html(html);
     
        this.setText = function setText(text) {                  
            $('#' + id + '_text').text(text);
        }
        
        this.show = function showdialog(callAt) {
            ele.style.display = 'block';
            callfrom = callAt;
        }
        this.hide = function hide () {
            ele.style.display = 'none';
        }
        return this;
}
})(jQuery);