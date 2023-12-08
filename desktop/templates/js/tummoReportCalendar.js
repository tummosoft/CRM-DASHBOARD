(function ($) {
    $.fn.tummoReportCalendar = function (options) {
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
        
        if (config.style == 'yellow') {
            _yell = 'cbo-yellow';
            _yebtn = 'btn-yellow';
        } else {
            _yell = 'cbo-blue';
            _yebtn = 'btn-blue';
        }

        var _plan = config.plan;

        function checkRange(day) {
            let isInRange = -1;
            for (let i = 0; i < _plan.length; i++) {
                let item = _plan[i];
                let _d = new Date(day);
                let _s = new Date(item.start);
                let _e = new Date(item.theend);

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

        var drawbox = '<div id="' + id + '_draw" style="margin-top:7px;"></div>';
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
                var drawcalendar = '<div style="width:' + _wc + 'px;z-index:114;position:fixed;" class="tummo-calendar"><div class="calendar-header"><div id="' + id + '_last" class="tm-last-month"></div><div id="' + id + '_title" class="tm-title">' + title + '</div><div id="' + id + '_next"  class="tm-next-month"></div></div><div class="tm-calendar-body"><ul class="tm-week"><li>T.Hai</li><li>T.Ba</li><li>T.Tư</li><li>T.Năm</li><li>T.Sáu</li><li>T.Bảy</li><li>C.Nhật</li></ul><ul id="' + id + '_days" class="tm-days">';
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
                            _padding = 'right: 8px;';
                            _paddingend = 'right: 45px;';
                        } else if ((countday >= 21) && (countday <= 31)) {
                            _padding = 'z-index:111;';
                            _paddingend = 'right: 5px;';
                            
                        }
                         
                        let lunnar = convertLunarDay(year, month, countday);           
                        
                        if (_range == 0) {                            
                            let _w1 = '';
                            if (_endline == 6) {_w1 = '--after-width:150px;';}
                            days += '<li col="' + _endline + '" class="tm-day" data-tooltip="' + settings.plan[_plantcount - 1].text + '" day="' + _d + '"><span plan="plan_' + _plantcount + '" class="selectsart" style="' + _padding + ';z-index:1;' + _w1 +'"></span><span class="day-abosute" style="z-index:145;">' + countday + '</span> <span class="tm-lunar-day">' + lunnar +'</span></li>';
                        } else if (_range == 1) {
                            let _w = '0px;';
                            let _c = '';
                            if ((_endline == 6)) {
                                _w = '200px;';
                            } else if ((_endline == 0)) {
                                _w = '60px';                            
                                _c = 'tuychinh';
                            } else {
                                _w = '100%;';
                            }
                            days += '<li class="tm-day" day="' + _d + '"><span plan="plan_' + _plantcount + '" class="selectitem '+ _c +'" style="width:' + _w + ';"></span><span class="day-abosute" style="z-index:145;">' + countday + '</span> <span class="tm-lunar-day">' + lunnar +'</span></li>';
                        } else if (_range == 2) {
                            let _ct = '';
                            if (_endline == 0) {
                                _ct = 'tuychinh';
                            }
                            days += '<li class="tm-day" day="' + _d + '"><span plan="plan_' + _plantcount + '" class="selectend '+ _ct +'" style="' + _paddingend + ';"></span><span class="day-abosute" style="z-index:145;">' + countday + '</span> <span class="tm-lunar-day">' + lunnar +'</span></li>';
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

        let _tooltip = document.createElement('div');
        _tooltip.className = 'tooltip';
        _tooltip.setAttribute('id', 'calendar-tooltip');
        $(this).append(_tooltip);

        const elementsToChange = document.querySelectorAll('li span[plan]');
        
// Lặp qua từng phần tử và thêm sự kiện hover
elementsToChange.forEach(element => {
    const plan = element.getAttribute('plan');
    
    // Thêm sự kiện hover
    element.addEventListener('mouseenter', (event) => {
        // Thêm lớp hovered khi hover vào phần tử
        elementsToChange.forEach(el => {                
            if (el.getAttribute('plan') === plan) {
                el.classList.add('hovered');   
                let _plan = el.getAttribute('plan');
                let _index = _plan.split('_')[1];
                _index = parseInt(_index) - 1;
                let _content = config.plan[_index].text;
                document.getElementById('calendar-tooltip').innerHTML = _content;
                document.getElementById('calendar-tooltip').style.display = 'block';
                document.getElementById('calendar-tooltip').style.top = event.target.getBoundingClientRect().top + 30 + 'px';
                document.getElementById('calendar-tooltip').style.left = event.target.getBoundingClientRect().left + 'px';
            }
        });
    });

    // Xóa lớp hovered khi không hover nữa
    element.addEventListener('mouseleave', () => {
        elementsToChange.forEach(el => {
            if (el.getAttribute('plan') === plan) {
                document.getElementById('calendar-tooltip').style.display = 'none';
                el.classList.remove('hovered');
            }
        });
    });
});

        return this;
    }
})(jQuery);