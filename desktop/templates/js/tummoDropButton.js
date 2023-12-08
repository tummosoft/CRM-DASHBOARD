(function ($) {
    $.fn.tummoDropButton = function (options) {
        var settings = $.extend({
        icon: null,
        text: '',                
        style: 'yellow',
        width: null,
        dropwidth: null,
        click: null,  
        data:null,                         
        })(options);

        var config = settings[0];
        var id = $(this).attr('id');
      
        $(this).append('<div style="width:' + config.width + 'px" class="tummo-btn-v2 btn-yellow-v2"><div id="' + id + '_btn" class="btn-icon"><img src="' + config.icon + '"></div><div class="btn-line"></div><div class="btn-text">' + config.text + '</div></div>');

        $(this).append('<div style="width:' + config.dropwidth + 'px;" class="tummo-button-dropdown"><div style="width:' + config.dropwidth + 'px;" class="tummo-button-dropdown-inner"><ul id="' + id + '_item" class="tummo-button-dropdown-list"></ul></div></div>');

        function drawitem(data) {
            let _html = '';
            for (var i=0; i < data.length; i++) {
                if (data[i].text == 'line') {
                    _html += '<p class="line-dropdown-list"></p>';
                } else {
                    _html += ' <li id="' + data[i].id + '" cvalue=' + data[i].value + '   class="btn-item-drop"><img class="item-icon" src="' + data[i].icon + '">' + data[i].text + '</li>';
                }                
            }

            $('#' + id + '_item').html(_html);
        }

       
        drawitem(config.data);    
        var isDrop = false;  

        function showdrap() {
            if (isDrop) {
                $('.tummo-button-dropdown').hide();
                isDrop = false;
            } else {
                $('.tummo-button-dropdown').show();
                isDrop = true;
            }
        }

        $('.tummo-btn-v2').on('click', function () {
                showdrap();           
        });

        $('.btn-item-drop').on('click', function () {
            let id = $(this).attr('id');
            let value = $(this).attr('cvalue');

            config.click(id, value);

            showdrap();
        });

        return this;
    }

   

})(jQuery);