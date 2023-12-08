(function ($) {
    $.fn.tummoboxgridcontrol = function (options) {
        var settings = $.extend({
            id: null,
            data: null,
            width: null,
            onExpand: null,
            onChange: null,
            text: 'Tummo Combobox',
            value: '',
            label: '',
            labelWidth: 80,
            checkbox: false,
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
        var _check = '';

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

        var _l = $('#' + id).offset().left;
        var _t = $(this).offset().top + 27;
        var _w = $('#' + id + '_input').width();

        var item = '<ul id="' + id + '_item" style="position:fixed;width:' + _w + 'px;left:' + _l + 'px;top:' + _t + 'px;" class="grid-combobox-item-box">';

        drawbox += '<div class="grid-combobox-input"><input id="' + id + '_input" value="' + defaultText + '" class="grid-combobox" type="text" placeholder="' + settings.text + '"><div id="' + id + '_btn" class="grid-combobox-expand"></div></div>';

        if (settings.url != null) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                // Check if fetch request is done
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var jsonData = JSON.parse(xhr.responseText);
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
            var vl = $(this).attr('value');

            $('#' + id + '_input').val(text);
            $('#' + id + '_input').attr('value', vl);
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
    $.fn.tummoDataGrid = function (options) {
        var settings = $.extend({
            width: 450,
            height: 250,
            hascheckbox: false,
            onChange: null,
            afterEdit: function () { },
            controls: null,
            calendar: false,
            listview: null,
            header: null,
            rows: null,
        })(options);

        var config = settings[0];
        var _thisID = $(this).attr('id');
        var _columntype = [];
        var _hascalendar = config.calendar;
        var _haslistview = false;
        var clen = null;
        var listviewid = '';
        var emptyrow = '';
        var rowindex = 0;
        var _rowselect = [];
        var calendarid;

        if (config.listview !== null) {
            _haslistview = true;
        }

        function drawcombobox(vid, vitems) {            
            $('#' + vid).tummoboxgridcontrol(vitems);
        }
               
        function drawshell(vheader, vcontrols) {
            var _headitems = vheader;
            var _controlitems = vcontrols;
            var _lengthcolumn = _headitems.length + 2;

            var _table = '<div class="table"><table id="' + _thisID + '_table" cellspacing="0" border="0" cellpadding="0">';
            var _thead = '<thead><tr style="height: 35px;">';
            var _controls = '';
            // if (controlitems.length > 0) {
            _controls = ' <th colspan="' + _lengthcolumn + '">';
            _controls += '<div id="' + _thisID + '_control" class="grid-controls-wrapper"><ul class="grid-controls">';
            for (var i = 0; i < _controlitems.length; i++) {               
                    var cbosetting = _controlitems[i];
                    _controls += '<li class="control-item"><div id="' + cbosetting.id + '"></div></li>';
               
            }
            //}  // -------------------------- 

            _controls += '</ul></div></th></tr>';
            var header = '<tr>';
            if (config.hascheckbox == true) { header += '<th class="tm-checkbox"><input id="' + _thisID + '_check" class="tummo-checkbox check-head" type="checkbox"></th>'; }
            for (var i = 0; i < _headitems.length; i++) {
                _columntype[i] = _headitems[i].ctype;
                header += '<th width="' + _headitems[i].width + '" align="' + _headitems[i].align + '">' + _headitems[i].text + '</th>';
            }

            header += '</tr>';
            var _tfoot = '<tfoot><tr><th colspan="' + _lengthcolumn + '"><ul id="' + _thisID + '_pages" class="gird-pages"> </ul></th></tr></tfoot> ';
            _thead += _controls + header + '</tr></thead>';
            _table += _thead + '<tbody></tbody>' + _tfoot + '</table></div>';

            return _table;
        }

        function drawbody(rows) {
            var allrows = [];
            rowindex = rows.length;
                        
            if (rowindex > 0) {
                for (var i = 0; i < rowindex; i++) {
                    var rowid = rows[i].id;
                    var cell = rows[i].items;
                    allrows[i] = '<tr status="changed" id="' + rowid + '">';
                    if (i == 0) {
                        emptyrow = '<tr status="new" id="index">';
                    }
                    
                    for (var j = 0; j < cell.length; j++) {
                        var _thistype = '' + cell[j].ctype;
                        if ((config.hascheckbox == true) && (j == 0)) {
                            allrows[i] += '<td><div id="row_-1" col="-1" class="tm-checkbox"><input type="checkbox" name="checkbox" class="tummo-checkbox" value="uncheck"></div></td>';
                            if (i == 0) {
                                emptyrow += '<td><div id="row_-1" col="-1" class="tm-checkbox"><input type="checkbox" name="checkbox" value="uncheck" class="tummo-checkbox"></div></td>';
                            }
                        }
                        if (_thistype == 'hours') {
                            allrows[i] += '<td><div id="row_' + i + j + '" class="t-grid-cell-time" col="' + j + '"><div class="t-grid-label text-center" oldvalue="' + cell[j].value + '" hidenid="' + cell[j].hidenid + '" value="' + cell[j].value + '" name="' + cell[j].name + '">' + cell[j].text + '</div></div></td>';
                            if (i == 0) {
                                emptyrow += '<td><div id="row_index' + j + '" class="t-grid-cell-time" col="' + j + '"><div name="' + cell[j].name + '" class="t-grid-label text-center" contenteditable="true" name="' + cell[j].name + '"></div></div></td>';
                            }
                        } else if (_thistype == 'day') {                            
                            allrows[i] += '<td><div id="row_' + i + j + '" class="t-grid-cell-date" col="' + j + '"><div class="t-grid-label t-grid-icon" oldvalue="' + cell[j].value + '" hidenid="' + cell[j].hidenid + '" value="' + cell[j].value + '" name="' + cell[j].name + '">' + cell[j].text + '</div><div class="t-grid-btn icons-calendar"></div></div></td>';
                            if (i == 0) {
                                emptyrow += '<td><div id="row_index' + j + '" class="t-grid-cell-date" col="' + j + '"><div class="t-grid-label t-grid-icon" name="' + cell[j].name + '"></div><div class="t-grid-btn icons-calendar"></div></div></td>';

                            }
                        } else if (_thistype == 'text') {
                            allrows[i] += '<td><div id="row_' + i + j + '" class="t-grid-cell-text" col="' + j + '"><div class="t-grid-label text-left" oldvalue="' + cell[j].value + '" hidenid="' + cell[j].hidenid + '" name="' + cell[j].name + '">' + cell[j].text + '</div></div></td>';
                            if (i == 0) {
                                emptyrow += '<td><div id="row_index' + j + '" class="t-grid-cell-text" col="' + j + '" contenteditable="true"><div class="t-grid-label text-left" name="' + cell[j].name + '"></div></div></td>';
                            }
                        } else if (_thistype == 'listview') {
                            allrows[i] += '<td><div id="row_' + i + j + '" class="t-grid-cell-text" col="' + j + '"><img class="grid-avatar" src="' + cell[j].value + '"><div class="t-grid-label cell3 text-left" hidenid="' + cell[j].hidenid + '" oldvalue="' + cell[j].value + '" value="' + cell[j].value + '" name="' + cell[j].name + '">' + cell[j].text + '</div><div class="t-grid-btn icons-menu"></div></div></div></td>';
                            if (i == 0) {
                                emptyrow += '<td><div id="row_index' + j + '" class="t-grid-cell-text" col="' + j + '" ><img class="grid-avatar" src="/icons/banhxe.svg"><div name="' + cell[j].name + '" class="t-grid-label cell3 text-left"></div><div class="t-grid-btn icons-menu"></div></div></div></td>';
                            }
                        }
                    }
                    // -------------------

                }
                allrows[i] += '</tr>';
                if (i == 0) {
                    emptyrow += '</tr>';
                }
                drawControls(config.controls);
                return allrows.join('');
            }
        }

        function drawControls(controls) {
            for (var i = 0; i < controls.length; i++) {
                var control = controls[i];
                if (control.type == 'button') {
                    $('#' + control.id).tummoButton(control.value); 
                } else if (control.type == 'combobox') {
                    $('#' + control.id).tummoCombobox(control.value);
                }    
            }
            
        }

        this.reload = function reload(data) {
            var _convertrow = StringToObject(data);

            var _bd = drawbody(_convertrow);
            $(this).find('table tbody').children().remove();
            $(this).find('table tbody').html(_bd);
        }
      
        this.addrow = function addrow() {
            rowindex = rowindex + 1;
            var mapObj = {
                row_index: "row_" + rowindex,
                index: '' + randomID()
            };

            var newrow = replaceAll(emptyrow, mapObj, rowindex);
            $(this).find('tbody').append(newrow);
        }

        if (_hascalendar == true) {
            var div = document.createElement('div');
            div.id = _thisID + '_calendar';
            div.attributes = {
                callby: "row",
                style: 'position:fixed;display: none;'
            }
            calendarid = div.id;
            $(this).append(div);            
            var today = new Date();
            clen = $('#' + calendarid).tummogridcalendar({
                width: 250,
                date: new Date(),
                click: f_last
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
            listview = $('#' + listviewid).tummogridpopup({ click: f_listviewClick, rows: config.listview, width: 125 });

        }

        var is_calendar = false;
        var is_popup = false;
        function showcalendar(date, offset, id) {
            var today = new Date(date);            
            clen.showcalendar(offset, id);
        };

        var _shelltable = drawshell(config.header, config.controls);
        $(this).append(_shelltable);
        var _convertrow = StringToObject(config.rows);
        var _bd = drawbody(_convertrow);
        $(this).find('table tbody').append(_bd);

        
        // Append Control       

        // EVENT
        // keypress
        
        $('#' + _thisID + '_table').find('tbody').on('keypress', '.t-grid-label', function (e) {
            if (e.keyCode == 13) {
                event.preventDefault(); // Ngăn ngừa hành vi mặc định của Enter
            }
        });
        // button
        $('#' + _thisID + '_table').find('tbody').on('click', '.t-grid-btn', function (e) {
            var xid = $(this).parent().attr('id');
            var getcol = $('#' + xid).attr('col');
            var gettype = _columntype[getcol];
            var x = e.pageX;
            var y = e.pageY;
            
            var w = $('#' + xid).width();
            
           // var x = e.pageX;
            //var y = e.pageY;
            var offset = { x: x, y: y };
            
            var val = $('#' + xid).find('.t-grid-label').attr('value');
            
            if (gettype == "date") {
                if (is_calendar == false) {                    
                    showcalendar(val, offset, xid);
                    is_calendar = true;
                } else {
                    clen.hidecalendar();
                    is_calendar = false;
                }
            } else if (gettype == "listview") {
                if (is_popup == false) {
                    listview.width(w);
                    listview.show(val, offset, xid);
                    is_popup = true;
                } else {
                    listview.hide();
                    is_popup = false;
                }

            }
        });
      

        $('#' + _thisID + '_table').find('tbody').on('click', '.t-grid-label', function (e) {
            var id = $(this).parent().attr('id');
            var getcol = $(this).parent().attr('col');
            var gettype = _columntype[getcol];
            var currenttext = $(this).text;                        
            const cell = document.getElementById(id).getElementsByClassName("t-grid-label");
            if (gettype == "text") {
                cell[0].setAttribute('contenteditable', 'true');
                cell[0].setAttribute('oldvalue', currenttext);                
            } else if (gettype == "time") {
                cell[0].setAttribute('contenteditable', 'true');
                cell[0].setAttribute('oldvalue', currenttext);
                
            };           
        });
        var _currentrowdata = {};
        var _rowchanged = false;
        $('#' + _thisID + '_table').find('tbody').on('focusout', '.t-grid-label', function (e) {
            var oldvalue = $(this).attr('oldvalue');
            var index = $(this).parent().attr('id');

            var currenttext = $(this).text;
            if (oldvalue != currenttext) {
                _rowchanged = true;
                var _getrow = rowToJson(index);
                var ctr = getControlStatus();   
                var _status = getStatus(index);             
                var _data = {};
                if (_status == 'new') {
                    var _getControl = getControlStatus();
                    _data = {controls:_getControl, status: _status, id: getRowID(index), row: _getrow };
                    setStatus(index, 'changed');
                } else {
                    _data = {status: _status, id: getRowID(index), row: _getrow };                
                }
                _currentrowdata = JSON.stringify(_data);
                config.afterEdit(index, _currentrowdata);
                _rowchanged = false;
               
            }

        });
        // ROW CHANED EVENT
        function rowToJson(cellid) {
            var attrs = [];            
            var parent_idx = $('#' + cellid).parent().parent().attr('id');
            $('#' + parent_idx).children('td').each(function (e) {
                var atrr = {};
                var findlabel = $(this).find('.t-grid-label');
                var getText = findlabel.text;
                var getName = findlabel.attr('name');
                var getID = findlabel.attr('id');
                var getHidenID = findlabel.attr('hidenid');
                var getValue = findlabel.attr('value');
                if (getName == undefined) { getName = ""; }
                if (getValue == undefined) { getValue = ""; }

                atrr = {id:getID,hidenid:getHidenID, text: getText, name: getName, value: getValue };
                attrs.push(atrr);
            });

            var vl = attrs;
            return vl;
        }

        function getRow(rowid) {
            var attrs = [];           
            $('#' + rowid).children('td').each(function (e) {
                var atrr = {};
                var findlabel = $(this).find('.t-grid-label');
                var getText = findlabel.text;
                var getName = findlabel.attr('name');
                var getID = findlabel.attr('id');
                var getHidenID = findlabel.attr('hidenid');
                var getValue = findlabel.attr('value');
                if (getName == undefined) { getName = ""; }
                if (getValue == undefined) { getValue = ""; }

                atrr = {id:getID,hidenid:getHidenID, text: getText, name: getName, value: getValue };
                attrs.push(atrr);
            });

            var vl = attrs;
            return vl;
        }


        function getControlStatus() {
            var datactrl = [];
            var ctrls = $('#' + _thisID + "_control").children('ul').find('li').each(function () { 
                var ctype =  $(this).find('div').attr('id');               
                if (ctype != undefined) {                    
                    var vl = $('#' + ctype + '_input').attr('value');                    
                    var att = {id: ctype, value:vl};
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

        this.deleteRows = function deleteRows() {    
            var rows = [];        
            for (var i = 0; i < _rowselect.length; i++) {
                var _rid = _rowselect[i];
                var _row = getRow(_rid);
                rows.push({id:_rid, row: _row});
                $('#' + _rowselect[i]).remove();
            }
            return rows;
        }

        this.getRowsSelected = function () {
            var rows = {};
            for (var i = 0; i < _rowselect.length; i++) {
                var _row = getRow(_rowselect[i]);
                rows[i] = {row: _row};
            }
            
            return rows;
        };

        this.rowChange = function rowChange(value) {

        }

        this.getRows = function getRows() {
            var exportrows = [];
            var rows = $('#' + _thisID + '_table').find(' tbody tr');
            var i = 0;
            rows.each(function (index) {
                var vtext,vname,vid,vl,hid;
                var row = [];
                var _rowid = $('#' + index).attr('id');
                for (var j = 0; j <= _columntype.length; j++) {
                    try {
                        var myElement = $('#row_' + i + j).find('.t-grid-label');
                        vtext = myElement.text();
                        vname = myElement.attr('name');
                        vid = myElement.attr('id');
                        vl = myElement.attr('value');
                        hid = myElement.attr('hidenid');
                    } catch (error) {

                    }
                    if (vname != undefined) {
                        if (vid == undefined) { vid = ''; }
                        if (vname == undefined) { vname = ''; }
                        if (vtext == undefined) { vtext = ''; }
                        if (vl == undefined) { vl = ''; }
                        if (hid == undefined) { hid = ''; }

                        var _cell = {id:vid, name: vname, text: vtext, value:vl, hidenid:hid };
                        row.push({id:_rowid,cell:_cell});
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
            var cvertdate = convertDate(value);                        
            var ele = document.getElementById(id)?.getElementsByClassName('t-grid-label')[0];
            ele.textContent = cvertdate;            
            var vdt2 = convertDate2(value);
            ele?.setAttribute('value', vdt2);            
            clen.hidecalendar();

            var _getrow = rowToJson(id);
            var _status = getStatus(id);
            var _data = { status: _status, id: getRowID(id), row: _getrow };
            _currentrowdata = JSON.stringify(_data);
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
            if (oldvalue != currenttext) {
                _rowchanged = true;
                var _getrow = rowToJson(cellid);
                var _status = getStatus(cellid);                
                var _data = { status: _status, id: getRowID(cellid), row: _getrow };
                _currentrowdata = JSON.stringify(_data);
                config.afterEdit(getRowID(cellid), _currentrowdata);
                if (_status == 'new') {
                    setStatus(cellid, 'changed');
                }
                
            }

            listview.hide();
        }
        return this;
    };
})(jQuery);