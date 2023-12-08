// ------------------------------------------
// TAB
(function($) {
    $.fn.tummoTab = function (options) {
        var settings = $.extend({            
            active: 0,
            width: 100,
            height: 100,
            data: null
        }, options);

        var id = randomID();
        var header = '<div id="' + id + '" class="tab-box"><div class="tab-nav-wrapper"><ul id="' + id + '_header" class="tab-nav">';
        
        var currentTab;
        var tabcontent;
        var maxitem = settings.data.length - 1;
            
        for (var i = 0; i < settings.data.length; i++) {
            var html = settings.data[i].html;
            var url = settings.data[i].url;
           
            if (settings.data[i].default == true) {
                header += '<li id="' + id + '_' + i + '_headeritem" tabindex="' + i +'" class="tab-nav-item"><div id="' + id + '_' + i + '_tabselect" class="tab-tit tab-active">' +  settings.data[i].text + '</div><div id="' + id + '_' + i + '_close" class="tab-btn-close"></div></li>';
                if (html != undefined) {
                    tabcontent += ' <div id="' + id + '_' + i + '_content" class="tab-text" contenteditable="true">' + html + '</div>';
                } else if (url != undefined) {
                    tabcontent += ' <div id="' + id + '_' + i + '_content" class="tab-text" contenteditable="true"> <iframe id="' + id + '_' + i + '_iframe" src="' + url + '"></iframe></div>';
                } else {
                    tabcontent += ' <div id="' + id + '_' + i + '_content" class="tab-text" contenteditable="true"></div>';
                }
                
            } else {
                header += '<li id="' + id + '_' + i + '_headeritem" tabindex="' + i +'" class="tab-nav-item"><div id="' + id + '_' + i + '_tabselect" class="tab-tit">' +  settings.data[i].text + '</div><div id="' + id + '_' + i + '_close" class="tab-btn-close"></div></li>';
                if (settings.data[i].html != '') {
                    tabcontent += ' <div id="' + id + '_' + i + '_content" class="tab-text tab-hide" contenteditable="true">' + html + '</div>';
                } else if (url != '') {
                    tabcontent += ' <div id="' + id + '_' + i + '_content" class="tab-text" contenteditable="true"> <iframe id="' + id + '_' + i + '_iframe" src="' + url + '"></iframe></div>';
                } else {
                    tabcontent += ' <div id="' + id + '_' + i + '_content" class="tab-text" contenteditable="true"></div>';
                }
               
            }
            
        }

        header += '</ul></div><div id="' + id + '_content_parent" class="tab-content">' + tabcontent;                                         
        header += '</div></div>';
        var css1 = '.tab-box {width: ' + settings.width + 'px;height:' + settings.height + 'px;}';
        var _h = parseInt(settings.height) - 50;
        var css = '.tab-content {height: ' + _h + 'px;border-left: 3px solid #516AF0;border-right: 3px solid #516AF0;border-bottom: 1px solid #516AF0;}';
        
        if (settings.tabborder == true) {
            document.querySelector('head').innerHTML += "<style>" + css + css1 + "</style>";
        }
        
        $(this).append(header);

        $('.tab-tit').click(function (e) {                        
            var rootID = $(this).parent().attr('id');
            currentTab = $(this).parent().attr('tabIndex');
            var tab = {tabindex:currentTab,id:rootID};

            settings.tabclick(tab);

            var parentID = $(this).parent().parent().attr('id');
            $('#' + parentID).find('li').each(function () {
                if ($(this).find('div').hasClass('tab-active')) {
                    $(this).find('div').removeClass('tab-active');  
                    var contentID = parentID.replace('_header','_content_parent');
                    var boydyID = rootID.replace('_headeritem','_content');                    
                    var div = $('#' + contentID);                    
                    $(div).find('div').each(function () {                        
                        $(div).find('div').addClass('tab-hide');
                    });
                   
                  $('#' + boydyID).removeClass('tab-hide');
                   
                }
                
            });
               
            $(this).removeClass('tab-active');          
            $(this).addClass('tab-active').siblings().removeClass('tab-active');
        });

        function changeStatus() {

        }

        $('.tab-btn-close').click(function () {
            var currentID = $(this).parent().attr('id');            
            var tabContentID = currentID.replace('_headeritem','_content');
            var arr = currentID.split('_');
            $('#' + arr).find('#' + tabContentID).remove();
            $('#' + arr).find('#' + currentID).remove();            
        });

        var addtabclick = function addtabclick(e) {
            var id = e.target.id;
            var tabindex = $('#' + id).parent().attr('tabindex');
           
            for (var i = 0; i <= maxitem; i++) {    
                var allid = id.replace(tabindex, i);
                var ele = document.getElementById(allid);
                ele.classList.remove('tab-active');
                var contentID =  allid.replace('tabselect','content');               
                $('#' + contentID).hide();                
            }

            var ele = document.getElementById(id);
            ele.classList.add('tab-active');
            var contentID =  id.replace('tabselect','content');
            $('#' + contentID).show();                    
            
        }

        const closeTab = function(id) {
            
        }
        const deleteTab = function(id) {
            
        }
        this.addTab = function addTab(tab) {  
            maxitem = maxitem + 1;      
            var currentID = $(this).find('.tab-box').attr('id');
            var tid = currentID + '_' + maxitem + '_tabselect';
            settings.data.push(tab);           
            var  header = '<li id="' + currentID + '_' + maxitem + '_headeritem" tabindex="' + maxitem +'" class="tab-nav-item"><div id="' + tid + '" onclick="addtabclick(' +  tid +')" class="tab-tit">' +  tab.text + '</div><div id="' + currentID + '_' + maxitem + '_close" class="tab-btn-close"></div></li>';   
            var content = '<div id="' + currentID + '_' + maxitem + '_content" class="tab-text tab-hide" contenteditable="true"></div>';

            $(this).find('#' + currentID + '_header').append(header).on(function(){                
                $(this).find('#' + currentID + '_content_parent').append(content);               
            }) 
            
            const el = document.getElementById(currentID + '_' + maxitem + '_tabselect');
            window.addEventListener("click", addtabclick, false);
        };

        return this;
    }
})(jQuery);