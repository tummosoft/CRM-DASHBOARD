(function ($) {
    $.fn.tummoSearchBoxMulti = function (options) {
        var settings = $.extend({            
            data: null,                   
            width: null,     
            onkeypress:null,      
            onchange:null,            
            value: '',          
            url: '', 
            style:'yellow',          
            checkbox:false,
        }, options);
        
        var config = settings;
        
        var id = $(this).attr('id');        
        var _inputWidth = config.width;
        var _yell = '';
        var _yebtn = '';
         if (config.style == 'yellow') {
            _yell = 'cbo-yellow-drop';
            _yebtn = 'btn-yellow-drop';
         } else {
            _yell = 'cbo-blue-drop';
            _yebtn = 'btn-blue-drop';
         }  
        $(this).addClass('tummo-select-drop');
        function drawitem(data) {            
            let result ='';
            for (var i = 0; i < data.length; i++) {   
                let _icon = '';
                if (data[i].icon != null) {
                    _icon = '<img class="list-icon" src="' + data[i].icon +'">';
                }
                
                result += '<li id="' + data[i].id + '" text="' + data[i].text + '" class="tummo-select-item-drop" name="' + data[i].name + '" cvalue="' + data[i].value + '">';               
                result += _icon + data[i].text + '</li>';
               
            }
           $('#' + id + '_item').html(result);
           
        }
           
        var drawbox = '<div style="width:' + _inputWidth +'px;" class="tummo-select-selection-drop ' + _yell + '"><div id="' + id + '_btn" class="select-btn-drop ' + _yebtn + '"></div><input id="' + id + '_input" placeholder="Tìm kiếm tại đây" value=""></div><div id="' + id + '_drop" class="tummo-select-dropdown-drop"><div class="tummo-select-dropdown-inner-drop"><ul id="' + id + '_item" class="tummo-select-dropdown-list-drop"></ul></div></div>';  

        $(this).append(drawbox);
        
        function loadData(url) {           
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                // Check if fetch request is done
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var jsonData = JSON.parse(xhr.responseText);                                     
                    drawitem(jsonData);                    
                }
            };
            xhr.open("GET", url, true);
            xhr.send();        
        }

        loadData(config.url);        
        var _dropopen = false;

        this.reload = function(url) {
            loadData(url);        
        }

        var _wDrop;

        var hascheked = false;
        function reCheckWidth() {      
            if (hascheked == false) {
                
                _wDrop = $('#' + id + '_item').width();                     
                
                if (_wDrop <  _inputWidth) { 
                    document.getElementById(id + '_item').style.width = _inputWidth + 'px';                
                } else if (_wDrop > (_inputWidth * 2)) {
                    document.getElementById(id + '_item').style.width = _inputWidth * 1.5 + 'px';                
                }
                hascheked = true;
            }         
        }
        
        function showExpand(id) {
            var ele = document.getElementById(id);          
            if (_dropopen == false) {
                
                ele.style.display = 'block';
                _dropopen = true;
            } else {
                ele.style.display = 'none';
                _dropopen = false;
            }   
            reCheckWidth(); 
        }
        
        var _key = '';
        
        $('#' + id + '_item').on('click', '.tummo-select-item-drop', function (e) {            
            _key = $(this).attr('name');          
            var _value = $(this).attr('cvalue');
            var _id = $(this).attr('id');                       
            $('#' + id + '_input').attr('key', _key);
            $('#' + id + '_input').attr('cvalue', _value);
            var _data = {key:_key, value:_value};
            config.onchange(_data);                
            showExpand(id + '_drop');
        });

        $('#' + id + '_btn').on('click', function(){           
            showExpand(id + '_drop');
        });
        
        $('#' + id + '_input').on('keypress', function (e) {
            var _value = $('#' + id + '_input').val();            
            config.onkeypress(_key, _value);
            
        });

        return this;
    }
})(jQuery); 