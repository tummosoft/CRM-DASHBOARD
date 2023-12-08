(function ($) {
    $.fn.tummoListview = function (options) {
        var settings = $.extend({
            rows: null,
            editEnable: false,
            rowclick: null,
            checkbox: false
        }, options);

        var lastEdited;
        var res = settings.rows;        
        //const res = StringToObject(arr);

        var itemrow = '';
        for (var i = 0; i < res.length; i++) {
            var item = res[i];
            if (item.id !== '-') {
                if (settings.checkbox){
                    itemrow += '<li class="list-item" id="' + item.id + '" data="' + item.value + '"><input type="checkbox"><span class="has-checkbox" style="color:' + item.iconcolor + '">' + item.icon + '</span> ' + item.text + '</li>';
                } else {
                    var icon = '';
                    if (item.icon !== '') {
                        icon = '<span class="has-icon" style="color:' + item.iconcolor + '">' + item.icon + '</span>';
                    }
                    itemrow += '<li class="list-item" id="' + item.id + '" data="' + item.value + '">' + icon + item.text + '</li>';
                }                       
            } else {
                itemrow += '<li class="line-item"></li>';
            }
        }
        var listview = '<ul id=' + randomID() + ' class="tm-listview-items">' + itemrow + '</ul>';
        $(this).addClass('tm-listview').append(listview);

        $(".tm-listview-items li").click(function (e) {

            var parentID = $(e.target).parent().attr('id');
            $('#' + parentID + ' li').each(function (i, obj) {
                $(obj).removeClass('active');
                $(this, 'li').removeClass('active');

            });
            $(e.target).addClass('active');            
            var _iclick = { id: e.target.id};
            listfolder(_iclick);
        });

        if (settings.editEnable) {
            $(".tm-listview-items li").dblclick(function (e) {
                var parentID = $(e.target).parent().attr('id');
                $('#' + parentID + ' li').each(function (i, obj) {
                    $(obj).attr('contenteditable', false);
                });
                $(e.target).attr('contenteditable', true);
                lastEdited = e.target;
            });

            // Closed edit content
            $(".tm-listview-items").click(function (e) {
                $(lastEdited).attr('contenteditable', false);
            });
        }

        return this;
    }
})(jQuery);