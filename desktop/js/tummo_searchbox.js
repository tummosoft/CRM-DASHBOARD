(function ($) {
    $.fn.tummoSearchbox = function (options) {
        var settings = $.extend({
            placeholder: 'Tummo Textbox',
            type: 'text',
            width: null,
            iconRight: null,
            rightOnclick: null,
            onkeypress: null,
        })(options);

        var _myid = $(this).attr('id');
        $(this).addClass('tummo-searchbox');
        document.getElementById(_myid).style.width = settings[0].width;

        var _html = '<input type="text" id="' + _myid + '_input" placeholder="searchbox"><div id="' + _myid + '_icon" class="t-textbox-icon"><img src="' + settings[0].iconRight + '"></div>';

        $(this).append(_html);

        this.setValue = function setValue(value) {
            var _v = $('#' + _myid + '_input').val(value);
        }

        this.getValue = function getValue() {
            var _v = $('#' + _myid + '_input').val();
            return _v;
        }

        $('#' + _myid + '_input').on('keypress', function (e) {
            var _v = $('#' + _myid + '_input').val();
            settings[0].onkeypress(e, _v);
            if (e.keyCode == 13) {
                $('#' + _myid + '_icon').trigger('click');
            }
        });

        return this;
    }

})(jQuery);