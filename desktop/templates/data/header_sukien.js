var header_event = [{name:"id", type:"int", text:"id", display:false, width:0, render:null},
{name:"ma_dinhdanh", type:"text", text:"Mã định danh", display:true, width:50, render:null},
{name:"tenkhach", type:"text", text:"Họ tên Phật tử", display:true, width:220, render:null},
{name:"gioitinh", type:"text", text:"Giới tính", display:true, align:"center", width:50, render:null},
{name:"email", type:"render", text:"Email", display:true, width:120, render:function render(items) {
    let html = '';
    let result = items.filter((value) => value.name == 'xacminh_email');    
    let checkverify = result[0].value;    
    let getdata = items.filter((value) => value.name == 'email');
    if (checkverify == '1') {
        html = '<div class="t-grid-label t-grid-icon" oldvalue="' + getdata[0].value + '" hidenid="" cvalue="' + getdata[0].value + '" name="email">' + getdata[0].value + '</div><div class="t-grid-icon-render"><img class="icons-row" src="/icons/xacminh.svg"></div>';    
    } else if (checkverify == '0') { 
        html = '<div class="t-grid-label t-grid-icon" oldvalue="' + getdata[0].value + '" hidenid="" cvalue="' + getdata[0].value + '" name="email">' + getdata[0].value + '</div><div class="t-grid-icon-render"><img class="icons-row" src="/icons/diemdanh.svg""></div>';         
    }
    
    return html;}
},
{name:"dienthoai", type:"render", text:"Điện thoại",click: f_xacminhdt, display:true, width:140, render:function render(items) {
    let html = '';
    let result = items.filter((value) => value.name == 'xacminh_dienthoai');    
    let checkverify = result[0].value;    
    let getdata = items.filter((value) => value.name == 'dienthoai');
    if (checkverify == '1') {
        html = '<div class="t-grid-label t-grid-icon" oldvalue="' + getdata[0].value + '" hidenid="" cvalue="' + getdata[0].value + '" name="email">' + getdata[0].value + '</div><div class="t-grid-icon-render"><img class="icons-row" src="/icons/xacminh.svg"></div>';   
    } else if (checkverify == '2') { 
        html = '<div class="t-grid-label t-grid-icon" oldvalue="' + getdata[0].value + '" hidenid="" cvalue="' + getdata[0].value + '" name="email">' + getdata[0].value + '</div><div class="t-grid-icon-render"><img class="btn-animation" src="/icons/misscall.svg""></div>';    
    } else if (checkverify == '0') { 
        html = '<div class="t-grid-label t-grid-icon" oldvalue="' + getdata[0].value + '" hidenid="" cvalue="' + getdata[0].value + '" name="email">' + getdata[0].value + '</div><div class="t-grid-available-click t-grid-icon-render"><img class="btn-animation" src="/icons/call.svg""></div>';   
    } else if (checkverify == '-1') { 
        html = '<div class="t-grid-label t-grid-icon" oldvalue="' + getdata[0].value + '" hidenid="" cvalue="' + getdata[0].value + '" name="email">' + getdata[0].value + '</div><div class="t-grid-icon-render"><img class="icons-row" src="/icons/userdelete.svg"></div>';          
    }
    
    return html;}
},
{name:"id_sukien", type:"text", text:"ID sự kiện", display:false, width:0, render:null},
{name:"ngay_dangky", type:"text", text:"Ngày đăng ký",align:'center', display:true, width:120, render:null},
{name:"luutru", type:"date", text:"Lưu trú", display:false, width:90, render:null},
{name:"xacminh_email", type:"text", text:"Xác minh Email", display:false, width:120, render:null},
{name:"xacminh_dienthoai", type:"text", text:"Xác minh điện thoại", display:false, width:0, render:null},
{name:"tinhtrang", type:"text", text:"Tình trạng", display:false, width:0, render:null},
{name:"khoa", type:"render", text:"Khoá", display:true, width:50, render:function render(items) {
    let html = '';
    let result = items.filter((value) => value.name == 'khoa'); 
    if (result[0].value == '0') {
        html = '<div class="t-grid-label" name="' + result[0].name + '" cvalue="' + result[0].value + '"><span style="text-align:center;width:90%;"><img class="icons-row" src="/icons/dubi2.svg"></span></div>';
    } else {      
        html = '<div class="t-grid-label" name="' + result[0].name + '" cvalue="' + result[0].value + '"><span style="text-align:center;width:90%;"><img class="icons-row" src="/icons/lock.svg"></span></div>';   
    }

    return html;}
},
{name:"diem_danh", type:"render", text:"Điểm danh", display:true, click:f_diemdanh,width:50, render:function render(items) {
    let html = '';
    let result = items.filter((value) => value.name == 'diem_danh'); 
    if (result[0].value == '0') {
        html = '<div class="tm-checkbox t-grid-label" name="' + result[0].name + '" cvalue="' + result[0].value + '"><input style="position: absolute;left: calc(50% - 7px);top: 3px;" type="checkbox" name="checkbox" class="tummo-item-checkbox" value="uncheck"></div>';   
    } else {      
        html = '<div class="t-grid-label t-grid-icon" oldvalue="' + result[0].value + '" hidenid="" cvalue="' + result[0].value + '" name="' +  result[0].name + '"></div><div class="t-grid-icon-render"><img style="margin-left:-5px" class="icons-row" src="/icons/xacminh.svg"></div>';     
    }
    
    return html;
}},
{name:"thongbao_huy", type:"render", text:"Huỷ", display:true, width:50, click:f_diemdanh, render:function render(items) {
    let html = '';
    let result = items.filter((value) => value.name == 'thongbao_huy'); 
    if (result[0].value == '0') {
        html = '<div class="t-grid-label" name="' + result[0].name + '" cvalue="' + result[0].value + '"><span style="text-align:center;margin:auto"><img class="icons-row" src="/icons/line-gray.svg"></span></div>';
    } else {      
        html = '<div class="t-grid-label" name="' + result[0].name + '" cvalue="' + result[0].value + '"><span style="text-align:center;margin:auto"><img class="icons-row" src="/icons/cancel.svg"></span></div>';   
    }

    return html;
}}];

function f_xacminhdt(data) {    
    showcall(data);        
}

function f_diemdanh(data) {           
        let ex = JSON.stringify(data);        
        b4j_raiseEvent('diemdanh_changed', {row:ex});
}


   