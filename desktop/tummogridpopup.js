(function ($) {
    $.fn.tummogridpopup = function (options) {
        var settings = $.extend({
            width: 250,
            height: 250,
            rows: null,
            click: null,
            url: '',
        })(options);

        var listID = $(this).attr('id');
        var redraw = false;
        var config = settings[0];        
        var _displayid = '';
        var _w = config.width;

        function drawshell() {
            document.getElementById(listID).classList.add('grid-popup-wrapper');            
            document.getElementById(listID).classList.add('grid-popup');            
            
            let _ul = document.createElement('ul');
            _ul.classList.add('tummo-listview-popup');
            _ul.id = listID + '_listview';
            
            
            document.getElementById(listID)?.appendChild(_ul);         
        }

        
        function drawbody(data) {
            let items = '';
            
            for (var i = 0; i < data.length; i++) {
                items += '<li data="' + data[i].text + '" hidenid="' + data[i].hidenid + '" datasrc="' + data[i].icon + '" class="popup-item"><img class="grid-avatar" src="' + data[i].icon + '">' + data[i].text + '</li>';
            }
            return items;
        }
        
        function loadData(url) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                // Check if fetch request is done
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var jsonData = JSON.parse(xhr.responseText);                                       
                    var body = drawbody(jsonData);
                    $('#' + listID + '_listview').html(body);
                }
            };
            xhr.open("GET", url, true);
            xhr.send();
        }
        
        drawshell();
        loadData(config.url);

        document.getElementById(listID).onclick = function (e) {
            var target = e.target;
            if (target.classList.contains('popup-item')) {
                var vl = target.getAttribute('data');
                var hidenid = target.getAttribute('hidenid');
                var datasrc = target.getAttribute('datasrc');
                var data = { hidenid: hidenid, text: vl, src: datasrc, id: _displayid };
                config.click(data);
            }
        }
        
        this.reload = function reload(url) {
            loadData(config.url);
        }

        var listviewshow = false;
        this.show = function show(value, offset, id) {

            var move = document.getElementById(listID);
            var x1 = (offset.x - _w) + 10;
            var y1 = offset.y + 15;
            move.style.display = 'block';
            move.style.left = x1 + 'px';
            move.style.top = y1 + 'px';
            listviewshow = true;
            _displayid = id;
        }
        this.width = function width(value) {
            _w = value;
        }
        this.hide = function hide() {
            $('#' + listID).hide();
            listviewshow = false;
        }
        $(this).hide();

        return this;
    }
})(jQuery);