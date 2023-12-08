var _w = window.innerWidth - (50 + 140 + 50 + 50 + 90 + 50 + 50);

var header_event = [{name:"id", type:"int", text:"id", display:false, width:0, render:null},
{name:"title", type:"text", text:"Tiêu đề", display:true, width:_w, render:null},
{name:"creator", type:"text", text:"Tác giả", display:true, width:50, render:null},
{name:"pubdate", type:"text", text:"Ngày đăng", display:true, width:140, render:null},
{name:"category", type:"text", text:"category", display:false, width:0, render:null},
{name:"view", type:"text", text:"Lượt xem",align:'center', display:true, width:50, render:null},
{name:"share", type:"text", text:"Lượt chia sẻ",align:'center', display:true, width:50, render:null},
{name:"share", type:"text", text:"Lượt chia sẻ",align:'center', display:true, width:50, render:null},
{name:"status", type:"render", text:"Xuất bản", display:true, width:50, render:function render(items) {
    let html = '';
    let result = items.filter((value) => value.name == 'status'); 
        if (result[0].value == 'publish') {  
            html = '<div class="t-grid-label" name="' + result[0].name + '" cvalue="' + result[0].value + '"><span style="text-align:center;width:90%;position:absolute">  <div class="input-switch"><input type="checkbox" id="switchy" class="input" checked /><label for="switchy" class="switch"></label></div></span></div>';
        } else {
            html = '<div class="t-grid-label" name="' + result[0].name + '" cvalue="' + result[0].value + '"><span style="text-align:center;width:90%;position:absolute"><div class="input-switch"><input type="checkbox" id="switchy" class="input"/><label for="switchy" class="switch"></label></div></span></div>';
        }
    
    return html;}}];
