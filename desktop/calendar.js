// 基本数据定义
let config = {
    /**
     * 假期日期
     */
    Holidays:[
      "20181230","20181231","20190101","20190204","20190205","20190206","20190207","20190208","20190209","20190210",
      "20190405","20190406","20190407","20190501","20190502","20190503","20190504","20190607","20190608","20190609",
      "20190913","20190914","20190915", "20191001","20191002","20191003","20191004","20191005","20191006","20191007",
      "20200101","20200124","20200125","20200126","20200127","20200128","20200129","20200130","20200404","20200405",
      "20200406","20200501","20200502","20200503","20200504","20200505","20200625","20200626","20200627","20201001",
      "20201002","20201003","20201004","20201005","20201006","20201007","20201008","20210101","20210102","20210103",
      "20210211","20210212","20210213","20210214","20210215","20210216","20210217","20210403","20210404","20210405",
      "20210501","20210502","20210503","20210504","20210505","20210612","20210613","20210614","20210919","20210920",
      "20210921","20211001","20211002","20211003","20211004","20211005","20211006","20211007","20220101","20220102",
      "20220103","20220131","20220201","20220202","20220203","20220204","20220205","20220206","20220403","20220404",
      "20220405","20220430","20220501","20220502","20220503","20220504","20220603","20220604","20220605","20220910",
      "20220911","20220912","20221001","20221002","20221003","20221004","20221005","20221006","20221007","20221231",
      "20230101","20230102","20230121", "20230122", "20230123", "20230124", "20230125", "20230126", "20230127", "20230405",
      "20230429", "20230430", "20230501", "20230502", "20230503", "20230622", "20230623", "20230624", "20230929", "20230930",
      "20231001", "20231002", "20231003", "20231004", "20231005", "20231006", "20231230", "20231231", "20240101",
    ],
    /**
     * 补休日期
     */
    Works:[
        "20181229","20190202","20190203","20190428","20190505","20190929","20191012","20200119","20200201","20200426",
        "20200509","20200628","20200927","20201010","20210207","20210220","20210425","20210508","20210918","20210926",
        "20211009","20220129","20220130","20220402","20220424","20220507","20221008","20221009","20230128", "20230129",
          "20230423", "20230506", "20230625", "20231007", "20231008",
      ],
    /**
     * 天干地支之天干速查表
     * @Array Of Property trans["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"]
     */
    Gan:["\u7532","\u4e59","\u4e19","\u4e01","\u620a","\u5df1","\u5e9a","\u8f9b","\u58ec","\u7678"],
  
    /**
     * 天干地支之地支速查表
     * @trans["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"]
     */
    Zhi:["\u5b50","\u4e11","\u5bc5","\u536f","\u8fb0","\u5df3","\u5348","\u672a","\u7533","\u9149","\u620c","\u4ea5"],
  
    /**
     * 天干地支之地支速查表<=>生肖
     * @trans["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"]
     */
    Animals:["\u9f20","\u725b","\u864e","\u5154","\u9f99","\u86c7","\u9a6c","\u7f8a","\u7334","\u9e21","\u72d7","\u732a"],
  
    /**
     * 24节气速查表
     * @trans["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"]
     */
    solarTerm:["\u5c0f\u5bd2","\u5927\u5bd2","\u7acb\u6625","\u96e8\u6c34","\u60ca\u86f0","\u6625\u5206","\u6e05\u660e","\u8c37\u96e8","\u7acb\u590f","\u5c0f\u6ee1","\u8292\u79cd","\u590f\u81f3","\u5c0f\u6691","\u5927\u6691","\u7acb\u79cb","\u5904\u6691","\u767d\u9732","\u79cb\u5206","\u5bd2\u9732","\u971c\u964d","\u7acb\u51ac","\u5c0f\u96ea","\u5927\u96ea","\u51ac\u81f3"],
  
    /**
     * 1900-2100各年的24节气日期速查表
     */
    sTermInfo:['9778397bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e','97bcf97c3598082c95f8c965cc920f',
        '97bd0b06bdb0722c965ce1cfcc920f','b027097bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e',
        '97bcf97c359801ec95f8c965cc920f','97bd0b06bdb0722c965ce1cfcc920f','b027097bd097c36b0b6fc9274c91aa',
        '97b6b97bd19801ec9210c965cc920e','97bcf97c359801ec95f8c965cc920f','97bd0b06bdb0722c965ce1cfcc920f',
        'b027097bd097c36b0b6fc9274c91aa','9778397bd19801ec9210c965cc920e','97b6b97bd19801ec95f8c965cc920f',
        '97bd09801d98082c95f8e1cfcc920f','97bd097bd097c36b0b6fc9210c8dc2','9778397bd197c36c9210c9274c91aa',
        '97b6b97bd19801ec95f8c965cc920e','97bd09801d98082c95f8e1cfcc920f','97bd097bd097c36b0b6fc9210c8dc2',
        '9778397bd097c36c9210c9274c91aa','97b6b97bd19801ec95f8c965cc920e','97bcf97c3598082c95f8e1cfcc920f',
        '97bd097bd097c36b0b6fc9210c8dc2','9778397bd097c36c9210c9274c91aa','97b6b97bd19801ec9210c965cc920e',
        '97bcf97c3598082c95f8c965cc920f','97bd097bd097c35b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa',
        '97b6b97bd19801ec9210c965cc920e','97bcf97c3598082c95f8c965cc920f','97bd097bd097c35b0b6fc920fb0722',
        '9778397bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e','97bcf97c359801ec95f8c965cc920f',
        '97bd097bd097c35b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e',
        '97bcf97c359801ec95f8c965cc920f','97bd097bd097c35b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa',
        '97b6b97bd19801ec9210c965cc920e','97bcf97c359801ec95f8c965cc920f','97bd097bd07f595b0b6fc920fb0722',
        '9778397bd097c36b0b6fc9210c8dc2','9778397bd19801ec9210c9274c920e','97b6b97bd19801ec95f8c965cc920f',
        '97bd07f5307f595b0b0bc920fb0722','7f0e397bd097c36b0b6fc9210c8dc2','9778397bd097c36c9210c9274c920e',
        '97b6b97bd19801ec95f8c965cc920f','97bd07f5307f595b0b0bc920fb0722','7f0e397bd097c36b0b6fc9210c8dc2',
        '9778397bd097c36c9210c9274c91aa','97b6b97bd19801ec9210c965cc920e','97bd07f1487f595b0b0bc920fb0722',
        '7f0e397bd097c36b0b6fc9210c8dc2','9778397bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e',
        '97bcf7f1487f595b0b0bb0b6fb0722','7f0e397bd097c35b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa',
        '97b6b97bd19801ec9210c965cc920e','97bcf7f1487f595b0b0bb0b6fb0722','7f0e397bd097c35b0b6fc920fb0722',
        '9778397bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e','97bcf7f1487f531b0b0bb0b6fb0722',
        '7f0e397bd097c35b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e',
        '97bcf7f1487f531b0b0bb0b6fb0722','7f0e397bd07f595b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa',
        '97b6b97bd19801ec9210c9274c920e','97bcf7f0e47f531b0b0bb0b6fb0722','7f0e397bd07f595b0b0bc920fb0722',
        '9778397bd097c36b0b6fc9210c91aa','97b6b97bd197c36c9210c9274c920e','97bcf7f0e47f531b0b0bb0b6fb0722',
        '7f0e397bd07f595b0b0bc920fb0722','9778397bd097c36b0b6fc9210c8dc2','9778397bd097c36c9210c9274c920e',
        '97b6b7f0e47f531b0723b0b6fb0722','7f0e37f5307f595b0b0bc920fb0722','7f0e397bd097c36b0b6fc9210c8dc2',
        '9778397bd097c36b0b70c9274c91aa','97b6b7f0e47f531b0723b0b6fb0721','7f0e37f1487f595b0b0bb0b6fb0722',
        '7f0e397bd097c35b0b6fc9210c8dc2','9778397bd097c36b0b6fc9274c91aa','97b6b7f0e47f531b0723b0b6fb0721',
        '7f0e27f1487f595b0b0bb0b6fb0722','7f0e397bd097c35b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa',
        '97b6b7f0e47f531b0723b0b6fb0721','7f0e27f1487f531b0b0bb0b6fb0722','7f0e397bd097c35b0b6fc920fb0722',
        '9778397bd097c36b0b6fc9274c91aa','97b6b7f0e47f531b0723b0b6fb0721','7f0e27f1487f531b0b0bb0b6fb0722',
        '7f0e397bd097c35b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa','97b6b7f0e47f531b0723b0b6fb0721',
        '7f0e27f1487f531b0b0bb0b6fb0722','7f0e397bd07f595b0b0bc920fb0722','9778397bd097c36b0b6fc9274c91aa',
        '97b6b7f0e47f531b0723b0787b0721','7f0e27f0e47f531b0b0bb0b6fb0722','7f0e397bd07f595b0b0bc920fb0722',
        '9778397bd097c36b0b6fc9210c91aa','97b6b7f0e47f149b0723b0787b0721','7f0e27f0e47f531b0723b0b6fb0722',
        '7f0e397bd07f595b0b0bc920fb0722','9778397bd097c36b0b6fc9210c8dc2','977837f0e37f149b0723b0787b0721',
        '7f07e7f0e47f531b0723b0b6fb0722','7f0e37f5307f595b0b0bc920fb0722','7f0e397bd097c35b0b6fc9210c8dc2',
        '977837f0e37f14998082b0787b0721','7f07e7f0e47f531b0723b0b6fb0721','7f0e37f1487f595b0b0bb0b6fb0722',
        '7f0e397bd097c35b0b6fc9210c8dc2','977837f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721',
        '7f0e27f1487f531b0b0bb0b6fb0722','7f0e397bd097c35b0b6fc920fb0722','977837f0e37f14998082b0787b06bd',
        '7f07e7f0e47f531b0723b0b6fb0721','7f0e27f1487f531b0b0bb0b6fb0722','7f0e397bd097c35b0b6fc920fb0722',
        '977837f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721','7f0e27f1487f531b0b0bb0b6fb0722',
        '7f0e397bd07f595b0b0bc920fb0722','977837f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721',
        '7f0e27f1487f531b0b0bb0b6fb0722','7f0e397bd07f595b0b0bc920fb0722','977837f0e37f14998082b0787b06bd',
        '7f07e7f0e47f149b0723b0787b0721','7f0e27f0e47f531b0b0bb0b6fb0722','7f0e397bd07f595b0b0bc920fb0722',
        '977837f0e37f14998082b0723b06bd','7f07e7f0e37f149b0723b0787b0721','7f0e27f0e47f531b0723b0b6fb0722',
        '7f0e397bd07f595b0b0bc920fb0722','977837f0e37f14898082b0723b02d5','7ec967f0e37f14998082b0787b0721',
        '7f07e7f0e47f531b0723b0b6fb0722','7f0e37f1487f595b0b0bb0b6fb0722','7f0e37f0e37f14898082b0723b02d5',
        '7ec967f0e37f14998082b0787b0721','7f07e7f0e47f531b0723b0b6fb0722','7f0e37f1487f531b0b0bb0b6fb0722',
        '7f0e37f0e37f14898082b0723b02d5','7ec967f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721',
        '7f0e37f1487f531b0b0bb0b6fb0722','7f0e37f0e37f14898082b072297c35','7ec967f0e37f14998082b0787b06bd',
        '7f07e7f0e47f531b0723b0b6fb0721','7f0e27f1487f531b0b0bb0b6fb0722','7f0e37f0e37f14898082b072297c35',
        '7ec967f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721','7f0e27f1487f531b0b0bb0b6fb0722',
        '7f0e37f0e366aa89801eb072297c35','7ec967f0e37f14998082b0787b06bd','7f07e7f0e47f149b0723b0787b0721',
        '7f0e27f1487f531b0b0bb0b6fb0722','7f0e37f0e366aa89801eb072297c35','7ec967f0e37f14998082b0723b06bd',
        '7f07e7f0e47f149b0723b0787b0721','7f0e27f0e47f531b0723b0b6fb0722','7f0e37f0e366aa89801eb072297c35',
        '7ec967f0e37f14998082b0723b06bd','7f07e7f0e37f14998083b0787b0721','7f0e27f0e47f531b0723b0b6fb0722',
        '7f0e37f0e366aa89801eb072297c35','7ec967f0e37f14898082b0723b02d5','7f07e7f0e37f14998082b0787b0721',
        '7f07e7f0e47f531b0723b0b6fb0722','7f0e36665b66aa89801e9808297c35','665f67f0e37f14898082b0723b02d5',
        '7ec967f0e37f14998082b0787b0721','7f07e7f0e47f531b0723b0b6fb0722','7f0e36665b66a449801e9808297c35',
        '665f67f0e37f14898082b0723b02d5','7ec967f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721',
        '7f0e36665b66a449801e9808297c35','665f67f0e37f14898082b072297c35','7ec967f0e37f14998082b0787b06bd',
        '7f07e7f0e47f531b0723b0b6fb0721','7f0e26665b66a449801e9808297c35','665f67f0e37f1489801eb072297c35',
        '7ec967f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721','7f0e27f1487f531b0b0bb0b6fb0722'],
  
    /**
     * 数字转中文速查表
     * @trans ['日','一','二','三','四','五','六','七','八','九','十']
     */
    nStr1:["\u65e5","\u4e00","\u4e8c","\u4e09","\u56db","\u4e94","\u516d","\u4e03","\u516b","\u4e5d","\u5341"],
  
    /**
     * 日期转农历称呼速查表
     * @trans ['初','十','廿','卅']
     */
    nStr2:["\u521d","\u5341","\u5eff","\u5345"],
  
    /**
     * 月份转农历称呼速查表
     * @trans ['正','一','二','三','四','五','六','七','八','九','十','冬','腊']
     */
    nStr3:["\u6b63","\u4e8c","\u4e09","\u56db","\u4e94","\u516d","\u4e03","\u516b","\u4e5d","\u5341","\u51ac","\u814a"],
  
    /**
     * 公历节日
     **/
    sFtv :[
        "0101 元旦", "0214 情人节", "0308 妇女节", "0312 植树节", "0315 消费者权益日", "0401 愚人节", "0501 劳动节",
        "0504 青年节", "0512 护士节", "0601 儿童节", "0701 建党节", "0801 建军节", "0910 教师节", "0928 孔子诞辰",
        "1001 国庆节", "1006 老人节", "1024 联合国日", "1224 平安夜", "1225 圣诞节", "1101 万圣节"
      ],
  
    /**
     * 农历节日
     **/
    lFtv:["0101 春节", "0115 元宵节", "0505 端午节", "0707 七夕情人节", "0715 中元节", "0815 中秋节", "0909 重阳节", "1208 腊八节", "1224 小年"],
  
    /**
     *  公历月份中文表
     **/ 
    monthStr: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
    
    /**
     * 公历每个月份的天数普通表
     * @Array Of Property
     * @return Number
     */
    solarMonth:[31,28,31,30,31,30,31,31,30,31,30,31],
    /**
     * 农历1900-2100的润大小信息表
     * @Array Of Property
     * @return Hex
     */
    lunarInfo:[0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,//1900-1909
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
        /**Add By JJonline@JJonline.Cn**/
        0x14b63,0x09370,0x049f8,0x04970,0x064b0,0x168a6,0x0ea50, 0x06b20,0x1a6c4,0x0aae0,//2050-2059
        0x0a2e0,0x0d2e3,0x0c960,0x0d557,0x0d4a0,0x0da50,0x05d55,0x056a0,0x0a6d0,0x055d4,//2060-2069
        0x052d0,0x0a9b8,0x0a950,0x0b4a0,0x0b6a6,0x0ad50,0x055a0,0x0aba4,0x0a5b0,0x052b0,//2070-2079
        0x0b273,0x06930,0x07337,0x06aa0,0x0ad50,0x14b55,0x04b60,0x0a570,0x054e4,0x0d160,//2080-2089
        0x0e968,0x0d520,0x0daa0,0x16aa6,0x056d0,0x04ae0,0x0a9d4,0x0a2d0,0x0d150,0x0f252,//2090-2099
      0x0d520],//2100
    /** 
     * 按星期过的节日信息
     */
    weekDays: {
      '060300': "父亲节",
      '050200': "母亲节",
    },
  };
  
  /**
   * Dom渲染类
   */
  class Calendar{
    /**
     * 初始化设置
     */
    constructor() {
      this.option = {
        height: 400,
        width: 600,
      };
      [this.year, this.month, this.day] = this.days.split('-')
      this.dateClass = new DateClass()
    }
    /**
     * 获取当前的日期
     * @readonly
     * @memberof Calendar
     */
    get days () {
      let date = new Date();
      return [date.getFullYear(),date.getMonth() + 1,date.getDate()].join('-')
    }
    /**
     * 设置要显示到左侧表格中的数据，数据改变时更新界面
     * @memberof Calendar
     */
    set _showArr (arr) {
      let status = false; // 设置select修改状态
      this.showArr = arr
      let list = document.querySelectorAll('.calendar-left-main .calendar-main-col')
      list.forEach((item, index) => {
        if (!status && arr[index].isMonth) {
          status = true
          this.setSelect(document.querySelector('.select-year select'), arr[index].day.slice(0,4))
          this.setSelect(document.querySelector('.select-month select'), arr[index].day.split('-')[1])
        }
        arr[index].isSel ? this._dayInfo = arr[index] : ''
        arr[index].isToday = (arr[index].day == this.days) ? true : false
        let info, classList = []
        if(arr[index].isHolidays) classList.push('isHolidays')
        if(arr[index].isWorks) classList.push('isWorks')
        if(arr[index].isToday) classList.push('isToday')
        if(arr[index].isSel) classList.push('isSel')
        if (!arr[index].isMonth) classList.push('isMonth')
        info = (arr[index].solarDay.length<=4?arr[index].solarDay:'') || arr[index].lunarDays || arr[index].weekDays || arr[index].term || arr[index].chinaLunars.slice(-2)
        item.classList.remove('isHolidays')
        item.classList.remove('isWorks')
        item.classList.remove('isToday')
        item.classList.remove('isSel')
        item.classList.remove('isMonth')
        classList.map(list => {
          item.classList.add(list)
        })
        item.setAttribute('day', arr[index].day)
        item.querySelector('.calendar-col-day').innerHTML = arr[index].day.split('-')[2]
        item.querySelector('.calendar-col-info').innerHTML = info
      })
    }
    /**
     * 设置当前选中日期的数据并更新右侧界面，默认为当天
     * @memberof Calendar
     */
    set _dayInfo (info) {
      this.dayInfo = info
      let html = ''
      if (this.dayInfo.chinaLunars) html += `<p>${this.dayInfo.chinaLunars}</p>`
      if (this.dayInfo.animal) html += `<p>${this.dayInfo.animal}</p>`
      if (this.dayInfo.ganzY) html += `<p>${this.dayInfo.ganzY}年</p>`
      if (this.dayInfo.ganzM) html += `<p>${this.dayInfo.ganzM}月</p>`
      if (this.dayInfo.ganzD) html += `<p>${this.dayInfo.ganzD}日</p>`
      if (this.dayInfo.astro) html += `<p>${this.dayInfo.astro}</p>`
      if (this.dayInfo.solarDay) html += `<p>${this.dayInfo.solarDay}</p>`
      if (this.dayInfo.lunarDays) html += `<p>${this.dayInfo.lunarDays}</p>`
      if (this.dayInfo.weekDays) html += `<p>${this.dayInfo.weekDays}</p>`
      if (this.dayInfo.term) html += `<p>${this.dayInfo.term}</p>`
      document.querySelector('.calendar-right-main').innerHTML = this.formatNum(info.day.split('-')[2])
      document.querySelector('.calendar-right-day').innerHTML = info.day.split('-').map(item => {
        return this.formatNum(item)
      }).join('-')
      document.querySelector('.calendar-right-text').innerHTML = html
    }
    /**
     * 入口渲染方法
     * @param {object} opt {element,height,width}无需添加'px'
     */
    render (opt) {
      this.options = {...this.option, ...opt};
      if (this.options.width < this.option.width || this.options.height*1 < this.option.height) {
        throw new Error(`width must be min ${this.option.width} and height must be min ${this.option.height}`);
      }
      this.el = document.querySelector(this.options.element);
      this.el.style.height = this.options.height + 'px';
      this.el.style.width = this.options.width + 'px';
      // 渲染界面
      this.works();
      // 设置初始内容
      this._showArr = this.dateClass.infos(...this.days.split('-'))
      // 绑定动作
      this.bind()
    }
    /**
     * 工作面渲染
     */
    works () {
      let mhtml = '', yhtml = ''
      for (let i = 1; i <= 12; i++) {
        let text=config.monthStr[i-1]
        mhtml += `<option value="${i}">${text}月</option>`
      }
      for (let i = 1900; i <= 2100; i++) {
        yhtml += `<option value="${i}">${i}年</option>`
      }
      let main = ''
      for (let row = 1; row <= 6; row++) {
        main += `<div class="calendar-main-row">`
        for (let col = 1; col <= 7; col++) {
          main += `<div class="calendar-main-col">
            <div class="calendar-col-day"></div>
            <div class="calendar-col-info"></div>
          </div>`
        }
        main += `</div>`
      }
      let html = `<div class="calendar-container">
        <div class="calendar-left">
          <div class="calendar-left-toolbar">
            <div class="calendar-toolbar-item select-year">
              <select>
                ${yhtml}
              </select>
            </div>
            <div class="calendar-toolbar-item select-back">◀</div>
            <div class="calendar-toolbar-item select-month">
              <select>
                ${mhtml}
              </select>
            </div>
            <div class="calendar-toolbar-item select-next">▶</div>
            <div class="calendar-toolbar-item select-today">
              <button>返回今天</button>
            </div>
          </div>
          ${this.titles()}
          <div class="calendar-left-main">${main}</div>
        </div>
        <div class="calendar-right">
          <div class="calendar-right-day"></div>
          <div class="calendar-right-main"></div>
          <div class="calendar-right-text"></div>
        </div>
      </div>`;
      this.el.innerHTML = html
    }
    /**
     * 表头部分
     * @returns 表头部分html
     */
    titles () {
      let html = ''
      for (let i = 1; i <= 7; i++) {
        html += `<div class="calendar-titles-item">${config.nStr1[i%7]}</div>`;
      }
      return `<div class="calendar-left-titles">${html}</div>`
    }
    /**
     * 小于10的数字前加0
     * @param {number} num 数字
     * @returns {string} 返回两位数的字符
     */
    formatNum (num) {
      return num < 10 ? ("0" + num) : num;
    }
    /**
     * 给工具按钮以及单元格绑定点击事件
     */
    bind () {
      // 返回今天，已经是今天则不绑定
      this.el.querySelector('.select-today').addEventListener('click', () => {
        if (this.dayInfo.day == this.days) return;
        this._showArr = this.dateClass.infos(...this.days.split('-'))
      })
      // 选择年份
      let ybtn = this.el.querySelector('.select-year').querySelector('select')
      let mbtn = this.el.querySelector('.select-month').querySelector('select')
      ybtn.addEventListener('change', () => {
        this._showArr = this.dateClass.infos(ybtn.value, mbtn.value, this.dayInfo.day.split('-')[2])
      })
      // 选择月份
      mbtn.addEventListener('change', () => {
        this._showArr = this.dateClass.infos(ybtn.value, mbtn.value, this.dayInfo.day.split('-')[2])
      })
      // 上一月
      this.el.querySelector('.select-back').addEventListener('click', () => {
        let [y, m, d] = this.dayInfo.day.split('-')
        if (m == 1) {
          m = 12
          y--
        } else {
          m--
        }
        this._showArr = this.dateClass.infos(y, m, d)
        return
      })
      // 下一月
      this.el.querySelector('.select-next').addEventListener('click', () => {
        let [y, m, d] = this.dayInfo.day.split('-')
        if (m == 12) {
          m = 1
          y++
        } else {
          m++
        }
        this._showArr = this.dateClass.infos(y, m, d)
        return
      })
      // 某一天
      let td = this.el.querySelectorAll('.calendar-main-col')
      td.forEach(item => {
        item.addEventListener('click', () => {
          let date = item.getAttribute('day')
          if (item.classList.contains('isMonth')) {
            this._showArr = this.dateClass.infos(...date.split('-'))
          } else {
            td.forEach(list => {
              list.classList.remove('isSel')
            })
            item.classList.add('isSel')
            this._dayInfo = this.showArr.filter(list => {
              return list.day == date
            })[0]
          }
        })
      })
    }
    /**
     * 传入select Dom和值动态改变select当前选中状态
     * @param {object} el select元素 dom对象 
     * @param {string} val select选中的值
     */
    setSelect (el, val) {
      for (let i = 0; i < el.options.length; i++) {
        if(el.options[i].value == val) el.options[i].selected = true
      }
    }
  }
  
  /**
   * 日期信息操作类
   */
  class DateClass {
    /**
     * 格式化日期：如果日期格式错误则更正到正确日期，不能更正的抛出异常
     * @param {number} y 年
     * @param {number} m 月
     * @param {number} d 日
     * @returns {array} 返回日期数组[y,m,d]
     */
    forDays (y, m, d) {
      if (y < 1900 || y > 2100 || m < 1 || m > 12 || d < 1 || d > 31) throw new Error('日期超出范围')
      d = d > this.solarMonth(y, m, d) ? this.solarMonth(y, m, d) : d
      return [y,m,d]
    }
    /**
     * 获得当前月份第一天是星期几
     * @param {number} y 年
     * @param {number} m 月
     * @returns {number} 返回星期数字[0-6]
     */
    solarWeeks (y, m, d) {
      return this.solarWeek(y, m, 1)
    }
    /**
     * 获取当月前面需补齐的数组
     * @param {number} y 年
     * @param {number} m 月 
     * @param {number} d 日
     * @returns {array} 前面需补齐的日期数组
     */
    beforDays (y, m, d) {
      //当月1号星期数 - 1，如果星期数为0则返回6
      let w = this.solarWeeks(y, m, d)
      w = w ? w - 1 : 6
      // 获取上月天数
      if (m == 1) {
        m = 12;
        y--
      } else {
        m--
      }
      let days = this.solarMonth(y, m, d)
      // 组成数组
      let arr = []
      for (let i = 1; i <= w; i++) {
        d = days - w
        arr.push(`${y}-${m}-${d + i}`)
      }
      return arr
    }
    /**
     * 返回上月日期+当月日期数组
     * @param {number} y 年
     * @param {number} m 月 
     * @param {number} d 日
     * @returns {array} 上月+当月日期数组
     */
    arrDays (y, m, d) {
      let arr = []
      // 获取当月天数
      let dd = this.solarMonth(y, m, d)
      for (let i = 1; i <= dd; i++) {
        arr.push(`${y}-${m}-${i}`)
      }
      return [...this.beforDays(y, m, d), ...arr]
    }
    /**
     * 返回上月+当月+下月日期数组
     * @param {number} y 年
     * @param {number} m 月 
     * @param {number} d 日
     * @returns {array} 上月+当月+下月日期数组
     */
    afterDays (y, m, d) {
      let arr = []
      let days = this.arrDays(y, m, d)
      if (m == 12) {
        m = 1;
        y++;
      } else {
        m++;
      }
      for (let i = 1; i <= 42 - days.length; i++) {
        arr.push(`${y}-${m}-${i}`)
      }
      return [...days,...arr]
    }
    /**
     * 获取要显示的日期信息
     * @param {number} y 年
     * @param {number} m 月
     * @param {number} d 日
     * @returns {array} 返回要显示的日期及其详细信息
     */
    infos (y, m, d) {
      [y, m, d] = this.forDays(y, m, d)
      let arr = []
      this.afterDays(y, m, d).forEach(item => {
        let obj = this.getDayInfo(...item.split('-'))
        obj.isSel = (y == item.split('-')[0] && m == item.split('-')[1] && d == item.split('-')[2])
        obj.isMonth = m == item.split('-')[1]
        arr.push(obj)
      })
      return arr
    }
    /**
     * 根据公历日期获取当天信息
     * @param {number} y 年
     * @param {number} m 月 
     * @param {number} d 日
     * @returns {object} 根据公历日期获取当天所有信息
     */
    getDayInfo (y, m, d) {
      [y, m, d] = this.forDays(y,m, d)
      let firstNode = this.getTerm(this.getLunars(y, m, d).split('-')[0], m * 2 - 1), secondNode = this.getTerm(this.getLunars(y, m, d).split('-')[0], m * 2)
      let ganzm = (d*1 >= firstNode) ? this.toGanZhi((y - 1900) * 12 + m *1 + 12) : this.toGanZhi((y - 1900) * 12 + m*1 + 11)
      let dayCyclical = Date.UTC(this.getLunars(y, m, d).split('-')[0], this.getLunars(y, m, d).split('-')[1] - 1, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10
      let gzd = this.toGanZhi(dayCyclical+this.getLunars(y, m, d).split('-')[2])
      let term = false
      if (firstNode == d) term = config.solarTerm[m * 2 - 2]
      if (secondNode == d) term = config.solarTerm[m * 2 - 1]
      let obj = {
        day: y + '-' + m + '-' + d,  //公历日期
        isHolidays: this.getHolidays(y, m, d),  // 法定假期
        isWorks: this.getWorks(y, m, d),  // 法定假期调休上班日期
        lunarDay: this.getLunars(y, m, d),  // 农历日期，闰月前带0
        lunarDays: this.getlunarDay(...this.getLunars(y, m, d).split('-')),  // 农历节日
        animal: this.getAnimal(...this.getLunars(y, m, d).split('-')),  // 属相
        // 农历日期民俗叫法
        chinaLunars: this.toChinaMonth(...this.getLunars(y, m, d).split('-')) + this.toChinaDay(...this.getLunars(y, m, d).split('-')),
        solarDay: this.getSolarDay(y, m, d),  // 公历节日
        astro: this.toAstro(y, m, d),  // 星座
        ganzY: this.toGanZhiYear(...this.getLunars(y, m, d).split('-')),  // 干支年
        ganzM: ganzm,  // 干支月
        ganzD: gzd,  // 干支日
        term: term,  // 节气
        weekDays: this.getWeekDays(y, m, d)
      }
      return obj
    }
    /**
     * 获取公历某一天是星期几
     * @param {number} y 年
     * @param {number} m 月 
     * @param {number} d 日
     * @returns {number} 返回星期数字[0-6]
     */
    solarWeek (y, m, d) {
      let date = new Date(y,m-1,d)
      let week = date.getDay()
      return week
    }
    /**
     * 获取公历月份天数
     * @param {number} y 年
     * @param {number} m 月 
     * @returns {number} 返回输入月份天数
     */
    solarMonth (y, m, d) {
      if (m == 2) return (y % 4 == 0 && y % 100 != 0 || y % 400 == 0) ? 29 : 28
      return config.solarMonth[m-1]
    }
    /**
     * 查询一个公历日期是否法定节假日
     * @param {number} y 年
     * @param {number} m 月
     * @param {number} d 日
     * @returns {boolean} 是否法定节假日
     */
    getHolidays (y, m, d) {
      for (let i = 0; i < config.Holidays.length; i++) {
        let year = parseInt(config.Holidays[i].slice(0, 4))
        let month = parseInt(config.Holidays[i].slice(4, 6))
        let day = parseInt(config.Holidays[i].slice(6))
        if (y == year && m == month && day == d) {
          return true
        }
      }
      return false
    }
    /**
     * 查询一个公历日期是否法定节假日调休上班日
     * @param {number} y 年
     * @param {number} m 月
     * @param {number} d 日
     * @returns {boolean} 是否法定节假日调休上班日
     */
    getWorks (y, m, d) {
      for (let i = 0; i < config.Works.length; i++) {
        let year = parseInt(config.Works[i].slice(0, 4))
        let month = parseInt(config.Works[i].slice(4, 6))
        let day = parseInt(config.Works[i].slice(6))
        if (y == year && m == month && day == d) {
          return true
        }
      }
      return false
    }
    /**
     * 查询公历日期节日
     * @param {number} m 月
     * @param {number} d 日
     * @returns {string | boolean} 返回节日信息，不是节日则返回false
     */
    getSolarDay (y, m, d) {
      let solarDay = false
      for (let i = 0; i < config.sFtv.length; i++) {
        if (parseInt(config.sFtv[i].slice(0, 2)) == m && parseInt(config.sFtv[i].slice(2, 4)) == d) {
          solarDay = config.sFtv[i].slice(5)
        }
      }
      return solarDay
    }
    /**
     * 返回公历日期所属星座
     * @param {number} m 月
     * @param {number} d 日 
     * @returns {string} 返回星座信息
     */
    toAstro (y, m, d) {
      let s = "\u9b54\u7faf\u6c34\u74f6\u53cc\u9c7c\u767d\u7f8a\u91d1\u725b\u53cc\u5b50\u5de8\u87f9\u72ee\u5b50\u5904\u5973\u5929\u79e4\u5929\u874e\u5c04\u624b\u9b54\u7faf";
      let arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
      let i = m * 2 - (d < arr[m - 1] ? 2 : 0)
      return s.slice(i, i + 2) + "\u5ea7";
    }
    /**
     * 获取公历年第n个节气日期
     * @param {number} y 年
     * @param {number} n 第几个节气
     * @returns {string} 返回日期,0506
     */
    getTerm (y, n) {
      let _table = config.sTermInfo[y - 1900]
      let _info = [
        parseInt('0x'+_table.slice(0,5)).toString(),
        parseInt('0x'+_table.slice(5,10)).toString(),
        parseInt('0x'+_table.slice(10,15)).toString(),
        parseInt('0x'+_table.slice(15,20)).toString(),
        parseInt('0x'+_table.slice(20,25)).toString(),
        parseInt('0x'+_table.slice(25)).toString()
      ]
      let d = [
        _info[0].slice(0, 1),
        _info[0].slice(1, 3),
        _info[0].slice(3, 4),
        _info[0].slice(4, 6),
  
        _info[1].slice(0, 1),
        _info[1].slice(1, 3),
        _info[1].slice(3, 4),
        _info[1].slice(4, 6),
  
        _info[2].slice(0, 1),
        _info[2].slice(1, 3),
        _info[2].slice(3, 4),
        _info[2].slice(4, 6),
  
        _info[3].slice(0, 1),
        _info[3].slice(1, 3),
        _info[3].slice(3, 4),
        _info[3].slice(4, 6),
  
        _info[4].slice(0, 1),
        _info[4].slice(1, 3),
        _info[4].slice(3, 4),
        _info[4].slice(4, 6),
  
        _info[5].slice(0, 1),
        _info[5].slice(1, 3),
        _info[5].slice(3, 4),
        _info[5].slice(4, 6),
      ]
      return d[n-1]
    }
    /**
     * 根据公历日期返回农历日期
     * @param {number} y 年
     * @param {number} m 月
     * @param {number} d 日
     * @returns {string} 返回农历日期,如果是闰月则月份前含0
     */
    getLunars (y, m, d) {
      let date = new Date(y, m - 1, d), i, leap = 0, temp = 0
      let offset = (Date.UTC(y, m-1, d) - Date.UTC(1900, 0, 31)) / 86400000
      for (i = 1900; i < 2101 && offset > 0; i++) {
        temp = this.lYearDays(i);
        offset -= temp;
      }
      if (offset < 0) {
        offset+=temp
        i--
      }
      // 获取闰月
      let year = i
      leap = this.leapMonth(i)
      let isLeap = false
      // 校验闰月
      for (i = 1; i < 13 && offset > 0; i++) {
        if (leap > 0 && i == leap + 1 && !isLeap) {
          --i
          isLeap = true
          temp = this.leapDays(year) // 闰月天数
        } else {
          temp = this.monthDays(year, i) // 普通月天数
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
      let month = isLeap?"0" + i : i
      // 农历日
      let day = ++offset
      return year + '-' + month + '-' + day
    }
  
    /**
     * 农历年份转生肖
     * @param {number} y 农历年
     * @returns {string} 农历年份转生肖
     */
    getAnimal (y, m, d) {
      return config.Animals[(y-4)%12]
    }
    /**
     * 返回农历月份通俗表示法
     * @param {number} m 农历月
     * @returns {string} 返回农历月份通俗表示法：'正月'
     */
    toChinaMonth (y, m, d) {
      let r = m.slice(0, 1) == '0'
      return r ? ('\u95f0' + config.nStr3[m-1] + '\u6708') : (config.nStr3[m-1] + '\u6708') // 加上"月"字
    }
    /**
     * 返回农历日期通俗表示法
     * @param {number} d 农历日
     * @returns {string} 返回农历日期通俗表示法：‘初一’
     */
    toChinaDay (y, m, d) {
      let str = d==10?config.nStr2[0]:config.nStr2[Math.floor(d/10)]
      return str + (d%10?config.nStr1[d%10]:config.nStr1[10])
    }
    /**
     * 获取农历非闰月的总天数
     * @param {number} y 农历年
     * @param {number} m 农历月 
     * @returns {number} 返回农历非闰月的天数
     */
    monthDays (y, m, d) {
      return (config.lunarInfo[y-1900] & (0x10000>>m))? 30: 29
    }
    /**
     * 通过农历日期获取农历节日
     * @param {number} y 农历年
     * @param {number|string} m 农历月，如果是闰月则为字符串‘07’
     * @param {number} d 农历日
     * @returns {string|boolean} 返回农历节日，没有节日则返回false
     */
    getlunarDay (y, m, d) {
      if(m.slice(0, 1) == '0') return false; //如果是闰月则没有节日
      let lunarDay = false
      for (let i = 0; i < config.lFtv.length; i++) {
        if (parseInt(config.lFtv[i].slice(0, 2)) == m && parseInt(config.lFtv[i].slice(2, 4)) == d) {
          lunarDay = config.lFtv[i].slice(5)
        }
      }
      // 判断是否为除夕
      if(m == 12 && this.monthDays(y,m,d) == d) lunarDay = '除夕'
      return lunarDay
    }
    /**
     * 返回农历年闰月，没有闰月则返回0
     * @param {number} y 农历年
     * @returns {number} 农历年闰月月份数字，没有闰月则返回0
     */
    leapMonth (y, m, d) {
      return config.lunarInfo[y-1900] & 0xf
    }
    /**
     * 返回农历年闰月的天数，没有闰月则返回0
     * @param {number} y 农历年
     * @returns {number} 闰月的天数，没有闰月则返回0
     */
    leapDays (y, m, d) {
      return this.leapMonth(y, m, d) ? ((config.lunarInfo[y-1900] & 0x10000) ? 30:29) : 0
    }
    /**
     * 返回农历一年的天数
     * @param {number} y 农历年份
     * @returns {number} 一年的天数
     */
    lYearDays (y, m, d) {
      let i, sum = 348;
      for(i=0x8000; i>0x8; i>>=1) { sum += (config.lunarInfo[y-1900] & i)? 1: 0; }
      return(sum+this.leapDays(y));
    }
    /**
     * 返回农历年份干支纪年
     * @param {number} y 农历年份
     * @returns {string} 农历年份的干支纪年法
     */
    toGanZhiYear (y, m, d) {
      let g = (y - 3) % 10
      let z = (y - 3) % 12
      g = (g == 0) ? 10 : g
      z = (z == 0) ? 12 : z
      return config.Gan[g-1]+config.Zhi[z-1]
    }
    /**
     * 根据偏移量返回干支
     * @param {number} offset 偏移量
     * @returns {string} 干支
     */
    toGanZhi (offset) {
      return config.Gan[offset%10] + config.Zhi[offset%12]
    }
    /** 
     * 按星期过的节日
     * @param {number} y 年
     * @param {number} m 月
     * @param {number} d 日
     * @return {string | boolean} 如果是节日返回节日名称，否则返回false
     */
    getWeekDays (y, m, d) {
      let w = this.solarWeeks(y, m, d)
      for (const key in config.weekDays) {
        let month = key.slice(0, 2)*1,
          node = key.slice(2, 4)*1,
          week = key.slice(4) * 1
        if(w == week && m == month && Math.ceil(d/7) == node) return config.weekDays[key]
      }
      return false
    }
  }
  let calendar = new Calendar();
  export { calendar };
