
(function ($) {
    $.fn.tummoButtonUpload = function (options) {
        var settings = $.extend({
            server: null,
            icon: null,
            text: null,
            style: null,
            multiple: false,
            event: null,
            socketEvent: null,
            parameter: null,
        })(options);

        var config = settings[0];
        var thisID = $(this).attr('id');
        var ele = document.getElementById(thisID);
        if (config.style == 'yellow') {
            $(this).addClass('tummo-btn-v2 btn-yellow-v2');
        }
        var icon = '';
        if (config.icon != null) {
            icon = '<span id="staticion" class="btn-icon">' + config.icon + '</span><span id="animationicon" class="svg-loading"></span>';
            $(this).append(icon);
            
        }

        $(this).append('<span>' + config.text + '</span>');

        var html = '<form id="uploadform" enctype="multipart/form-data"><div id="' + thisID + '"></div><input id="files" style="display: none;" type="file" multiple></input><div id="btnupload" style="display:none" type="submit">Upload</div></form><span id="filelist"></span>';
        $(this).after(html);

        const inputFile = document.getElementById("files");
        inputFile.addEventListener("change", (event) => {
            const selectedFiles = event.target.files;
            if (selectedFiles.length > 0) {
                    Upload();
            }
        });

        this.setURL = function setURL(url) {
            config.server = url;
        }

        
        const form = document.getElementById("uploadform");

        async function Upload() {
            $('#staticion').hide();
            $('#animationicon').show();
            const formData = new FormData();   
            let lstFile = [];         
            for (const file of inputFile.files) {
                formData.append("files", file);
                lstFile.push(file.name);
            }
            $('#filelist').html(lstFile.join(', '));
            const url = config.server;

                const response = await fetch(url, {
                    method: "post",
                    body: formData,
                } );
                const uploadresult = await response.status;

                if (uploadresult == 200) {
                    $('#staticion').show();
                    $('#animationicon').hide();
                    if (config.event !== null) {
                        config.event(true);
                    }
                } else {
                    if (config.event !== null) {
                        config.event(false);
                    }
                }
                
        }
        

        document.getElementById(thisID).onclick = function () {
            document.getElementById("files").click();
              

        }
        

        return this;
    }



})(jQuery);