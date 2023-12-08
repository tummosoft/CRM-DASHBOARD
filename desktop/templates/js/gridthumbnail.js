(function ($) {
    $.fn.tummoGridThumbnail = function (options) {
        var settings = $.extend({
            maxcolumn: 4,
            maxrow: 3,
            header: null,
            rowclick: null,
            rows: null,
            pagechange: null,
            rowselected: null,
            multipleselect: false,
            width: 600,
            height: 400
        }, options);
        
   
        var _arr = settings.header;
        const _headerObject = StringToObject(_arr);
        var _html = '';
        var _header = '<div class="tummo-navigation">\n' + ' <div class="tummo-navigation-item">\n';

        for (var i = 0; i < _headerObject.length; i++) {
            for (var j = 0; j < _headerObject[i].items.length; j++) {
                var bttype = _headerObject[i].items[j].type;
                var text = _headerObject[i].items[j].text;
                
                if (bttype == 'file') {
                    _header += '<form style="display:none" id="formupimage" enctype="multipart/form-data"><input id="file" type="file" multiple /><button id="btnupload" class="submit-btn" type="submit">Upload</button></form>';
                    _header += '<div class="tm-btn-nav navigation-input" type="' + _headerObject[i].items[j].type + '" onclick="' + _headerObject[i].items[j].rowclick.name + '()"><span>' + text + '</span></div>';

                } else {
                    _header += '<div onclick="' + _headerObject[i].items[j].rowclick.name + '()" class="tm-btn-nav tm-button">' + text + '</div> \n';
                }


            }

        }

        var _body = '';
        // ------------------ ROW
        var _totalSelected = 0;
        var _rows = settings.rows;
        var _body = StringToObject(_rows);
        var _bodyHTML = '<ul id="page1"  class="grid-thumbnail">';
        var _totalItems = 0;
        var _limitRows = 0;
        var _totalPage = 0;
        var _currentPage = 1;
        var _lastPage = 1;

        for (var i = 0; i < _rows.length; i++) {
            _totalItems = _rows[i].items.length;
            _limitRows = (settings.maxrow * settings.maxcolumn);
            _totalPage = Math.ceil(_totalItems / _limitRows);
            var _pageNext = 0;
            for (var j = 0; j < _rows[i].items.length; j++) {
                if (j <= (_pageNext)) {
                    _bodyHTML += '<li id="item-' + _rows[i].items[j].id + '" class="thumbnail-item"><img src="' + _rows[i].items[j].src + '"><div class="tummo-checkbox checkitem"><input data-src="' + _rows[i].items[j].src + '" type="checkbox"></div> <div class="grid-loading"></div></li>';
                } else {
                    _bodyHTML += '<li id="item-' + _rows[i].items[j].id + '" class="thumbnail-item"><img id="img-' + _rows[i].items[j].id + '" data-src="' + _rows[i].items[j].src + '"><div class="tummo-checkbox checkitem"><input type="checkbox"></div> <div class="grid-loading"></div></li>';
                }
                _pageNext = _pageNext + 1;
                if (_pageNext >= _limitRows) {
                    _currentPage = _currentPage + 1;
                    _bodyHTML += '</ul><ul style="display: none" id="page' + _currentPage + '" class="grid-thumbnail">'; // close page 1
                    _pageNext = 0;
                }
            }
        }
        _bodyHTML += '</ul>';

        var _rpage = '';
        for (var i = 1; i <= _totalPage; i++) {
            _rpage += '<option>' + i + '</option>';
        }

        var _page = '<span class="spector2"></span><div class="tm-btn-group"><div class="tm-label"> Trang hiện tại</div><div class="tm-select"><select class="tm-select-box" id="pagechange">' + _rpage + '</select></div></div><span class="spector2"></span><div class="navigation-label">Đã chọn: <span id="count-selected">0</span></div><div class="page-more"></div>';

        settings.width = settings.width - 25;
        settings.height = settings.height - 25;
        _header += _page + '</div>\n</div>';
        var _w = (settings.width / settings.maxcolumn) - 15;
        var _h = (settings.height / settings.maxrow) - 10;              
        $(this).addClass('tummo-grid-thumbnail').append(_header + _bodyHTML);
        var css = '.tummo-grid-thumbnail {width: ' + settings.width + 'px;height: ' + settings.height + 'px;} .grid-thumbnail {grid-template-columns: repeat(' + settings.maxcolumn + ', 1fr);}';
        var css1 = '.thumbnail-item {width: ' + _w + 'px;height: ' + _h +' px;position: relative;} .thumbnail-item img {width: ' + _w + 'px;height: ' + _h +' px;position: relative;} .grid-loading {width: ' + _w + 'px;height: ' + _h +' px} .item-selected {width: ' + _w + 'px;height: ' + _h +' px;position: relative;} .tummo-navigation {width:' + _w + '}';
                         
        document.querySelector('head').innerHTML += "<style>" + css + css1 + "</style>";

        $('.checkitem').find('input').change(function () {
            var _cheked = $('.checkitem input:checked');
            if (_cheked.length == 0) {
            } else {
                var _parent = $(this).parent().parent().attr('id');
                $('#' + _parent).addClass('item-selected');

            }

            _totalSelected = 0;
            $('.checkitem').each(function () {
                if ($(this).find('input').is(':checked')) {
                    _totalSelected = _totalSelected + 1
                } else {
                    $(this).parent().removeClass('item-selected');
                }
            })

            $('#count-selected').text(_totalSelected);
        });
        $(this).ready(function () {
            $(this).find('.grid-loading').each(function () {
                $(this).removeClass('grid-loading');
            })
        });
        // -----------------------------

        // ------------------------
        // Trả về kết quả

        this.dataselected = function (data) {
            var result = [];
            for (var i = 1; i <= _totalPage; i++) {
                var pg = $('#page' + i);
                var check = $(pg).find('li').each(function () {
                    var checkbox = $(this).find('input');
                    if (checkbox.is(':checked')) {
                        var getSrc = $(checkbox).attr('data-src');
                        result.push(getSrc);
                    }
                });
            }
            return result;
        }
        // Upload Image

        // ppppppp
        $('#pagechange').on('change', function () {
            if (_lastPage != $(this).val()) {
                $('#page' + _lastPage).hide();
                _lastPage = $(this).val();
            }
            var _page = $('#pagechange').val();
            $('#page' + _page + ' .thumbnail-item').each(function () {
                var childID = $(this).attr('id');
                childID = childID.substr(4);
                var lastSRC = $('#img' + childID).attr('src');
                if (lastSRC == undefined) {
                    var src = $('#img' + childID).attr('data-src');
                    $('#img' + childID).attr('src', src);
                }
            })

            $('#page' + _page).show();
        });

        return this;
    }

})(jQuery);