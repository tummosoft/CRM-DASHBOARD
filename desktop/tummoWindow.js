(function ($) {         
    $.fn.tummoWindow = function(options){
        var settings = $.extend({                             
        width: null,
        height: null,                
        title: 'Tummo Combobox',
        url: '',
        html:'',
        onclick:null,
        button:false,
        bttdata: null
    }, options);
    
    var _id = $(this).attr('id');
    var _idclose = _id + '_close';
    var _idheader = _id + '_header';
    
    var startClick = false;
    var startMouseDown = false;
    var startDrag = false;

    var _header = '<div id="' + _idheader + '" class="t-window-header"><div class="t-window-title"><span class="icons-window">' + settings.title + '</span></div><div id="' + _idclose + '" class="t-window-close-bg"><div class="t-window-close"></div></div></div>';
    var _body = '<div class="t-window-body"><iframe style="width: 100%;height: 100%;outline: none;border: none;" src="http://127.0.0.1:3000' + settings.url + '" ></iframe></div>';
    var _footer = '<div class="t-window-footer icons-resize"></div>';
    var _buttongroup = '';

    if (settings.button == true) {
        var buttons = StringToObject(settings.bttdata);
        _buttongroup = '<div class="tm-btn-group">';
        for (var i = 0; i < buttons.length; i++) {
            _buttongroup += '<div onclick="' + buttons[i].click.name + '()" class="tummo-btn">' + buttons[i].text + '</div>';
        }
        _buttongroup += '</div>';
    }

    var _window = _header + _body +  _buttongroup + _footer;
    
    $(this).addClass('tummo-windows');
    $(this).append(_window);
    let ele = document.getElementById(_id);
    
    let lastposition = {x:0,y:0};
    let lastsize = {w:0,h:0};
    let currentposition = {x:0,y:0};
    ele.style.position = 'fixed';
    ele.style.width = settings.width;
    ele.style.height = settings.height;

    lastsize.w = settings.width;
    lastsize.h = settings.height;
    // Event
    $('#' + _idclose).click(function () {                        
    $('#' + _id).hide();
});

$('#' + _idheader).on('click', function (e) {
    startClick = true;    
});

$('#' + _idheader).on('mousedown',function (e) {
  
        window.addEventListener('mousemove', MoveWindow);
        window.addEventListener('mouseup', MouseUpWin);
  
});
$('#' + _idheader).on('mouseup',function (e) {
    
    window.removeEventListener('mouseup', MouseUpWin);
        startClick = false;
});

function MouseUpWin() {
    window.removeEventListener('mousemove', MoveWindow);
}

this.show = function show() {
    $('#' + _id).show();
}

let container= {x:0,y:0};

function MoveWindow(e) {
    ele.style.left = e.pageX + 'px';          
    ele.style.top = e.pageY + 'px';   
  }




    return this;
    }
})(jQuery); 