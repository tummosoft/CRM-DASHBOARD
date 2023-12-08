var lunarInfo = [0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,//1900-1909
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

function randomID() {
    return Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
}

function StringToObject(stringObject) {
    return Object.entries(stringObject).map(([name, obj]) => ({ name, ...obj }));
}
function replaceAll(str,mapObj, replaceWith) {
    var re = new RegExp(Object.keys(mapObj).join("|"),"gi");
        str = str.replace(re, function(matched){
        return mapObj[matched.toLowerCase()];
        });

        return str;
}

function convertDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('-');
  }

  function convertLunarDay(year, month, day) {
    function pad(s) { return (s < 11) ? '0' + s : s; }
    function padlunnar(s) { return (s < 10) ? '0' + s : s; }
    let rs = getLunars(year, month, day); 
    var d = new Date(rs);
    
    
    if ((d.getDate() == 1) || (day == 1)) {
      rs = ['<span class="lunar-day-small">' + padlunnar(d.getDate()) + '</span>', '<span class="lunar-month-small">' + pad(d.getMonth()+1) + '</span>'].join('/');
    } else if (d.getDate() == 15) {
      rs = ['<span class="lunar-day-small">' + padlunnar(d.getDate()) + '</span>', '<span class="lunar-full-moon"><img src="/icons/fullmoon.svg"></span>'].join('');
    } else {
      rs = '<span class="lunar-day-small">' + padlunnar(d.getDate()) + '</span>';
    }
    return rs;
  }
  
  function converHours(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat);
    return [pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds())].join(':');
  }

function convertDate2(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [d.getFullYear(), pad(d.getMonth()+1), pad(d.getDate())].join('-');
  }

  function convertDate3(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    const parts = inputFormat.split('-');    
    return [parts[2], pad(parts[1]), pad(parts[0])].join('-');
  }
  

  function convertDateToText(y,m,d) {
    function pad(s) { return (s < 10) ? '0' + s : s; }    
    return ['Ngày ' + pad(d), 'tháng ' + pad(m), 'năm ' + y].join(' ');
  }

  function convertBuddhistCalendar(y,m,d) {
    function pad(s) { return (s < 10) ? '0' + s : s; }    
    let buddhistyear = Number.parseInt(y) + 543;
    return [pad(d), pad(m), buddhistyear].join('/');
  }

  function convertLunnarToText(y,m,d) {
    function pad(s) { return (s < 10) ? '0' + s : s; }    
    let rs = [pad(d), pad(m), y].join('/');
    return '(Âm lịch: ' + rs + ')';
  }

 function hasScrollbar(id) {
    let ele = document.getElementById(id);
    let result = false;
    if (ele.scrollHeight > (ele.clientHeight-100)) {
        result = true;
    }

    return result;
 }  

 function convertValue(value) {
    let s = new String(value);
    let result = value;
    if ( s.substring(s.length -2, 1 ) == '%') {
        result = value;
    } else {
        result = value + 'px';    
    }
    return result;
 }

 function lYearDays(y, m, d) {
  let i, sum = 348;
  for (i = 0x8000; i > 0x8; i >>= 1) { sum += (lunarInfo[y - 1900] & i) ? 1 : 0; }
  return (sum + leapDays(y));
}

function leapMonth(y, m, d) {
  return lunarInfo[y - 1900] & 0xf
}

function leapDays(y, m, d) {
  return leapMonth(y, m, d) ? ((lunarInfo[y - 1900] & 0x10000) ? 30 : 29) : 0
}

function monthDays (y, m, d) {
return (lunarInfo[y-1900] & (0x10000>>m))? 30: 29
}

function lYearDays(y, m, d) {
  let i, sum = 348;
  for (i = 0x8000; i > 0x8; i >>= 1) { sum += (lunarInfo[y - 1900] & i) ? 1 : 0; }
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