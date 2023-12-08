(function ($) {
    $.fn.tummogridcalendar = function (options) {
        var settings = $.extend({
            width: 250,
            height: 250,
            date: '2023-08-24',
            click: null,
            multipleSelect:false,
        })(options);

        var redraw = false;
        var currentMonth = -1;
        var currentyear = -1;
        var calendarshow = false;
        
        var calendarid = $(this).attr('id');
        var config = settings[0]
        var _wc = config.width;
        var _displayid = '';
        
        if (_wc < 250) {
            _wc = 250;
        }

        if (redraw == false) {
            var calendar = '<div class="calendar-header"><div id="' + calendarid + '_prev" class="tm-last-month"></div><div id="' + calendarid + '_title" class="tm-title"></div><div id="' + calendarid + '_next"  class="tm-next-month"></div></div><div class="tm-calendar-body"><ul class="tm-week"><li>T.Hai</li><li>T.Ba</li><li>T.Tư</li><li>T.Năm</li><li>T.Sáu</li><li>T.Bảy</li><li>C.Nhật</li></ul>';

            var bd = '<ul id="' + calendarid + '_days" class="tm-days"></ul>';
            $(this).addClass('tummo-calendar');
            $(this).css('width', _wc);
            $(this).css('z-index', 114);
            $(this).css('display', 'fixed');
            $(this).hide();
            $(this).append(calendar + bd);
            $(this).append('</div');

            drawitem(config.date);

            redraw = true;
      }
      
            
        function ExtractDate(date) {
            var result = [];
            var today = new Date(date);                    
            result[0] = parseInt(today.getFullYear());
            result[1] = parseInt(today.getMonth()) + 1;
            result[2] = parseInt(today.getDate());

            return result;
        }
        function drawitem(date) {
            var td = new Date(date);
            var dm = ExtractDate(td);
            var startDay = new Date(dm[0], dm[1] - 1, 1);
            var endDay = new Date(dm[0], dm[1], 0);

            if (currentMonth == -1) {
                currentMonth = parseInt(dm[1]);
                currentyear = parseInt(dm[0]);
            }

            var column = startDay.getDay();
            var column_end = parseInt(endDay.getDate());
            var title = "Ngày " + dm[2] + " tháng " + dm[1] + " năm " + dm[0];
            document.getElementById(calendarid + '_title').innerText = title;

            if (redraw = false) {
                currentMonth = dm[1];
                currentyear = dm[0];
                redraw = true;
            }
            
            var days = '';
            var countday = 1;
            if (column == 0) {
                column = 7;
            } else if (column == 7) {
                column = 0;
            }

            var length = column_end + column + 1;
            for (var j = 1; j <= length; j++) {
                if ((j >= column) && (countday <= column_end)) {
                    var vl = dm[0] + '-' + dm[1] + '-' + countday;                            
                    days += '<li id="d_' + countday + '" class="tm-day" day="' + vl + '">' + countday + '</li>';
                    countday = countday + 1;
                } else {
                    days += '<li class="tm-day"></li>';
                }
            }
            $('#' + calendarid + '_days').html(days);
        }

        this.showcalendar = function showcalendar(offset, id) {
            var ele = document.getElementById(calendarid);
            var caw = $('#' + calendarid).width();
            var x1 = offset.x - (caw/2);
            let y2 = offset.y + 25;
            ele.style.display = 'block';            
            ele.style.left = x1 + 'px';
            ele.style.top = y2 + 'px';            
            calendarshow = true;
            _displayid = id;
        }

        this.hidecalendar = function hidecalendar() {
            $('#' + calendarid).hide();
            calendarshow = false;
        }

        $('#' + calendarid + '_prev').click(function () {
            currentMonth = currentMonth - 1;
            if (currentMonth == 0) {
                currentMonth = 12;
                currentyear = currentyear - 1;
            }
            var d = currentyear + '/' + currentMonth + '/25';  
            var cvd = new Date(d);                   
            drawitem(cvd);                    
        });
        
       
        $('.tm-day').click(function (e) {
            var vl = $('#' + e.target.id).attr('day');            
            config.click(vl, _displayid);
            
        });
        
        var itemdays = document.getElementById(calendarid + '_days');
        itemdays.onclick = function (e) {
                var item = e.target.getAttribute('day');
                config.click(item, _displayid);
            
        }
        
    $('#' + calendarid + '_next').click(function () {
            currentMonth = currentMonth + 1;
            if (currentMonth == 12) {
                currentMonth = 1;
                currentyear = currentyear + 1;
            }

            var d = currentyear + '/' + currentMonth + '/25';
            var cvd = new Date(d);
            var lastday = new Date(cvd);
            drawitem(cvd);  
        });
        
        return this;
    }
})(jQuery);