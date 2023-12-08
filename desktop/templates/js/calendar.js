(function ($) {
    $.fn.tummoCalendarReport = function (options) {
        var settings = $.extend({
            data: null,
            width: null,
            onExpand: null,
            onChange: null,
            text: 'Tummo Combobox',
            value: '',
            label: '',
            labelWidth: 0,
            checkbox: false,
            lunarInfo:null,
            plan: null,
            click: null
        }, options);

        var id = $(this).attr('id');
        var config = settings;
        var defaultText;
        var _lblw = settings.labelWidth;
        var _inputWidth = settings.width - 20;
        var _lbl = '';
        var _check = '';
        var currentMonth = -1;
        var currentyear = -1;
        var drawFinish = false;
        var redraw = false;
        var _inputWidth = config.width;
        var _yell = '';
        var _yebtn = '';

        config.lunarInfo = [0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,//1900-1909
0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,//1910-1919
0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,//1920-1929
0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,//1930-1939
0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,//1940-1949
0x06ca0,0x0b550,0x15355,0x04da0,0x0a5b0,0x14573,0x052b0,0x0a9a8,0x0e950,0x06aa0,//1950-1959
0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,//1960-1969
0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b6a0,0x195a6,//1970-1979
0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,//1980-1989
0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,//1990-1999
0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,//2000-2009
0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,//2010-2019
0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,//2020-2029
0x05aa0,0x076a3,0x096d0,0x04afb,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,//2030-2039
0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0,//2040-2049      
0x14b63,0x09370,0x049f8,0x04970,0x064b0,0x168a6,0x0ea50, 0x06b20,0x1a6c4,0x0aae0,//2050-2059
0x0a2e0,0x0d2e3,0x0c960,0x0d557,0x0d4a0,0x0da50,0x05d55,0x056a0,0x0a6d0,0x055d4,//2060-2069
0x052d0,0x0a9b8,0x0a950,0x0b4a0,0x0b6a6,0x0ad50,0x055a0,0x0aba4,0x0a5b0,0x052b0,//2070-2079
0x0b273,0x06930,0x07337,0x06aa0,0x0ad50,0x14b55,0x04b60,0x0a570,0x054e4,0x0d160,//2080-2089
0x0e968,0x0d520,0x0daa0,0x16aa6,0x056d0,0x04ae0,0x0a9d4,0x0a2d0,0x0d150,0x0f252,//2090-2099
0x0d520];

        if (config.style == 'yellow') {
            _yell = 'cbo-yellow';
            _yebtn = 'btn-yellow';
        } else {
            _yell = 'cbo-blue';
            _yebtn = 'btn-blue';
        }

        function lYearDays(y, m, d) {
            let i, sum = 348;
            for (i = 0x8000; i > 0x8; i >>= 1) { sum += (config.lunarInfo[y - 1900] & i) ? 1 : 0; }
            return (sum + leapDays(y));
        }

        function leapMonth(y, m, d) {
            return config.lunarInfo[y - 1900] & 0xf
        }

        function leapDays(y, m, d) {
            return leapMonth(y, m, d) ? ((config.lunarInfo[y - 1900] & 0x10000) ? 30 : 29) : 0
        }

        function monthDays (y, m, d) {
return (config.lunarInfo[y-1900] & (0x10000>>m))? 30: 29
}

        function lYearDays(y, m, d) {
            let i, sum = 348;
            for (i = 0x8000; i > 0x8; i >>= 1) { sum += (config.lunarInfo[y - 1900] & i) ? 1 : 0; }
            return (sum + leapDays(y));
        }
        function getLunars(y, m, d) {
            let date = new Date(y, m - 1, d), i, leap = 0, temp = 0
            let offset = (Date.UTC(y, m - 1, d) - Date.UTC(1900, 0, 31)) / 86400000
            for (i = 1900; i < 2101 && offset > 0; i++) {
                temp = lYearDays(i);
                offset -= temp;
            }
            if (offset < 0) {
                offset += temp
                i--
            }
            // 获取闰月
            let year = i
            leap = leapMonth(i)
            let isLeap = false
            // 校验闰月
            for (i = 1; i < 13 && offset > 0; i++) {
                if (leap > 0 && i == leap + 1 && !isLeap) {
                    --i
                    isLeap = true
                    temp = leapDays(year) // 闰月天数
                } else {
                    temp = monthDays(year, i) // 普通月天数
                }
                if (isLeap && i == leap + 1) isLeap = false
                offset -= temp
            }
            if (offset == 0 && leap > 0 && i == leap + 1) {
                if (isLeap) {
                    isLeap = false
                } else {
                    isLeap = true
                    --i
                }
            }
            if (offset < 0) {
                offset += temp
                --i
            }
            // 农历月
            let month = isLeap ? "0" + i : i
            // 农历日
            let day = ++offset
            return year + '-' + month + '-' + day
        }

        function checkRange(day) {
            let isInRange = -1;
            for (let i = 0; i < _plan.length; i++) {
                let item = _plan[i];
                let _d = new Date(day);
                let _s = new Date(item.start);
                let _e = new Date(item.end);

                if (_d.getDate() == _s.getDate()) {
                    isInRange = 0;
                    break; // Nếu tìm thấy một mục trong phạm vi, thoát vòng lặp
                } else if ((_d.getDate() > _s.getDate()) && (_d.getDate() < _e.getDate())) {
                    isInRange = 1;
                    break; // Nếu tìm thấy một mục trong phạm vi, thoát vòng lặp                    
                } else if (_d.getDate() == _e.getDate()) {
                    isInRange = 2;
                    break; // Nếu tìm thấy một mục trong phạm vi, thoát vòng lặp
                }

            }
            return isInRange;
        }

        var drawbox = '<div id="' + id + '_draw"></div>';
        function NewCalendar(date) {

            drawFinish = true;
            var today = new Date();


            if (date == null) {
                date = new Date();
            } else {
                if (date instanceof Date) {
                    today = new Date(date);
                }
            }

            var year = today.getFullYear();
            var month = today.getMonth() + 1;

            if (currentMonth = -1) { currentMonth = parseInt(month); }
            if (currentyear = -1) { currentyear = parseInt(year); }

            var day = today.getDate();
            var startDay = new Date(year, month - 1, 1);
            var endDay = new Date(year, month, 0);

            var column = startDay.getDay();
            var column_end = parseInt(endDay.getDate());

            let _lunar = getLunars(year, month, day);
            let _arrLunar = _lunar.split('-');
            let _cv = convertBuddhistCalendar(_arrLunar[0], _arrLunar[1], _arrLunar[2]);
            var title = "Ngày " + day + " tháng " + month + " năm " + year + " (Phật lịch: " + _cv + ")";

            var _wc = settings.width - 15;
            if (redraw == false) {
                var vl = year + "-" + month + "-" + day;
                $('#' + id + '_input').val(vl);
                var drawcalendar = '<div style="width:100%;z-index:114;" class="tummo-calendar"><div class="calendar-header"><div id="' + id + '_last" class="tm-last-month"></div><div id="' + id + '_title" class="tm-title">' + title + '</div><div id="' + id + '_next"  class="tm-next-month"></div></div><div class="tm-calendar-body"><ul class="tm-week"><li>T.Hai</li><li>T.Ba</li><li>T.Tư</li><li>T.Năm</li><li>T.Sáu</li><li>T.Bảy</li><li>C.Nhật</li></ul><ul id="' + id + '_days" class="tm-days">';
            }
            var days = '';
            var countday = 1;

            if (column == 0) {
                column = 7;
            } else if (column == 7) {
                column = 0;
            }
            var _plantcount = 1;
            var length = column_end + column + 1;
            if (redraw == false) {
                var _endline = 0;
                for (var j = 1; j <= length; j++) {
                    var _d = year + '-' + month + '-' + countday;
                    if ((j >= column) && (countday <= column_end)) {
                        let _range = checkRange(_d);
                        let _padding = '';
                        let _paddingend = '';
                        if ((countday >= 10) && (countday <= 20)) {
                            _padding = 'right: 22px;';
                            _paddingend = 'right: 14px;';
                        } else if ((countday >= 21) && (countday <= 31)) {
                            _padding = 'left: 27px;width: 100%;z-index:111;';
                            _paddingend = 'right: 16px;';
                        }
                        let rs = getLunars(year, month, countday);   
                        let lunnar = convertLunarDay(rs);           

                        if (_range == 0) {
                            days += '<li id="plan_' + _plantcount + '" col="' + _endline + '" class="tm-day" day="' + _d + '"><span class="selectsart" style="' + _padding + ';z-index:11;"></span><span class="day-abosute" style="z-index:145;">' + countday + '</span> <span class="tm-lunar-day">' + lunnar +'</span><span class="lunar-holiday">Ngày Bát Quan Trai</span></li>';
                        } else if (_range == 1) {
                            let _w = '';
                            if ((_endline == 6)) {
                                _w = '150%;';
                            } else if ((_endline == 0)) {
                                _w = '100%;left:0px;';
                            } else {
                                _w = '100%;';
                            }
                            days += '<li class="tm-day" day="' + _d + '"><span class="selectitem" style="width:' + _w + ';z-index:11;"></span><span class="day-abosute" style="z-index:145;">' + countday + '</span> <span class="tm-lunar-day">' + lunnar +'</span></li>';
                        } else if (_range == 2) {
                            days += '<li class="tm-day" day="' + _d + '"><span class="selectend" style="' + _paddingend + ';z-index:11;"></span><span class="day-abosute" style="z-index:145;">' + countday + '</span> <span class="tm-lunar-day">' + lunnar +'</span></li>';
                            _plantcount = _plantcount + 1;
                        } else {
                              
                            days += '<li class="tm-day" day="' + _d + '"><span class="day-abosute" style="z-index:145;">' + countday + '</span><span class="tm-lunar-day">' + lunnar +'</span></li>';

                        }


                        countday = countday + 1;
                    } else {
                        days += '<li class="tm-day"></li>';
                    }
                    _endline = _endline + 1;
                    if (_endline == 7) {
                        _endline = 0;
                    }

                }

            } else {
                var j = 1;
                countday = 1;
                $('#' + id + '_days li').each(function () {
                    $(this).removeClass('day-selected');
                    if ((j >= column) && (countday <= column_end)) {
                        var d = year + '-' + month + '-' + countday;

                        var v1 = $('#' + id + '_input').val();
                        var d1 = v1.split(',');
                        if (d == d1[0]) {
                            $(this).addClass('day-selected');
                        } else if (d == d1[1]) {
                            $(this).addClass('day-selected');
                        }

                        $(this).text(countday);
                        $(this).attr('day', d);
                        countday = countday + 1;
                    } else {
                        $(this).text('');
                        $(this).attr('day', '');
                    }
                    j = j + 1;
                });
            }

            if (redraw == false) {
                drawcalendar += days;
                drawcalendar += '</ul></div></div>';
                $('#' + id + '_draw').html(drawcalendar);

                redraw = true;
            } else {
                $('#' + id + '_title').html(title);
            }
            drawFinish = false;
            // Drawbox

        }

        var html = drawbox + '</div>';
        $(this).html(html);

        var today = new Date();
        NewCalendar(today);

        for (var i = 0; i < config.plan.length; i++) {
            let _nex = i + 1;
            let _planid = 'plan_' + _nex;
            let _ele = document.getElementById(_planid);
            let _elepositionx = _ele.offsetLeft + _ele.offsetWidth - 10;
            let _elepositiony = _ele.offsetTop + _ele.offsetHeight - 10;
            let _col = _ele.getAttribute('col');
            let _newele = document.createElement('div');
            _newele.classList.add('event-content');
            _newele.style.position = 'fixed';
            if (_col < 5) {
                _newele.innerHTML = ''; //config.plan[i].text;
                // _elepositionx = (_elepositionx * _col) + 85;
                _newele.style.left = _elepositionx + 'px';
                _newele.style.top = _elepositiony + 'px';
            } else if (_col >= 5) {
                _newele.innerHTML = ''; // config.plan[i].text;
                _elepositionx = _elepositionx - 100;
                _newele.style.left = _elepositionx + 'px';
                _newele.style.top = _elepositiony + 'px';
            }


            _newele.setAttribute('id', 'tooltip_' + _nex);
            document.getElementById(id + '_days').appendChild(_newele);
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

        }
        // --------------------
        const dates = ['', ''];
        var day1 = '';

        var itemdays = document.getElementById(id + '_days');
        itemdays.onclick = function (e) {
            var item = e.target.getAttribute('day');
            var target = e.target;
            var className = e.target.className;
            if (target.classList.contains('day-selected')) {
                target.classList.remove('day-selected');
                if (dates[0] = item) {
                    dates[0] = '';
                } else if (dates[1] = item) {
                    dates[1] = '';
                }
            } else {
                target.classList.add('day-selected');
                if (day1 == '') {
                    dates[0] = item;
                    day1 = item;
                    document.getElementById(id + '_input').value = item;
                } else {
                    dates[1] = item;
                    dates.sort((a, b) => new Date(a) - new Date(b));
                    document.getElementById(id + '_input').value = dates;

                    removeMultipeSelected();
                }


            }


        }


        $('#' + id + '_last').on('click', function () {

            currentMonth = currentMonth - 1;
            if (currentMonth == 0) {
                currentMonth = 12;
                currentyear = currentyear - 1;
            }

            var d = currentyear + '/' + currentMonth + '/25';
            var lastday = new Date(d);
            NewCalendar(lastday);
        });

        $('#' + id + '_next').on('click', function () {
            nextMonth();
        });

        function nextMonth() {
            currentMonth = currentMonth + 1;
            if (currentMonth == 12) {
                currentMonth = 1;
                currentyear = currentyear + 1;
            }

            var d = currentyear + '/' + currentMonth + '/25';
            var lastday = new Date(d);

            NewCalendar(lastday);
        }

        this.getValue = function getValue() {
            var bl = $('#' + id + '_input').val();
            return bl;
        }

        function removeMultipeSelected() {
            $('.day-selected').each(function () {
                $(this).removeClass('day-selected');
                var d1 = $(this).attr('day');
                if ((d1 == dates[0]) || (d1 == dates[1])) {
                    $(this).addClass('day-selected');
                }
            });
        }


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