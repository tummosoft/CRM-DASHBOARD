var header_event = [{name:"id", type:"int", text:"id", display:false, width:0, render:null},
{name:"ma_dinhdanh", type:"text", text:"Mã định danh", display:true, width:50, render:null},
{name:"tenkhach", type:"render", text:"Họ tên Phật tử", display:true, width:220, render:function render(items) {
        let html = '';    
        let tenkhach = items.filter((value) => value.name == 'tenkhach');    
        
        html = '<div class="t-grid-label t-grid-icon" oldvalue="' + tenkhach[0].value + '" hidenid="" cvalue="' + tenkhach[0].value + '" name="email">' + tenkhach[0].text + '</div><div class="t-grid-icon-render"><img class="icons-row" src="/templates/assets/icons/nonsendemail.svg"></div>';          
    
    
    return html;}},
{name:"phap_danh", type:"text", text:"Pháp danh", display:true, align:"center", width:200, render:null},
{name:"dia_chi", type:"text", text:"Địa chỉ", display:true, align:"center", width:250, render:null},
{name:"email", type:"text", text:"Email", display:true, align:"left", width:120, render:null},
{name:"ma_sukien", type:"text", text:"ma_sukien", display:false, width:0, render:null},
{name:"xacminh_email", type:"text", text:"xacminh_email", display:false, width:0, render:null},
{name:"xacminh_dienthoai", type:"text", text:"xacminh_dienthoai", display:false, width:0, render:null},
{name:"khoa", type:"text", text:"khoa", display:false, width:0, render:null},
{name:"diem_danh", type:"text", text:"diem_danh", display:false, width:0, render:null},
];

