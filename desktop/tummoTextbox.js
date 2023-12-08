(function ($) {
    $.fn.tummoTextbox = function (options) {
        var settings = $.extend({ 
                    uid:'',
                    placeholder: 'Tummo Textbox',
                    type:'text',
                    width: null,
                    fullwidth: false,
                    iconLeft:null,
                    iconRight:null,
                    leftOnclick: null,
                    rightOnclick: null,
                    onFocus:null,
                    onChange: null,
                    onkeypress: null,
                    onkeydown: null,
                    onkeyup: null,
                    onLostFocus: null,
                    require: null,
                    label: null,
                    labelWidth:80,
                })(options);
                                
                
                var _iconleft = '';
                var _iconright = '';
                var _l = 0;
                var _r = 0;
                var _id = $(this).attr('id');
                var lblw;
                var _myid = '';
                
                $(this).addClass('tummo-textbox-x');
                if (settings[0].iconLeft != null) {
                    var _fl = '';
                    if (settings[0].leftOnclick) {
                        _fl = ' onclick="' + settings[0].leftOnclick.name + '()" ';
                    }
                    _iconleft = '<div class="t-textbox-icon"' + _fl + ' style="background: url(' + settings[0].iconLeft + ');background-size: 16px 16px;background-position: center center;background-repeat: no-repeat;"></div>';
                        _l = 25;
                }

                if (settings[0].iconRight != null) {
                    var _fl = '';
                    if (settings[0].rightOnclick) {
                        _fl = ' onclick="' + settings[0].rightOnclick.name + '()" ';
                    }
                    _iconright = '<div class="t-textbox-icon"' + _fl + ' style="background: url(' + settings[0].iconRight + ');background-size: 16px 16px;background-position: center center;background-repeat: no-repeat;"></div>';
                        _r = 25;
                }

                var _wbox = ' style="width:'+ settings[0].width +'px" ';
                var _w = settings[0].width - (_l + _r);
                var style = '';
                var _kpress;
                var _lostfocus = '';
                _myid = _id + '_input';
                if (settings[0].onkeypress != null ) {
                    _kpress = ' onkeypress="' + settings[0].onkeypress.name + '(event)" ';
                }                

                if (settings[0].onLostFocus != null ) {
                    var _fun = settings[0].onLostFocus.name + "('" + _myid +"')"
                    _lostfocus = ' onfocusout="' + _fun + '" ';
                }
               
                var html = '<div class="tummo-textbox" ' + _wbox + '>' + _iconleft + '<input id="' + _myid + '" name="' + _myid + '" ' + style + ' placeholder="' + settings[0].placeholder + '" type="' + settings[0].type + '" ' +  _kpress + _lostfocus + '>' + _iconright + '</div>';
                
                var lbl = '';
                if (settings[0].label != undefined) {
                    lbl = '<label style="width:' + settings[0].labelWidth + 'px;" class="t-textbox-label">' + settings[0].label + '</label>';
                };
                $(this).append(lbl + html);

                $('#' + _myid).focus(function(){
                    $('#' + _id).css("border", "1px solid #2742db");
                    $('#' + _id).css("box-shadow", "1px 1px 3px #84A0C4");
                });

                $('#' + _myid).focusout(function(){
                    $('#' + _id).css("border", "1px solid #84A0C4");
                    $('#' + _id).css("box-shadow", "none");
                });
                
                this.getID = function getID () {
                    return _myid;
                }

                this.val = function val(value) {
                    $('#' + _myid).val(value);
                }

                this.getValue = function getValue() {                    
                    var _v = $('#' + _myid).val();                    
                    return $('#' + _myid).val();
                }

                this.setValue = function setValue(value) {
                    $('#' + _myid).val(value);
                }

                this.clear = function clear() {
                    $('#' +  _myid).val('');
                }

        return this;
    }

})(jQuery);