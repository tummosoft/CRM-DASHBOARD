(function ($) {    
    $.fn.tummoSmallDialog = function (options) {
        var settings = $.extend({ 
            title: 'Tummo Dialog',
            text:'text',
            width: null,
            height:null,
            buttons:null,
            fadeout: null,
            fadein: null,                                
        })(options);
        var callfrom = '';
        var id = $(this).attr('id');
        var ele = document.getElementById(id);
        var config = settings[0];       
        var html = '<div class="tm-call-dialog"><div id="digclose" class="cal-dialog-btn-close"></div><div class="call-dilog-body">';
        var _title = '<p id="' + id + '_title">' + config.title + '</p>';
        var _body = ' <div class="dot-line-animation"><span class="dot-line dot-linea"></span><span class="dot-line dot-lineb"></span><span class="dot-line dot-linec"></span></div>  <div id="' + id + '_text" class="phone-text">' + config.text + '</div>';
        var _btn = '';
        if (config.buttons) {
            _btn = '<div class="group-btn">';
            for (var i = 0; i < config.buttons.length; i++) {
                _btn += '<div id="' + i +'" name=' + config.buttons[i].name + ' class="call-dialog-btn"><div class="call-dialog-title">' + config.buttons[i].text + '</div> <div class="call-dialog-img"><img src="' + config.buttons[i].icon + '"></div></div>';
            }
            _btn += '</div>';
        }
        html += _title + _body + _btn;
        html += '</div></div>';

        $(this).html(html);

        $('.call-dialog-btn').on('click', function () {
            var id = $(this).attr('id');                    
            config.buttons[id].click(id,callfrom);
        })

        this.setText = function setText(text) {                  
            $('#' + id + '_text').text(text);
        }

        this.setTitle = function setTitle(title) {
            $(this).find('p').text(title);
        }
        
        this.showdialog = function showdialog(callAt) {
            ele.style.display = 'block';
            callfrom = callAt;
        }
        this.hide = function hide () {
            ele.style.display = 'none';
        }

        $('#digclose').click(function () {
            ele.style.display = 'none';
        })

        return this;
}
})(jQuery);