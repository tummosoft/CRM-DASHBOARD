(function ($) {
    $.fn.tummoCombobox = function (options) {
        var settings = $.extend({
            data: null,
            width: null,
            onChange: function (value) {
            },
            text: 'Tummo Combobox',
            value: '',
            url: '',
            respect: null,    
            message: null,        
            style: 'yellow',
            checkbox: false,
            hasIcon: false,  
            default: null,          
            label:null,
            labelWidth: 0,
        }, options);

        var config = settings;
        var multipleSelect = [];
        var id = $(this).attr('id');
        var ele = document.getElementById(id);
        var _inputWidth = config.width;
        var _yell = '';
        var _yebtn = '';
        if (config.style == 'yellow') {
            _yell = 'cbo-yellow';
            _yebtn = 'btn-yellow';
        } else {
            _yell = 'cbo-blue';
            _yebtn = 'btn-blue';
        }

        var _lbl = '';
        let _lblw = config.labelWidth;
        if (config.label !== null) {
            
            _lbl = '<label style="width:' + _lblw + 'px;" class="t-textbox-label" for="' + id + '">' + config.label + '</label>';
        }

        ele.classList.add('tummo-select');
        ele.style.display = 'flex';
        
        let _cvalue = '';
        let _text = '';
        function drawitem(data) {
            var result = '';
            for (var i = 0; i < data.length; i++) {
                if (i == 0) {
                    $('#' + id + '_input').val(data[i].text);
                    $('#' + id + '_input').attr('cvalue', data[i].value);
                    _cvalue = data[i].value;
                    _text = data[i].text;
                }
                let checkbox = '';
                let icon = '';
                if (config.checkbox == true) {
                    checkbox = '<div class="yellow-checkbox" style="display: flex;align-items: center;"><input type="checkbox" style="margin-right:10px;" id="chk_' + data[i].id + '" uid="' + data[i].id + '" text="' + data[i].text + '">';                    
                }
                if (config.hasIcon == true) {
                    icon = '<img class="avatar" src="' + data[i].icon +'">'
                }

                result += '<li id="cbo_' + data[i].id + '" uid="' + data[i].id + '" text="' + data[i].text + '" class="tummo-select-item" cvalue="' + data[i].value + '">' + checkbox;
                result += icon + data[i].text + '</li>';
            }
            document.getElementById(id + '_item').innerHTML = result;    
            if (settings.default !== null) {
                $('#' + id + '_input').val(settings.default.text);
                $('#' + id + '_input').attr('cvalue', settings.default.value);
                _cvalue = settings.default.text;
                _text = settings.default.value;
            }        

        }

        var drawbox = _lbl + '<div style="width:' + _inputWidth + 'px;" class="tummo-select-selection ' + _yell + '"><input id="' + id + '_input" cvalue="' + _cvalue + ' value="' + _text + '" ><div id="' + id + '_btn" class="select-btn ' + _yebtn + '"></div></div><div style="left:' + _lblw + 'px;top:30px;" id="' + id + '_drop" class="tummo-select-dropdown"><div class="tummo-select-dropdown-inner"><ul id="' + id + '_item" class="tummo-select-dropdown-list"></ul></div></div>';

        $(this).append(drawbox);

        function loadData(url) {
            if (url != null) {
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    // Check if fetch request is done
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        var jsonData = JSON.parse(xhr.responseText);
                        if (jsonData != null) {
                            drawitem(jsonData);
                        }
                        
                    }
                };
                xhr.open("GET", url, true);
                xhr.send();
            }
        }

        loadData(config.url);
        var _dropopen = false;

        this.clear = function clear() {
            $('#' + id + '_input').val('');
        }

        this.reload = function (url, data) {
            if (url != null) {
                loadData(url);
            } else {
                drawitem(data);
            }
        }

        var _wDrop;

        var hascheked = false;
        function reCheckWidth() {
            if (hascheked == false) {
                _wDrop = $('#' + id + '_item').width();
                if (_wDrop < _inputWidth) {
                    document.getElementById(id + '_item').style.width = _inputWidth + 'px';
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

        this.getValue = function getValue () {
            let vl = $('#' + id + '_input').attr('cvalue');
            return vl;
        }
        
        this.setValue = function setValue (value) {
            let vl = $('#' + id + '_input').attr('cvalue', value);            
        }

        this.setText = function setText (value) {
            let vl = $('#' + id + '_input').val(value);            
        }

        this.getText = function getText () {
            let vl = $('#' + id + '_input').val();
            return vl;
        }

        const el = document.getElementById(id + '_drop');
        el.addEventListener("click", itemclick, false);
        

        function itemclick(e) {
            let input = document.getElementById(id + '_input');
            var findID = e.target.getAttribute('id');
            var text = $('#' + findID).attr('text');            
            var value = $('#' +  findID).attr('cvalue');
            
            input.value = text;
            input.setAttribute('cvalue', value);

            settings.onChange(value);
            if (config.checkbox !== true) {
                showExpand(id + '_drop');
            } else {
                let checkbox = document.getElementById(e.target.id);
                let hascheckbox = checkbox?.getAttribute('id');
                
                if (hascheckbox.startsWith('chk_')) {                    
                    if (checkbox.checked) {
                        multipleSelect.push(text);
                    } else {
                        multipleSelect.splice(multipleSelect.indexOf(text), 1);
                    }
                    let rs = multipleSelect.join(', ');                    
                    input.value = rs;
                    input.setAttribute('cvalue', rs);
                    
                }
                
            }   
        };

       document.getElementById(id + '_btn').onclick = function () {
           showExpand(id + '_drop');
       } 
        
        return this;
    }
})(jQuery);   