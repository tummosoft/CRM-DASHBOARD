(function ($) {
    $.fn.tummoboxgridcontrol = function (options) {
        var settings = $.extend({
            id: null,
            data: null,
            width: null,
            onExpand: null,
            onChange: null,
            reloadWithData: null,
            text: 'Tummo Combobox',
            value: '',
            label: '',
            labelWidth: 80,
            checkbox: false,
            pagination: true,
        }, options);

        var id = settings.id;
        var data;
        if (settings.data != null) {
            data = StringToObject(settings.data);
        }
        var defaultText;
        var _lblw = settings.labelWidth;
        var _inputWidth = settings.width - 20;
        var _lbl = '';

        if (_lblw > 30) {
            this.css('display', 'flex');
            _lbl = '<label class="label-grid" style="width:' + _lblw + 'px;">' + settings.label + '</label>';
        }

        var drawbox = _lbl + '<div id="' + id + '_combobox" class="grid-t-tummo-combobox" style="width:' + _inputWidth + 'px;">';

        function drawitem(data) {
            var result = '';
            for (var i = 0; i < data.length; i++) {
                if (i == 0) {
                    $('#' + id + '_input').val(data[i].text);
                }

                result += '<li id="' + data[i].id + '" text="' + data[i].text + '" class="grid-combobox-item" value="' + data[i].value + '">';

                if (settings.checkbox) {
                    result += '<div class="grid-tummo-checkbox"><input id="' + id + '_' + i + '_input" type="checkbox"><span class="has-checkbox">' + data[i].text + '</span></div></li>';
                } else {
                    result += data[i].text + '</li>';
                }
            }
            $('#' + id + '_item').html(result);

        }
        var ele = document.getElementById(id);
        var _l = ele.offsetLeft + 27;
        var _t = ele.offsetTop + 27;
        var _w = $('#' + id + '_input').width();

        var item = '<ul id="' + id + '_item" style="position:fixed;width:' + _w + 'px;left:' + _l + 'px;top:' + _t + 'px;" class="grid-combobox-item-box">';

        drawbox += '<div class="grid-combobox-input"><input id="' + id + '_input" value="' + defaultText + '" class="grid-combobox" type="text" placeholder="' + settings.text + '"><div id="' + id + '_btn" class="grid-combobox-expand"></div></div>';

        if (settings.url != null) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                // Check if fetch request is done
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var jsonData = JSON.parse(xhr.responseText);
                    _rootData = jsonData;
                    drawitem(jsonData);
                }
            };
            xhr.open("GET", settings.url, true);
            xhr.send();
        } else {
            drawitem(settings.data);
        }

        item += '</ul></div>';
        var html = drawbox;
        $(this).html(html);
        $('table').append(item);

        var ExpandOpen = false;
        function hideExpand(id) {
            $(id).hide();
            ExpandOpen = false;
        }

        function showExpand(id) {
            $(id).toggle();
            ExpandOpen = true;

        }

        $('#' + id).on('click', function () {
            var getID = '#' + id + '_item';

            showExpand(getID);

            if (settings.onExpand) {
                settings.onExpand();
            }
        });

        var inputboxID = '';

        var gvl;
        $('body table').on('click', '.grid-combobox-item', function () {
            var text = $(this).attr('text');
            var uid = $(this).attr('id');
            var vl = $(this).attr('cvalue');

            $('#' + id + '_input').val(text);
            $('#' + id + '_input').attr('cvalue', vl);
            $('#' + id + '_input').attr('uid', uid);

            let dt = { id: uid, text: text, value: vl };
            gvl = dt;
            settings.onChange(dt);

            if ((ExpandOpen == false)) {
                showExpand('#' + id + '_item');
            } else {
                hideExpand('#' + id + '_item');

            }
        });

        this.getValue = function getValue() {
            return gvl;
        }

        $('#' + id + '_input').focus(function () {
            focusEffect('#' + id + '_input');
        });

        $('#' + id + '_input').focusout(function () {
            lostFocusEffect('#' + id + '_input');
        });

        function focusEffect(id) {
            $(id).parent().css("border", "1px solid #2742db");
            $(id).parent().css("box-shadow", "1px 1px 3px #84A0C4");
        }

        function lostFocusEffect(id) {
            $(id).parent().css("border", "1px solid #84A0C4");
            $(id).parent().css("box-shadow", "none");
        }

        return this;
    }
})(jQuery);
// ------------------------------------------
// DATA GRID
(function ($) {
    $.fn.tummoDataGridView = function (options) {
        var settings = $.extend({
            width: 450,
            height: 650,
            url: '',
            hascheckbox: false,
            onChange: null,
            afterEdit: function () { },
            controls: null,
            control2: null,
            hidecontrol: false,
            header: null,
            calendar: false,
            listview: null,
            rowsperpage: 30,
            data: null,
            blankrow: false,
        })(options);

        var config = settings[0];
        var _thisID = $(this).attr('id');
        var _columnhiden = [];
        var _columntype = [];
        var _columnalign = [];
        var _columwidth = [];
        var _hascalendar = config.calendar;
        var _haslistview = false;
        var clen = null;
        var listviewid = '';
        var emptyrow = '';
        var rowindex = 0;
        var _rowselect = [];
        var calendarid;
        var _rootData = [];
        var _currentData = [];
        var _totalpage = 1;
        var _currentpage = 1;
        var _centerAlign = ' style="text-align: center; vertical-align: middle;" ';
        var _emptylock = false;

        if (config.listview !== null) {
            _haslistview = true;
        }

        var _tablewidth = 0;
        for (i = 0; i < config.header.length; i++) {
            _tablewidth += config.header[i].width;
        }
        _tablewidth = _tablewidth + 30;
        function drawcombobox(vid, vitems) {
            $('#' + vid).tummoboxgridcontrol(vitems);
        }

        function converHours(inputFormat) {
            function pad(s) { return (s < 10) ? '0' + s : s; }
            var d = new Date(inputFormat);
            return [pad(d.getHours()), pad(d.getMinutes())].join(':');
        }

        function drawshell(vheader, vcontrols) {
            var _headitems = vheader;
            var _controlitems = vcontrols;
            var _lengthcolumn = _headitems.length - 1;

            var _controls = '';
            var _control2 = '';

            let _hide = '';
            
            if (config.hidecontrol == true) {
                _hide = 'style="display:none"';
            }

            _controls = '<table ' + _hide + '><thead><tr style="height: 35px;"><th colspan="' + _lengthcolumn + '">';
            _controls += '<div id="' + _thisID + '_control" class="grid-controls-wrapper"><ul class="grid-controls"><div class="group-left">';
            for (var i = 0; i < _controlitems.length; i++) {
                var cbosetting = _controlitems[i];
                _controls += '<li class="control-item"><div id="' + cbosetting.id + '"></div></li>';

            }
            if ((config.control2 != null) && (config.control2 != undefined)) {
                _control2 = '<tr><th colspan="' + _lengthcolumn + '"><div id="' + _thisID + '_control2"><ul class="grid-controls"><div class="group-left">';
                for (var i = 0; i < config.control2.length; i++) {                    
                    _control2 += '<li class="control-item"><div id="' + config.control2[i].id + '"></div></li>';
                }

               _control2 += '</div></ul></div></th></tr>';
            }

            _controls += '</div><div class="group-right"><div id="pageselector"></div></div></ul></ul></div></th></tr>' + _control2 + '</thead></table>';

            var _table = '<div class="table" style="width:100%;height:' + config.height + 'px">' + _controls + '<table id="' + _thisID + '_table" cellspacing="0" border="0" cellpadding="0">';
            var _thead = '<thead>';

            var header = '<tr>';
            if (config.hascheckbox == true) { header += '<th style="width: 30px!important;max-width:30px;padding-left: 25px;"></th><th style="width: 50px!important;" class="tm-checkbox"><input  id="' + _thisID + '_checkall" class="tummo-checkbox check-head" type="checkbox"></th>'; }

            for (var i = 0; i < _headitems.length; i++) {
                let hiden_column = '';
                if (_headitems[i].display == false) {
                    hiden_column = ' style="display:none;"';
                }
                _columnhiden[i] = _headitems[i].display;
                _columntype[i] = _headitems[i].type;
                _columwidth[i] = _headitems[i].width;
                if (_headitems[i].align != null) {
                    _columnalign[i] = _headitems[i].align;
                }
                
                header += '<th ' + hiden_column + ' style="width:' + _headitems[i].width + 'px;text-align:center;">' + _headitems[i].text + '</th>';
            }

            header += '</tr>';
            var _tfoot = '<tfoot><tr><th colspan="' + _lengthcolumn + '"><ul id="' + _thisID + '_pages" class="gird-pages"> </ul></th></tr></tfoot> ';
            _thead += header + '</tr></thead>';
            _table += _thead + '<tbody id="' + _thisID + '_tbody" class="fixed_header"></tbody>' + _tfoot + '</table></div>';

            return _table;
        }

        function setpageControl(total) {
            let _pages = [];
            total = Math.round(total);
            for (let i = 0; i < total; i++) {
                let _p = i + 1;
                _pages.push({ id: i, text: 'Trang ' + _p + '/' + total, value: _p });
            }
            pageselector.reload(null, _pages);
        }
        var _rowperpage = (window.screen.height - 320) / 30;
        var _l = Math.round(_rowperpage);

        function drawbody(rows) {
            let _startpage;
            let _endrow;
            var allrows = [];
            rowindex = rows.length;
            if (config.pagination == true) {               
                if (rows != null) {                    
                    _totalpage = rowindex / _l;
                } else {
                    rows = _currentData;
                }

                let itemperrow = (rowindex / _totalpage);
                let _past = _currentpage - 1;
                _startpage = _past * itemperrow;
                _endrow = _currentpage * itemperrow;

                if (_endrow > rowindex) {
                    _endrow = rowindex - 1;
                }

                if (rowindex < 20) {
                    _startpage = 0;
                    _endrow = rowindex;
                }
            } else {
                _startpage = 0;
                _endrow = rowindex;
            }
            
            if (rowindex > 0) {
                for (var i = _startpage; i < _endrow; i++) {
                    var rowid = rows[i].id;
                    var cell = rows[i].items;
                    allrows[i] = '<tr status="none" id="' + rowid + '">';
                    if (i == 0) {
                        emptyrow = '<tr status="new" id="line_index">';
                    }

                    for (var j = 0; j < cell.length; j++) {
                        let hiden_column = '';
                        if (_columnhiden[j] == false) {
                            hiden_column = ' style="display:none;"';
                        }
                        var _align = _columnalign[j];

                        let _alig = '';
                        if (_align == 'center') {
                            _alig = _centerAlign;
                        }

                        var _thistype = '' + _columntype[j];
                        if ((j == 0)) {
                            allrows[i] += '<td style="width: 30px;max-width:30px;"><div class="grid-count">' + i + '</div></td><td style="width: 50px;"><div id="row_-1" col="-1" row="' + i + '" class="tm-checkbox"><input type="checkbox" style="margin-left: calc(50% - 7px);" name="checkbox" uid="' + rowid + '" class="tummo-checkbox header-check" value="uncheck"></div></td>';
                            if (i == 0) {
                                emptyrow += '<td style="width: 30px;max-width:30px;"><div class="grid-count">' + i + '</div></td><td style="width: 50px;"><div id="row_-1" col="-1" row="' + i + '" class="tm-checkbox"><input type="checkbox" style="margin-left: calc(50% - 7px);" name="checkbox" uid="' + rowid + '" class="tummo-checkbox header-check" value="uncheck"></div></td>';
                            }
                        }
                        if (_thistype == 'hours') {
                            allrows[i] += '<td' + _alig + hiden_column + ' style="width: ' + _columwidth[j] + 'px;"><div id="row_' + i + j + '" class="t-grid-cell-time" col="' + j + '" row="' + i + '"><div class="t-grid-label t-label-full" contenteditable="true" oldvalue="' + cell[j].value + '" hidenid="' + cell[j].hidenid + '" cvalue="' + cell[j].value + '" name="' + cell[j].name + '">' + cell[j].text + '</div></div></td>';
                            if (i == 0) {
                                let today = new Date();
                                let _hrs = converHours(today);

                                emptyrow += '<td><div id="row_index' + j + '" class="t-grid-cell-time" col="' + j + '"><div name="' + cell[j].name + '" class="t-grid-label t-label-full" contenteditable="true" name="' + cell[j].name + '" cvalue="' + _hrs + '">' + _hrs + '</div></div></td>';
                            }
                        } else if (_thistype == 'date') {
                            allrows[i] += '<td' + _alig + hiden_column + ' style="width: ' + _columwidth[j] + 'px;"><div id="row_' + i + j + '" class="t-grid-cell-date" col="' + j + '" row="' + i + '"><div class="t-grid-label t-grid-icon" oldvalue="' + cell[j].value + '" hidenid="' + cell[j].hidenid + '" cvalue="' + cell[j].value + '" name="' + cell[j].name + '">' + cell[j].text + '</div><div class="t-grid-btn icons-calendar"></div></div></td>';
                            if (i == 0) {
                                emptyrow += '<td' + _alig + hiden_column + ' style="width: ' + _columwidth[j] + 'px;"><div id="row_index' + j + '" class="t-grid-cell-date" col="' + j + '" row="' + i + '"><div class="t-grid-label t-grid-icon" oldvalue="' + cell[j].value + '" hidenid="' + cell[j].hidenid + '" cvalue="' + cell[j].value + '" name="' + cell[j].name + '">' + cell[j].text + '</div><div class="t-grid-btn icons-calendar"></div></div></td>';
                            }
                        } else if (_thistype == 'day') {
                            allrows[i] += '<td' + _alig + hiden_column + ' style="width: ' + _columwidth[j] + 'px;"><div id="row_' + i + j + '" class="t-grid-cell-date" col="' + j + '" row="' + i + '"><div class="t-grid-label t-grid-icon" oldvalue="' + cell[j].value + '" hidenid="' + cell[j].hidenid + '" cvalue="' + cell[j].value + '" name="' + cell[j].name + '">' + cell[j].text + '</div><div class="t-grid-btn icons-calendar"></div></div></td>';
                            if (i == 0) {
                                let today = convertDate(new Date());
                                let _cv = today;
                                let _cv2 = today;
                                emptyrow += '<td><div id="row_index' + j + '" class="t-grid-cell-date" col="' + j + '"><div class="t-grid-label t-grid-icon" cvalue="' + _cv2 + '" name="' + cell[j].name + '">' + _cv + '</div><div class="t-grid-btn icons-calendar"></div></div></td>';
                            }
                        } else if (_thistype == 'text') {
                            allrows[i] += '<td' + _alig + hiden_column + ' style="width: ' + _columwidth[j] + 'px;"><div id="row_' + i + j + '" class="t-grid-cell-text" col="' + j + '" row="' + i + '"><div class="t-grid-label t-label-full" oldvalue="' + cell[j].value + '" hidenid="' + cell[j].hidenid + '" cvalue="' + cell[j].value + '" name="' + cell[j].name + '">' + cell[j].text + '</div></div></td>';
                            if (i == 0) {
                                emptyrow += '<td><div id="row_index' + j + '" class="t-grid-cell-text" col="' + j + '"><div class="t-grid-label text-left" name="' + cell[j].name + '"  contenteditable="true"></div></div></td>';
                            }
                        } else if (_thistype == 'email') {
                            allrows[i] += '<td' + _alig + hiden_column + ' style="width: ' + _columwidth[j] + 'px;"><div id="row_' + i + j + '" class="t-grid-cell-date" col="' + j + '" row="' + i + '"><div class="t-grid-label t-grid-icon" oldvalue="' + cell[j].value + '" hidenid="' + cell[j].hidenid + '" cvalue="' + cell[j].value + '" name="' + cell[j].name + '">' + cell[j].text + '</div><div class="t-grid-btn icons-verify"></div></div></td>';
                            if (i == 0) {
                                emptyrow += '<td' + _alig + hiden_column + ' style="width: ' + _columwidth[j] + 'px;"><div id="row_index' + j + '" class="t-grid-cell-date" col="' + j + '" row="' + i + '"><div class="t-grid-label t-grid-icon" oldvalue="' + cell[j].value + '" hidenid="' + cell[j].hidenid + '" cvalue="' + cell[j].value + '" name="' + cell[j].name + '">' + cell[j].text + '</div><div class="t-grid-btn icons-verify"></div></div></td>';
                            }
                        } else if (_thistype == 'tel') {
                            allrows[i] += '<td' + _alig + hiden_column + ' style="width: ' + _columwidth[j] + 'px;"><div id="row_' + i + j + '" class="t-grid-cell-text" col="' + j + '" row="' + i + '"><div class="t-grid-label" oldvalue="' + cell[j].value + '" hidenid="' + cell[j].hidenid + '" cvalue="' + cell[j].value + '" name="' + cell[j].name + '">' + cell[j].text + '</div></div></td>';
                            if (i == 0) {
                                emptyrow += '<td' + _alig + hiden_column + ' style="width: ' + _columwidth[j] + 'px;"><div id="row_index' + j + '" class="t-grid-cell-text" col="' + j + '" row="' + i + '"><div class="t-grid-label" oldvalue="' + cell[j].value + '" hidenid="' + cell[j].hidenid + '" cvalue="' + cell[j].value + '" name="' + cell[j].name + '">' + cell[j].text + '</div></div></td>';
                            }
                        } else if (_thistype == 'checkbox') {
                            allrows[i] += '<td' + _alig + hiden_column + ' style="width: ' + _columwidth[j] + 'px;"><div id="row_' + i + j + '" class="t-grid-cell-text" col="' + j + '" row="' + i + '"><div class="t-grid-label t-label-full" oldvalue="' + cell[j].value + '" hidenid="' + cell[j].hidenid + '" cvalue="' + cell[j].value + '" name="' + cell[j].name + '">' + cell[j].text + '</div></div></td>';
                            if (i == 0) {
                                emptyrow += '<td' + _alig + hiden_column + ' style="width: ' + _columwidth[j] + 'px;"><div id="row_index' + j + '" class="t-grid-cell-text" col="' + j + '" row="' + i + '"><div class="t-grid-label t-label-full" oldvalue="' + cell[j].value + '" hidenid="' + cell[j].hidenid + '" cvalue="' + cell[j].value + '" name="' + cell[j].name + '">' + cell[j].text + '</div></div></td>';
                            }
                        } else if (_thistype == 'listview') {
                            allrows[i] += '<td' + _alig + hiden_column + ' style="width: ' + _columwidth[j] + 'px;padding-left: 5px;"><div id="row_' + i + j + '" class="t-grid-cell-text" col="' + j + '" row="' + i + '"><img class="grid-avatar" src="' + cell[j].value + '"><div class="t-grid-label cell3" hidenid="' + cell[j].hidenid + '" oldvalue="' + cell[j].value + '" cvalue="' + cell[j].value + '" name="' + cell[j].name + '">' + cell[j].text + '</div><div class="t-grid-btn icons-listview"></div></div></div></td>';
                            if (i == 0) {
                                emptyrow += '<td' + _alig + hiden_column + ' style="width: ' + _columwidth[j] + 'px;padding-left: 5px;"><div id="row_index' + j + '" class="t-grid-cell-text" col="' + j + '" ><img class="grid-avatar" src="/icons/banhxe.svg"><div name="' + cell[j].name + '" class="t-grid-label cell3 text-left"></div><div class="t-grid-btn icons-listview"></div></div></div></td>';
                            }
                        } else if (_thistype == 'render') {
                            if (valuerender = config.header[j].render != null) {
                                if (config.header[j].name == cell[j].name) {
                                    var valuerender = config.header[j].render(cell);
                                    allrows[i] += '<td' + _alig + hiden_column + ' style="width: ' + _columwidth[j] + 'px;"><div id="row_' + i + j + '" class="t-grid-cell-text" col="' + j + '" row="' + i + '">' + valuerender + '</div></td>';
                                }
                            }
                        }
                    }
                    // -------------------

                }

                if (i == 0) {
                    emptyrow += '</tr>';
                }
                allrows[i] += '</tr>';
                return allrows.join('');
            }
        }

        var pageselector;
        function drawControls(controls, ispage) {
            for (var i = 0; i < controls.length; i++) {
                var control = controls[i];
                if (control.type == 'button') {
                    $('#' + control.id).tummoButton(control.value);
                } else if (control.type == 'combobox') {
                    $('#' + control.id).tummoCombobox(control.value);
                } else if (control.type == 'searchbox') {
                    $('#' + control.id).tummoSearchbox(control.value);
                } else if (control.type == 'searchboxdrop') {
                    $('#' + control.id).tummoSearchBoxMulti(control.value);
                } else if (control.type == 'dropbutton') {
                    $('#' + control.id).tummoDropButton(control.value);
                }
            }
            if (ispage == true) {
                pageselector = $('#pageselector').tummoCombobox({ onChange: f_pagechange, label: 'Trang', width: 60, labelWidth: 50, url: null });
            }

        }

        this.reload = function reload(url) {
            $(this).find('table tbody').children().remove();
            addnewrow();
            $.ajax({
                url: url,
                async: false,
                success: function (data) {
                    var _convertrow = StringToObject(data);
                    _rootData = _convertrow;
                    _currentData = _convertrow;
                    var _bd = drawbody(_currentData);
                    $('#' + _thisID).find('tbody').html(_bd);
                }
            });
        }

        function addnewrow() {
            rowindex = rowindex + 1;
            var mapObj = {
                row_index: "row_" + rowindex,
                line_index: '' + randomID(),
            };

            var newrow = replaceAll(emptyrow, mapObj, rowindex);
            if (rowindex <= 1) {
                document.getElementById(_thisID + '_tbody').innerHTML = newrow;
            } else {
                document.getElementById(_thisID + '_tbody').insertAdjacentHTML('beforeend', newrow);
            }


        }

        this.addrow = function addrow() {
            addnewrow();
        }

        if (_hascalendar == true) {
            var div = document.createElement('div');
            div.id = _thisID + '_calendar';
            div.attributes = {
                callby: 'row',
                style: 'position:fixed;display: none;'
            }
            calendarid = div.id;
            $(this).append(div);
            var today = new Date();
            clen = $('#' + calendarid).tummogridcalendar({
                width: 250,
                date: new Date(),
                click: f_calendarChange
            });
        }
        if (_haslistview == true) {
            var div = document.createElement('div');
            div.id = _thisID + '_popup';
            div.attributes = {
                callby: "row",
                style: 'position:fixed;display: none;'
            }
            listviewid = div.id;

            $(this).append(div);
            listview = $('#' + listviewid).tummogridpopup({ click: f_listviewClick, url: config.listview, width: 125 });

        }

        var is_calendar = false;
        var is_listview = false;
        function showlistview(offset, id) {
            if (is_listview == false) {
                let callfrom;
                listview.show(callfrom, offset, id);
                is_listview = true;
            } else {
                listview.hide();
                is_listview = false;
            }
        };

        function showcalendar(date, offset, id) {
            if (is_calendar == false) {
                var today = new Date(date);
                clen.showcalendar(offset, id);
                is_calendar = true;
            } else {
                clen.hide();
                is_calendar = false;
            }
        };

        var _shelltable = drawshell(config.header, config.controls);
        $(this).append(_shelltable);
        //var _convertrow = StringToObject(config.rows);
        //var _bd = drawbody(_convertrow);

        if (config.url != '') {
            $.ajax({
                url: config.url,
                async: false,
                success: function (data) {
                    var _convertrow = StringToObject(data);
                    _rootData = _convertrow;
                    _currentData = _convertrow;
                    var _bd = drawbody(_currentData);
                    drawControls(config.controls, true);
                    if (config.control2 !== null) {
                        drawControls(config.control2, false);
                    }
                    $('#' + _thisID).find('tbody').html(_bd);

                }
            });
        }

        // Append Control       



        // EVENT
        // keypress

        $('#' + _thisID + '_table').find('tbody').on('keypress', '.t-grid-label', function (e) {
            if (e.keyCode == 13) {
                event.preventDefault(); // Ngăn ngừa hành vi mặc định của Enter
            }
        });
        // button
        $('#' + _thisID + '_table').find('tbody').on('click', '.t-grid-available-click', function (e) {

            var xid = $(this).parent().attr('id');
            var getcol = $('#' + xid).attr('col');
            var _row = $('#' + xid).attr('row');

            var ele = document.getElementById(xid);

            var text = ele?.querySelector('.t-grid-label')?.textContent;
            var value = ele?.querySelector('.t-grid-label')?.getAttribute('cvalue');
            var x = e.pageX;
            var y = e.pageY;
            var offset = { x: x, y: y };
            var data = [{ id: xid, col: getcol, row: _row, value: value, text: text, offset: offset }];

            if (checkEventExits(getcol) == true) {
                RaiseEventAtCol(getcol, data);

            };
        });


        $('#' + _thisID + '_checkall').on('click', function () {
            if ($(this).is(":checked")) {
                $('#' + _thisID + '_table').find('tbody').find('tr td').find('.tummo-checkbox').prop('checked', true);
            } else {
                $('#' + _thisID + '_table').find('tbody').find('tr td').find('.tummo-checkbox').prop('checked', false);
            }

        });

        function checkEventExits(colnumber) {
            var _exits = false;
            if (config.header[colnumber].click != null) {
                _exits = true;
            }

            return _exits;
        }

        function RaiseEventAtCol(colnumber, data) {
            config.header[colnumber].click(data);
        }

        document.getElementById(_thisID + '_table').addEventListener('click', function (e) {
            let hasclass = e.target.classList;
            let _class = new String(hasclass.value);
            if (_class.includes('icons-calendar') == true) {
                let offset = { x: e.clientX, y: e.clientY };
                let parentID = e.target.parentElement.getAttribute("id");
                let _olddate = document.getElementById(parentID)?.querySelector('.t-grid-label')?.getAttribute('cvalue');
                showcalendar(_olddate, offset, parentID);
            } else if (_class.includes('t-grid-icon-render') == true) {
                let col = e.target.parentElement.getAttribute("col");
                let row = e.target.parentElement.getAttribute("row");
                let cellid = e.target.parentElement.getAttribute("id");
                var datarow = getRow(cellid);
                RaiseEventAtCol(col, datarow);
            } else if (_class.includes('icons-listview') == true) {
                let offset = { x: e.clientX, y: e.clientY };
                let parentID = e.target.parentElement.getAttribute("id");
                showlistview(offset, parentID);
            }
        });

        function f_calendarChange(value, callFrom) {
            $('#' + callFrom).find('.t-grid-label').text(value);
            $('#' + callFrom).find('.t-grid-label').attr('cvalue', value);
            clen.hidecalendar();
        }

        $('#' + _thisID + '_table').find('tbody').on('click', '.tummo-item-checkbox', function (e) {
            if ($(this).is(":checked")) {
                $(this).parent().attr('cvalue', '1');
            } else {
                $(this).parent().attr('cvalue', '0');
            }
            let cellid = $(this).parent().parent().attr('id');
            let col = $(this).parent().parent().attr('col');
            setStatus(cellid, 'changed');
            if (checkEventExits(col) == true) {
                var datarow = getRow(cellid);
                RaiseEventAtCol(col, datarow);
            };
        });

        $('#' + _thisID + '_table').find('tbody').on('click', '.t-grid-label', function (e) {
            var id = $(this).parent().attr('id');
            var getcol = $(this).parent().attr('col');
            var gettype = _columntype[getcol];
            var currenttext = document.getElementById(id).querySelector('.t-grid-label').textContent;
            const cell = document.getElementById(id).getElementsByClassName("t-grid-label");

            if (gettype == "text") {
                cell[0].setAttribute('contenteditable', 'true');
                cell[0].setAttribute('oldvalue', currenttext);
                cell[0].setAttribute('cvalue', currenttext);
            } else if (gettype == "time") {
                cell[0].setAttribute('contenteditable', 'true');
                cell[0].setAttribute('oldvalue', currenttext);
                cell[0].setAttribute('cvalue', currenttext);
            } else if (gettype == "hours") {
                cell[0].setAttribute('contenteditable', 'true');
                cell[0].setAttribute('oldvalue', currenttext);
                cell[0].setAttribute('cvalue', currenttext);

            };
        });
        var _currentrowdata = {};
        var _rowchanged = false;


        document.getElementById(_thisID + '_tbody').addEventListener('focusout', function (e) {
            document.getElementById(_thisID + '_tbody').querySelectorAll('tr').forEach(function (e) {
                try {
                    let _trid = e.getAttribute('id');
                    let _row = getRow(_trid);
                    config.afterEdit(_trid, _row);    
                } catch (error) {
                    
                }

                
            })
        });


        // ROW CHANED EVENT

        this.getRowAtCell = function getRowAtCell(cellID) {
            let js = JSON.stringify(getRow(cellID));
            return js;
        }


        function getRow(rowid) {
            var attrs = [];
            let _scanrow = document.getElementById(rowid);
            _scanrow.querySelectorAll('.t-grid-label').forEach(function (e) {
                var getID = rowid;
                var getName = e.getAttribute('name');
                var getHidenID = e.getAttribute('hidenid');
                var getValue;
                if (getName == 'day') {
                    getValue = e.getAttribute('cvalue');
                } else {
                    getValue = e.getAttribute('cvalue');
                }
                var getText = e.textContent;
                let atrr = { id: getID, hidenid: getHidenID, text: getText, name: getName, value: getValue };
                attrs.push(atrr);
            });

            return attrs;
        }


        this.filter = function filter(key, value) {
            _currentpage = 1;
            let _obj = StringToObject(_rootData);
            let result = [];
            var filteredItems = _obj.filter(function (data) {

                var getRow = data.items.filter(function (items) {
                    if (items.name == key) {
                        if (items.value == value) {
                            result.push(data);
                        }
                    }
                });
                return result;
            });
            var _bd = drawbody(result);
            $('#' + _thisID).find('tbody').html(_bd);
            _currentData = result;
        }

        this.search = function search(key, value, compare) {

            if (_currentData.length == 0) {
                _currentData = StringToObject(_rootData);
            }

            let result = [];
            var filteredItems = _currentData.filter(function (data) {
                var getRow = data.items.filter(function (items) {
                    if (items.name == key) {
                        if (compare == 'startwith') {
                            var _value = new String(items.value);
                            var _low = _value.toLowerCase();

                            if (_low.startsWith(value)) {
                                result.push(data);
                            }
                        } else if (compare == 'endWith') {
                            var _value = items.value.lowerCase();
                            if (_value.endsWith(value)) {
                                result.push(data);
                            }
                        } else if (compare == 'equals') {
                            if (items.value == value) {
                                result.push(data);
                            }
                        }

                    }
                });
                return result;
            });
            var _bd = drawbody(result);
            $('#' + _thisID).find('tbody').html(_bd);

        }

        this.getRow = function getRow(rowid) {
            var attrs = [];
            let _scanrow = document.getElementById(rowid);
            _scanrow.querySelectorAll('.t-grid-label').forEach(function (e) {
                var getID = rowid;
                var getName = e.getAttribute('name');
                var getHidenID = e.getAttribute('hidenid');
                var getValue;
                if (getName == 'day') {
                    getValue = e.getAttribute('cvalue');
                } else {
                    getValue = e.getAttribute('cvalue');
                }
                var getText = e.textContent;
                let atrr = { id: getID, hidenid: getHidenID, text: getText, name: getName, value: getValue };
                attrs.push(atrr);
            });

            return attrs;
        }

        function getControlStatus() {
            var datactrl = [];
            var ctrls = $('#' + _thisID + "_control").children('ul').find('li').each(function () {
                var ctype = $(this).find('div').attr('id');
                if (ctype != undefined) {
                    var vl = $('#' + ctype + '_input').attr('value');
                    var att = { id: ctype, value: vl };
                    datactrl.push(att);
                }
            });
            return datactrl;
        }

        $('#' + _thisID + '_table').find('tbody').on('click', '.tummo-checkbox', function (e) {
            var prid = $(this).parent().parent().parent().attr('id');
            if ($(this).is(':checked')) {
                _rowselect.push(prid);
            } else {
                _rowselect.splice(_rowselect.indexOf(prid), 1);
            }
        });

        this.getTotalPage = function getTotalPage() {
            return _totalpage;
        }

        this.getCurrentRow = function getCurrentRow() {
            return _currentpage;
        }
        this.setCurrentRow = function setCurrentRow() {
            return _currentpage;
        }

        function f_pagechange(page) {
            //pageselector            

            _currentpage = page;

            var _bd = drawbody();

            $('#' + _thisID + '_table').children('tbody').html(_bd);

        }

        this.deleterow = function deleterow(id) {
            $('#' + id).remove();
        }

        this.deleteRows = function deleteRows() {
            var rows = [];
            for (var i = 0; i < _rowselect.length; i++) {
                var _rid = _rowselect[i];
                var _row = getRow(_rid);
                rows.push({ id: _rid, row: _row });
                $('#' + _rowselect[i]).remove();
            }

            return rows;
        }

        this.setDataForControl = function setDataForControl(id, data) {

        }

        this.getRowFromCell = function getRowFromCell(cellid) {
            var attrs = [];
            var parent_idx = $('#' + cellid).parent().parent().attr('id');
            $('#' + parent_idx).children('td').each(function (e) {
                var atrr = {};
                var findlabel = $(this).find('.t-grid-label');
                var txtText = findlabel.text();
                var getName = findlabel.attr('name');
                var getID = findlabel.attr('id');
                var getHidenID = findlabel.attr('hidenid');
                var getValue = findlabel.attr('cvalue');
                if (getName == undefined) { getName = ""; }
                if (getValue == undefined) { getValue = ""; }

                atrr = { id: getID, hidenid: getHidenID, text: txtText, name: getName, value: getValue };
                attrs.push(atrr);
            });

            var vl = attrs;
            return vl;

        }

        this.getRowsSelected = function getRowsSelected () {
            return checkRowSelected();
        };

        function checkRowSelected() {
            var rows = [];
            let i = 0;
            let ele = document.querySelectorAll('#' + _thisID + '_table tbody tr td .header-check');
            _rowselect = [];
            if (ele.length > 0) {
                for (var j = 0; j < ele.length; j++) {
                    if (ele[j].checked == true) {
                        let _rid = ele[j].getAttribute('uid');
                        var _row = getRow(_rid);
                        rows.push({ id: _rid, row: _row });

                    }
                }
            }

            return rows;
        }

        this.setCellValue = function setCellValue(cellid, value) {
            $('#' + cellid).text(value);

            var ele = document.getElementById(cellid).querySelector('.t-grid-label');
            ele.textContent = '1';
            _currentrowdata = getRow(cellid);
            if (config.afterEdit != null) {
                config.afterEdit(getRowID(cellid), _currentrowdata);
            }
        }

        this.getRows = function getRows() {
            var exportrows = [];
            var rows = $('#' + _thisID + '_table').find(' tbody tr');
            var i = 0;
            rows.each(function (index) {
                var vtext, vname, vid, vl, hid;
                var row = [];
                var _rowid = $('#' + index).attr('id');
                for (var j = 0; j <= _columntype.length; j++) {
                    try {
                        var myElement = $('#row_' + i + j).find('.t-grid-label');
                        vtext = myElement.text();
                        vname = myElement.attr('name');
                        vid = myElement.attr('id');
                        vl = myElement.attr('cvalue');
                        hid = myElement.attr('hidenid');
                    } catch (error) {

                    }
                    if (vname != undefined) {
                        if (vid == undefined) { vid = ''; }
                        if (vname == undefined) { vname = ''; }
                        if (vtext == undefined) { vtext = ''; }
                        if (vl == undefined) { vl = ''; }
                        if (hid == undefined) { hid = ''; }

                        var _cell = { id: vid, name: vname, text: vtext, value: vl, hidenid: hid };
                        row.push({ id: _rowid, cell: _cell });
                    }
                }
                exportrows[i] = {
                    id: i,
                    cell: row
                }
                i = i + 1;
            });
            return exportrows;

        };

        function getRowID(cellID) {
            return $('#' + cellID).parent().parent().attr('id');
        }

        function getStatus(cellID) {
            return $('#' + cellID).parent().parent().attr('status');
        }

        function setStatus(cellID, status) {
            $('#' + cellID).parent().parent().attr('status', status);
        }

        function f_last(value, id) {
            var cvertdate = value;
            var ele = document.getElementById(id)?.getElementsByClassName('t-grid-label')[0];
            ele.textContent = cvertdate;
            ele?.setAttribute('cvalue', value);
            clen.hidecalendar();

            var _getrow = getRow(id);
            var _status = getStatus(id);
            var _data = { status: _status, id: getRowID(id), row: _getrow };
            _currentrowdata = _data;
            config.afterEdit(getRowID(id), _currentrowdata);
            if (_status == 'new') {
                setStatus(id, 'changed');
            }
        }

        function f_listviewClick(data) {
            var cellid = data.id;
            $('#' + cellid).find('.t-grid-label').text(data.text);
            $('#' + cellid).find('.grid-avatar').attr('src', data.src);
            $('#' + cellid).find('.t-grid-label').attr('hidenid', data.hidenid);

            var oldvalue = $('#' + cellid).attr('oldvalue');
            var index = $('#' + cellid).attr('id');

            var currenttext = data.text;

            _rowchanged = true;
            var _getrow = getRow(cellid);
            var _status = getStatus(cellid);
            var _data = { status: _status, id: getRowID(cellid), row: _getrow };
            _currentrowdata = _data;
            config.afterEdit(getRowID(cellid), _currentrowdata);
            if (_status == 'new') {
                setStatus(cellid, 'changed');
            }

            listview.hide();
        }


        setpageControl(_totalpage);

        return this;
    };
})(jQuery);