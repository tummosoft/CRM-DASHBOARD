 (function ($) {
            $.fn.tummoCboCalendar = function (options) {
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

                if (_lblw > 30) {
                    this.css('display', 'flex');
                    this.css('position', 'relative');
                    this.css('margin-bottom', '5px;');

                    _lbl = '<label style="font-size:14px;min-width:' + _lblw + 'px;" class="tummo-label" for="' + id + '">' + config.label + '</label>';
                }

                $(this).addClass('tummo-select');

                var drawbox = _lbl + '<div style="min-width:' + _inputWidth + 'px;" class="tummo-select-selection ' + _yell + '"><input id="' + id + '_input" value="Default"><div id="' + id + '_btn" class="select-btn ' + _yebtn + '"></div></div><div style="left:' + _lblw + 'px;top:30px;" id="' + id + '_drop" class="tummo-select-dropdown"><div id="' + id + '_draw" style="margin-top:7px;"></div></div>';
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
                    
                    if (currentMonth = -1) {currentMonth = parseInt(month);}
                    if (currentyear = -1) {currentyear = parseInt(year);}
                    
                    var day = today.getDate();
                    var startDay = new Date(year, month - 1, 1);
                    var endDay = new Date(year, month, 0);

                    var column = startDay.getDay();
                    var column_end = parseInt(endDay.getDate());
                    
                    var title = "Ngày " + day + " tháng " + month + " năm " + year;
                    
                    var _wc = settings.width - 15;
                    if (redraw == false) {
                        var vl = year + "-" + month + "-" + day;
                        $('#' + id + '_input').val(vl);
                    var drawcalendar = '<div style="width:' + _wc + 'px;z-index:114;position:fixed;" class="tummo-calendar"><div class="calendar-header"><div id="' + id + '_last" class="tm-last-month"></div><div id="' + id + '_title" class="tm-title">' + title + '</div><div id="' + id + '_next"  class="tm-next-month"></div></div><div class="tm-calendar-body"><ul class="tm-week"><li>T.Hai</li><li>T.Ba</li><li>T.Tư</li><li>T.Năm</li><li>T.Sáu</li><li>T.Bảy</li><li>C.Nhật</li></ul><ul id="' + id +'_days" class="tm-days">';                       
                    }
                    var days = '';
                    var countday = 1;

                    if (column == 0) {
                        column = 7;
                    } else if (column == 7) {
                        column = 0;
                    }

                    var length = column_end + column + 1;      
                    if (redraw == false) {              
                        for (var j = 1; j <= length; j++) {
                            if ((j >= column) && (countday <= column_end)) {
                                days += '<li class="tm-day" day="' + year + '-' + month + '-' + countday + '">' + countday + '</li>';
                                countday = countday + 1;
                            } else {
                                days += '<li class="tm-day"></li>';                              
                            }
                        }
                    } else {
                        var j = 1;
                        countday = 1;
                        $('#' + id +'_days li').each(function () {
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
                   
                }

                var html = drawbox + '</div>';
                $(this).html(html);

                var today = new Date();
                NewCalendar(today);

                var ExpandOpen = false;
                function hideExpand(id) {
                    $(id).hide();
                    ExpandOpen = false;
                }
                var _dropopen = false;
                document.getElementById(id + '_btn').onclick = function () {
                    showExpand(id + '_drop');
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

                               
                $('#' + id + '_last').on('click', function() {                    
                   
                    currentMonth = currentMonth - 1;
                    if (currentMonth == 0) {
                        currentMonth = 12;
                        currentyear = currentyear - 1;
                    }                    
                    
                    var d = currentyear + '/' + currentMonth + '/25';
                    var lastday = new Date(d); 
                    NewCalendar(lastday);
                });

                $('#' + id + '_next').on('click',function() {                    
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
