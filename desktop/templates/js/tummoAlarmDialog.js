(function ($) {    
    $.fn.tummoAlarmDialog = function (options) {
        var settings = $.extend({            
            text:'text',
            width: null,
            height:null,            
            click:null,
        })(options);        
        var id = $(this).attr('id');
        var ele = document.getElementById(id);
        var config = settings[0];
        $(this).addClass('tm-alarm-dialog');               
        var html = '<div id="digclose" class="tm-alarm-btn-close"></div><div class="tm-alarm-body"><div id="alarmtext" class="tm-alarm-title">' + config.text + '</div><div class="tm-alarm-group-btn"><button id="btnok" class="tm-alarm-btn tm-alarm-btn-ok">Xác nhận</button><button id="btcancel" class="tm-alarm-btn tm-alarm-btn-ok">Thoát</button></div></div>';
       
        $(this).append(html);

        $('#btnok').on('click', function () {                                      
            config.click('1');
        })

        this.setText = function setText(text) {                  
            $('#alarmtext').text(text);
        }
        
        this.showdialog = function showdialog(callAt) {
            $('#' + id).removeClass('slide-out-bck-center');     
                                    
            ele.style.display = 'block';
            callfrom = callAt;
        }
        this.hide = function hide () {
            $('#' + id).addClass('slide-out-bck-center');            
            //ele.style.display = 'none';
        }

        $('#digclose').click(function () {
            $('#' + id).addClass('slide-out-bck-center');
           // ele.style.display = 'none';
        });

        $('#btcancel').click(function () {
            $('#' + id).addClass('slide-out-bck-center');
          //  ele.style.display = 'none';
        });
        
        return this;
}
})(jQuery);