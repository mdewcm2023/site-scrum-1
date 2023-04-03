var tipuesearch = {"pages": [{'title': 'About', 'text': 'https://github.com/mdewcm2023/site-scrum-1   \n https://mdewcm2023.github.io/site-scrum-1', 'tags': '', 'url': 'About.html'}, {'title': 'Upload_image', 'text': 'using  pica javascript library  to resize the image integrated with Brython before sending to Flask \n from browser import document, window, ajax\n \ndef on_complete(req):\n    if req.status == 200 or req.status == 0:\n        print("File uploaded successfully")\n    else:\n        print("Error uploading file")\n \ndef upload_file(file):\n    req = ajax.ajax()\n    req.bind("complete", on_complete)\n    req.open("POST", "/upload", True)\n    req.set_header("Content-Type", "application/octet-stream")\n    req.send(file)\n \ndef resize_image(file):\n    pica = window.pica\n    img = document.createElement("img")\n    img.src = window.URL.createObjectURL(file)\n    canvas = document.createElement("canvas")\n    max_size = 800\n    if img.width > max_size or img.height > max_size:\n        if img.width > img.height:\n            canvas.width = max_size\n            canvas.height = max_size * img.height / img.width\n        else:\n            canvas.height = max_size\n            canvas.width = max_size * img.width / img.height\n    else:\n        canvas.width = img.width\n        canvas.height = img.height\n \n    def on_resize(result):\n        resized_image_data = result.toDataURL("image/jpeg").split(",")[1]\n        upload_file(resized_image_data)\n \n    pica.resize(img, canvas).then(on_resize)\n \ndef handle_files(event):\n    file = event.target.files[0]\n    resize_image(file)\n \ninput = document.createElement("input")\ninput.type = "file"\ninput.accept = "image/*"\ninput.capture = "camera"\ninput.bind("change", handle_files)\ndocument <= input \n', 'tags': '', 'url': 'Upload_image.html'}, {'title': 'resize', 'text': 'try to resize image before upload \n Blog (nicobadia-com.translate.goog) \n /*!\n * jQuery AXuploader\n * Alban Xhaferllari\n * albanx@gmail.com\n * Copyright 2010, AUTHORS.txt (http://www.albanx.com)\n * Dual licensed under the MIT or GPL Version 2 licenses.\n * http://jquery.org/license\n *\n * \n */\n// 2013.08.21 Yen modified Chrome file append error\n\n(function($)\n{\n\tvar methods =\n\t{\n\t\tinit : function(options)\n\t\t{\n\n    \t    return this.each(function() \n    \t    {\n    \t        var settings = {\n        \t      \'remotePath\' : \'js/\',\n        \t      \'url\':\'phplibs/uploadfiles.php\',\n        \t      \'data\':\'\',\n        \t      \'async\':true,\n        \t      \'maxFiles\':9999,\n        \t      \'allowExt\':[\'all\'],\n        \t      \'showSize\':\'Mb\',\n        \t      \'success\':function(respTxt,fileName) {},\n        \t      \'finish\':function(respTxt,filesName) {},\n        \t      \'error\':function(e){},\n        \t      \'GIFprogress\':\'\',\n        \t      \'enable\':true,\n        \t      \'chunkSize\':1024*1024//default 1Mb\n    \t        };\n\n\t\t\t\tvar _this=this;\n\t\t\t\tif(options)\t$.extend(settings,options);\n\t\t\t\tvar allowExt=settings.allowExt.join(\'|\').toLowerCase();\n\n/*================================================================================*\\\n\t\t\t\t Test if support pure ajax upload\n\t\t\t\t\\*================================================================================*/\n\t\t\t\tvar _browse = document.createElement(\'input\');\n\t\t\t\t_browse.type = \'file\'; \n\t\t\t\t_browse.name=\'ax-files[]\';\n\t\t\t    var isAjaxUpload=(\'multiple\' in _browse &&  typeof File != "undefined" &&  typeof (new XMLHttpRequest()).upload != "undefined" );\n\t\t\t   // isAjaxUpload=false;\n\n\t\t\t\t/*================================================================================*\\\n\t\t\t\t helper variables\n\t\t\t\t\\*================================================================================*/\n\t\t\t    var fileCount=0;//Number of selected files\n\t\t\t    var totalFiles=0;\n\n\t\t\t\t/*================================================================================*\\\n\t\t\t\t Form for classic upload\n\t\t\t\t\\*================================================================================*/\n\t\t\t    var onLoadIframe=false;\n\t\t\t    var mainFrame=$(\'<iframe src="javascript:false;" name="ax-main-frame" />\').hide().appendTo(_this).load(function(){\n\t\t\t    \tif(onLoadIframe)\n\t\t\t    \t{\n\t\t\t    \t\tfileCount=1;\n\t\t\t    \t\t$(_this).find(\'.ax-progress-div\').html(\'100%\');\n\t\t\t    \t\tonFinish(this.contentWindow.document.body.innerHTML,\'\',$(_this).find(\'.ax-upload\'));\n\t\t\t    \t}\n\t\t\t\t});\n\n\t\t\t    var mainForm=$(\'<form target="ax-main-frame" method="POST" action="" encType="multipart/form-data" />\').appendTo(_this);\n\n\n\t\t\t\t/*================================================================================*\\\n\t\t\t\t Browse input used for selecting files to upload. Cloned for normal upload\n\t\t\t\t\\*================================================================================*/\n\n\n\t\t\t    var browse=$(_browse).attr(\'multiple\',isAjaxUpload).appendTo(mainForm).bind(\'change\',function(){\n\t\t\t\t\tif(isAjaxUpload)\n\t\t\t\t\t{\n\t\t\t\t\t\tfor (var i = 0; i < this.files.length; i++) \n\t\t\t\t\t\t{\n\t\t\t\t\t\t\tif(fileCount<=settings.maxFiles)\n\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\tadd_file(fileList,this.files[i],this.files[i].name,this.files[i].size,fileCount);\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\telse\n\t\t\t\t\t{\n\t\t\t\t\t\tif(fileCount<=settings.maxFiles)\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\tadd_file(fileList,this,this.value.replace(/^.*\\\\/, \'\'),0,fileCount);\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t});\n\n\t\t\t\t/*================================================================================*\\\n\t\t\t\tUpload All files button that upload files at once on click\n\t\t\t\t\\*================================================================================*/\n\t\t\t\tvar uploadAll=$(\'<input style="margin-left:5px;" type="button" value="Upload all" class="ax-uploadall" />\').attr(\'disabled\',true).appendTo(mainForm).bind(\'click\',function(){\n\t\t\t\t\tif(isAjaxUpload)\n\t\t\t\t\t{\n\t\t\t\t\t\t$(_this).find(\'.ax-upload:not(:disabled)\').click();\n\t\t\t\t\t}\n\t\t\t\t\telse\n\t\t\t\t\t{\n\t\t\t\t\t\tonLoadIframe=true;\n\t\t\t\t\t\tvar finalUrl=get_final_url(\'\');\n\t\t\t\t\t\tmainForm.attr(\'action\',finalUrl).submit();\n\n\t\t\t\t\t\t$(_this).find(\'.ax-upload\').attr(\'disabled\',true);\n\t\t\t\t\t\tif(settings.GIFprogress!=\'\')\n\t\t\t\t\t\t\t$(_this).find(\'.ax-progress-div\').html(\'<img src="\'+settings.GIFprogress+\'" alt="uploading..." />\');\n\t\t\t\t\t\telse\n\t\t\t\t\t\t\t$(_this).find(\'.ax-progress-div\').html(\'Uploading...\');\n\t\t\t\t\t}\n\t\t\t\t});\n\n\t\t\t\t/*================================================================================*\\\n\t\t\t\tClear buttons that resets file list and variables\n\t\t\t\t\\*================================================================================*/\n\t\t\t\tvar clear=$(\'<input style="margin-left:5px;" type="button" value="Clear" class="ax-clear" />\').appendTo(mainForm).bind(\'click\',function(){\n\t\t\t\t\tfileCount=0;\n\t\t\t\t\ttotalFiles=0;\n\t\t\t\t\tuploadAll.attr(\'disabled\',fileCount==0);\n\t\t\t\t\tfileList.children(\'tbody\').remove();\n\t\t\t\t});\n\n\n\t\t\t\t/*================================================================================*\\\n\t\t\t\tTable with the list of files and their details\n\t\t\t\t\\*================================================================================*/\n\t\t\t    var fileList=$(\'<table class="ax-file-list" />\').append(\'<thead><tr>\'+\n\t\t\t\t\t\t\t\t\t\t\t\t\t \t\'<th>File</th>\'+\n\t\t\t\t\t\t\t\t\t\t\t\t\t \t\'<th>Size</th>\'+\n\t\t\t\t\t\t\t\t\t\t\t\t\t \t\'<th>Progress</th>\'+\n\t\t\t\t\t\t\t\t\t\t\t\t\t \t\'<th>Remove</th>\'+\n\t\t\t\t\t\t\t\t\t\t\t\t\t \t\'<th>Upload</th>\'+\n\t\t\t\t\t\t\t\t\t\t\t\t\t \'</tr></thead>\').appendTo(mainForm);\n\n\n\t\t\t\t/*================================================================================*\\\n\t\t\t\tFunctions that sets the url for sending additional data\n\t\t\t\t\\*================================================================================*/\n\t\t\t    function get_final_url(enc_name)\n\t\t\t    {\n\t\t\t\t\t/*================================================================================*\\\n\t\t\t\t\t Encode remote path and calculate it if given as function\n\t\t\t\t\t\\*================================================================================*/\n\t\t\t\t\tsettings.remotePath=(typeof(settings.remotePath)==\'function\')?settings.remotePath():settings.remotePath;\n\n\t\t\t\t\t/*================================================================================*\\\n\t\t\t\t\t set other URL data\n\t\t\t\t\t\\*================================================================================*/\n\n\t\t\t\t\tvar c=(settings.url.indexOf(\'?\')==-1)?\'?\':\'&\';\n\t\t\t\t\tvar url=settings.url+c+\'ax-file-path=\'+encodeURIComponent(settings.remotePath)+\'&ax-allow-ext=\'+encodeURIComponent(allowExt);\n\n\t\t\t\t\tsettings.data=(typeof(settings.data)==\'function\')?settings.data():settings.data;\n\t\t\t\t\treturn url+\'&ax-file-name=\'+enc_name+\'&\'+settings.data;//final url with other data\n\t\t\t    }\n\n\t\t\t\t/*================================================================================*\\\n\t\t\t\tFunctions that executes and the end of file uploading\n\t\t\t\t\\*================================================================================*/\n\t\t\t    function onFinish(txt,currF,up,ab)\n\t\t\t    {\n\t\t\t\t\tfileCount--;//count upload files\n\n\t\t\t\t\tup.attr(\'disabled\',false);\n\t\t\t\t\tsettings.success(txt,currF);\n\t\t\t\t\tif(fileCount==0)\n\t\t\t\t\t{\n\t\t\t\t\t\tvar filesArr=new Array();\n\t\t\t\t\t\t$(_this).find(\'.ax-file-name\').each(function(){\n\t\t\t\t\t\t\tfilesArr.push($(this).attr(\'title\'));\n\t\t\t\t\t\t});\n\t\t\t\t\t\tfileCount=totalFiles;\n\t\t\t\t\t\tsettings.finish(txt,filesArr);\n\t\t\t\t\t\tuploadAll.attr(\'disabled\',false);\n\t\t\t\t\t}\n\t\t\t    }\n\n\t\t\t\t/*================================================================================*\\\n\t\t\t\tFunctions creates file form and xmlhttprequest for upload\n\t\t\t\t\\*================================================================================*/\n\t\t\t\tfunction add_file(t,o,n,s,numF)\n\t\t\t\t{\n\t\t\t\t\tvar ext=n.split(\'.\').pop().toLowerCase();//file ext\n\n\t\t\t\t\t/*================================================================================*\\\n\t\t\t\t\tFile extension control\n\t\t\t\t\t\\*================================================================================*/\n\t\t\t\t\tif(allowExt.indexOf(ext)<0 && allowExt!=\'all\')\treturn;\n\n\t\t\t\t\t/*================================================================================*\\\n\t\t\t\t\tDisplay file size in MB o Kb settings\n\t\t\t\t\t\\*================================================================================*/\n\t\t\t\t\tswitch(settings.showSize.toLowerCase())\n\t\t\t\t\t{\n\t\t\t\t\t\tcase \'mb\':s=s/(1024*1024);break;\n\t\t\t\t\t\tcase \'kb\':s=s/1024;break;\n\t\t\t\t\t}\n\t\t\t\t\ts=(Math.round(s*100)/100)+\' \'+settings.showSize;\n\n\n\t\t\t\t\tfileCount++;//update file number\n\t\t\t\t\ttotalFiles++;\n\n\t\t\t\t\tuploadAll.attr(\'disabled\',fileCount==0);\n\t\t\t\t\t//remove button action bind\n\t\t\t\t\tvar rm=$(\'<input type="button" value="Remove" />\').bind(\'click\',function(){\n\t\t\t\t\t\tfileCount--;\n\t\t\t\t\t\ttotalFiles--;\n\t\t\t\t\t\tuploadAll.attr(\'disabled\',fileCount==0);\n\t\t\t\t\t\t$(this).parents(\'tr:first\').remove();\n\t\t\t\t\t});\n\n\t\t\t\t\t//prepare abort and upload button\n\t\t\t\t\tvar up=$(\'<input type="button" value="Upload" class="ax-upload" />\').bind(\'click\',function(){ this.disabled=true; });\n\n\t\t\t\t\tvar tr=$(\'<tr />\').appendTo(t);\n\t\t\t\t\tvar td_n=$(\'<td class="ax-file-name" title="\'+n+\'" />\').appendTo(tr).html(n);\n\t\t\t\t\tvar td_s=$(\'<td class="ax-size-td" />\').appendTo(tr).html(s);\n\t\t\t\t\tvar td_p=$(\'<td class="ax-progress-td" />\').appendTo(tr);\n\t\t\t\t\tvar div_p=$(\'<div  class="ax-progress-div" />\').css({\'width\':\'0%\',\'background-color\':\'red\'}).html(0).appendTo(td_p);\n\t\t\t\t\tvar td_r=$(\'<td class="ax-remove-td" />\').appendTo(tr).append(rm);\n\t\t\t\t\tvar td_u=$(\'<td class="ax-upload-td" />\').appendTo(tr).append(up);\n\n\t\t\t\t\t/*================================================================================*\\\n\t\t\t\t\t Prepare to send\n\t\t\t\t\t\\*================================================================================*/\n\t\t\t\t\tvar enc_name=encodeURIComponent(n);//encode file name\n\n\t\t\t\t\tif(!isAjaxUpload)\n\t\t\t\t\t{\n\t\t\t\t\t\tvar file_holder=$(\'<div />\').appendTo(td_n).hide().append(o);\t\t\t\t\t\t\n\t\t\t\t\t\tup.bind(\'click\',function(){\n\t\t\t\t\t\t\t/*================================================================================*\\\n\t\t\t\t\t\t\t Target Iframe for async upload with iframes\n\t\t\t\t\t\t\t\\*================================================================================*/\n\t\t\t\t\t\t\tvar targetFrame=$(\'<iframe src="javascript:false;" name="ax-frame-\'+numF+\'" />\').hide().appendTo(td_n).load(function(){\n\t\t\t\t\t\t\t\tif($(this).attr(\'load\')==\'1\')\n\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\tdiv_p.html(\'Finish\');\n\t\t\t\t\t\t\t\t\tonFinish(this.contentWindow.document.body.innerHTML,n,up);\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}).attr(\'load\',\'0\');\n\t\t\t\t\t\t\tdiv_p.html(\'Uploading...\');\n\t\t\t\t\t\t\ttargetFrame.attr(\'load\',\'1\');\n\n\t\t\t\t\t\t\tvar finalUrl=get_final_url(enc_name);\n\n\t\t\t\t\t\t\t$(\'<form method="POST" action="\'+finalUrl+\'" encType="multipart/form-data" />\').attr(\'target\',\'ax-frame-\'+numF).appendTo(td_n).hide().append(o).submit();\n\t\t\t\t\t\t});\n\n\t\t\t\t\t\t//clone browse file and append it to main form for selecting other files\n\t\t\t\t\t\t$(o).clone(true).val(\'\').prependTo(mainForm);\n\t\t\t\t\t}\n\t\t\t\t\telse\n\t\t\t\t\t{\n\t\t\t\t\t\t/*================================================================================*\\\n\t\t\t\t\t\t bind actions to buttons\n\t\t\t\t\t\t\\*================================================================================*/\n\t\t\t\t\t\tup.bind(\'click\',function(){\n\t\t\t\t\t\t\tuploadFileXhr(o,0,$(this),div_p);\n\t\t\t\t\t\t});\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\t//recrusive file upload with chunk method\n\t\t\t\tfunction uploadFileXhr(o,start_byte,up,div_p)\n\t\t\t\t{\n\t\t\t\t\tvar totals=o.size;\n\t\t\t\t\tvar chunk;\t\n\t\t\t\t\tvar peice=settings.chunkSize;//bytes to upload at once\n\n\t\t\t\t\tvar end_byte=start_byte+peice;\n\t\t\t\t\tvar peice_count=end_byte/peice;\n\t\t\t\t\tvar is_last=(totals-end_byte<=0)?1:0;\n\n\t\t\t\t\t/*===============================================================*\\\n\t\t\t\t\t * Detect support slice method\n\t\t\t\t\t * if slice is not supported then send all file at once\n\t\t\t\t\t\\*==============================================================*/\n\n//Initialize a new FileReader object\nvar reader = new FileReader();\n\n//Slice the file into the desired chunk\nvar chunk = o.slice(start_byte, end_byte);\nreader.readAsBinaryString(chunk);\n\n/*================================================================================*\\\n\t\t\t\t\t Prepare xmlhttpreq object for file upload Bind functions and progress\n\t\t\t\t\t\\*================================================================================*/\n\t\t\t\t\tvar xhr = new XMLHttpRequest();//prepare xhr for upload\n\n\t\t\t\t\txhr.onreadystatechange=function()\n\t\t\t\t\t{\n\t\t\t\t\t\tif(this.readyState == 4 && this.status == 200)\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\tif(is_last==0)\n\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\tuploadFileXhr(o,end_byte,up,div_p);\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\telse\n\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\tonFinish(xhr.responseText,o.name,up);\n\t\t\t\t\t\t\t\tdiv_p.html(\'100%\').css(\'width\',\'100%\');\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t};\n\t\t\t\t\txhr.upload.onprogress=function(e)\n\t\t\t\t\t{\n\t\t\t\t\t\tif (e.lengthComputable) \n\t\t\t\t\t\t{\n\t\t\t\t\t\t\tvar perc = Math.round((e.loaded+peice_count*peice-peice)*100/totals);\n\t\t\t\t\t\t\tdiv_p.html(perc+\'%\').css(\'width\',perc+\'%\');\n\t\t\t\t\t\t}\n\t\t\t\t\t};\n\n\t\t\t\t\txhr.upload.onerror=settings.error(xhr.responseText,o.name);\n\t\t\t\t\tvar finalUrl=get_final_url(encodeURIComponent(o.name));\n\t\t\t\t\txhr.open(\'POST\',finalUrl+\'&start=\'+start_byte,settings.async);//url + async/sync\n\t\t\t\t\txhr.setRequestHeader(\'Cache-Control\', \'no-cache\');\n\t\t\t\t\txhr.setRequestHeader(\'X-Requested-With\', \'XMLHttpRequest\');//header\n                    // have to use json utf-8 charset\n                    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");\n\t\t\t\t\txhr.send(chunk);//send request of file \n\t\t\t\t}\n\n\t\t\t\t/*=======================================================\n\t\t\t\t * Disable option\n\t\t\t\t *======================================================*/\n\t    \t    if(!settings.enable)\n\t    \t    \t$(this).find(\'input:not(:disabled), button:not(:disabled)\').addClass(\'ax-disabled\').attr(\'disabled\',true);\n\n    \t    });\n\t\t},\n\t\tenable:function()\n\t\t{\n\t\t\treturn this.each(function()\n\t\t\t{\n\t\t\t\t$(this).find(\'.ax-disabled\').attr(\'disabled\',false).removeClass(\'ax-disabled\');\n\t\t\t});\n\t\t},\n\t\tdisable:function()\n\t\t{\n\t\t\treturn this.each(function()\n\t\t\t{\n\t\t\t\t$(this).find(\'input:not(:disabled), button:not(:disabled)\').addClass(\'ax-disabled\').attr(\'disabled\',true);\n\t\t\t});\n\t\t},\n\t\tstart:function()\n\t\t{\n\t\t\t$(this).find(\'.ax-uploadall:not(:disabled)\').click();\n\t\t},\n\t\tclear:function()\n\t\t{\n\t\t\t(this).find(\'.ax-clear:not(:disabled)\').click();\n\t\t},\n\t\tdestroy : function()\n\t\t{\n\t\t\treturn this.each(function()\n\t\t\t{\n\t\t\t\tvar $this = $(this);\n\t\t\t\t$this.removeData(\'settings\');\n\t\t\t\t$this.html(\'\');\n\t\t\t});\n\t\t}\n\t};\n\n\t$.fn.axuploader = function(method, options)\n\t{\n\t\tif(methods[method])\n\t\t{\n\t\t\treturn methods[method].apply(this, Array.prototype.slice.call(arguments, 1));\n\t\t}\n\t\telse if(typeof method === \'object\' || !method)\n\t\t{\n\t\t\treturn methods.init.apply(this, arguments);\n\t\t}\n\t\telse\n\t\t{\n\t\t\t$.error(\'Method \' + method + \' does not exist on jQuery.axuploader\');\n\t\t}\n\t};\n\n})(jQuery);\n \n \n', 'tags': '', 'url': 'resize.html'}, {'title': 'Brython_Flask', 'text': 'Flask form \n from flask import Flask, render_template, request\nimport json\n\napp = Flask(__name__)\n\n@app.route("/")\ndef index():\n    return render_template("index.html")\n\n@app.route("/upload", methods=["POST"])\ndef upload():\n    data = json.loads(request.form["data"])\n    filename = data["filename"]\n    image_data = data["data"]\n    # Save the resized image to the server here\n    # ...\n    return "File uploaded successfully!"\n\nif __name__ == "__main__":\n    app.run() \n index.html \n <!DOCTYPE html>\n<html>\n  <head>\n    <script type="text/javascript" src="./../cmsimde/static/brython.js"></script>\n    <script type="text/javascript" src="./../cmsimde/static/brython_stdlib.js"></script>\n  </head>\n  <body onload="brython()">\n    <input type="file" id="file-upload" accept="image/*" capture="camera">\n    <button id="upload-btn">Upload</button>\n    <script type="text/python" src="./../cmsimde/static/upload.py"></script>\n  </body>\n</html> \n Brython side \n from browser import document, ajax\nimport json\n\ndef on_complete(req):\n    if req.status == 200 or req.status == 0:\n        alert("File uploaded successfully!")\n    else:\n        alert("Error uploading file")\n\ndef upload_file(evt):\n    file = document["file-upload"].files[0]\n    # Use pica.js to resize the image here\n    # ...\n    data = {\n        "filename": file.name,\n        "data": resized_image_data\n    }\n    req = ajax.ajax()\n    req.bind("complete", on_complete)\n    req.open("POST", "/upload", True)\n    req.set_header("content-type", "application/x-www-form-urlencoded")\n    req.send({"data": json.dumps(data)})\n\ndocument["upload-btn"].bind("click", upload_file) \n Complete Brython side \n <!DOCTYPE html>\n<html>\n  <head>\n    <script type="text/javascript" src="./../cmsimde/static/brython.js"></script>\n    <script type="text/javascript" src="./../cmsimde/static/brython_stdlib.js"></script>\n    <script type="text/javascript" src="./../cmsimde/static/pica.min.js"></script>\n  </head>\n  <body onload="brython()">\n    <input type="file" id="file-upload" accept="image/*">\n    <button id="upload-btn">Upload</button>\n    <img id="preview">\n    <script type="text/python" src="./../cmsimde/static/upload.py"></script>\n  </body>\n</html> \n Brython side \n from browser import document, window, ajax\nfrom javascript import JSConstructor\nimport json\n\npica = JSConstructor(window.pica)\n\ndef on_complete(req):\n    if req.status == 200 or req.status == 0:\n        alert("File uploaded successfully!")\n    else:\n        alert("Error uploading file")\n\ndef resize_image(file):\n    # Create a canvas element to draw the image on\n    canvas = document.createElement("canvas")\n    canvas.width = 300\n    canvas.height = 300\n    ctx = canvas.getContext("2d")\n\n    # Create an image element to hold the uploaded file\n    img = document.createElement("img")\n\n    def on_image_load(evt):\n        # Draw the uploaded image onto the canvas\n        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)\n\n        # Use pica to resize the image\n        pica.resize(img, canvas).then(lambda result: pica.toBlob(result).then(send_data))\n\n    img.bind("load", on_image_load)\n    img.src = window.URL.createObjectURL(file)\n\ndef send_data(blob):\n    # Convert the blob to a data URL and set it as the src of the preview image\n    reader = window.FileReader.new()\n    reader.readAsDataURL(blob)\n    reader.bind("loadend", lambda evt: (document["preview"].src = reader.result))\n\ndef upload_file(evt):\n    file = document["file-upload"].files[0]\n    resize_image(file)\n\ndocument["upload-btn"].bind("click", upload_file) \n Flask side to save uploaded file \n from flask import Flask, request\nimport os\nfrom werkzeug.utils import secure_filename\n\napp = Flask(__name__)\napp.config["UPLOAD_FOLDER"] = "/path/to/upload/folder"\n\n@app.route("/upload", methods=["POST"])\ndef upload():\n    file = request.files["file"]\n    filename = secure_filename(file.filename)\n    file.save(os.path.join(app.config["UPLOAD_FOLDER"], filename))\n    return "File uploaded successfully!"\n\nif __name__ == "__main__":\n    app.run() \n \n bit by bit upload with Brython \n IT is possible to upload an image file in chunks using Brython and pica. Use the File.slice method to split the file into smaller chunks and send each chunk to the server separately. Here is an example of how to do this: \n from browser import document, ajax\nfrom javascript import JSObject\n\nCHUNK_SIZE = 1024 * 1024  # 1MB\n\ndef on_complete(req):\n    if req.status == 200 or req.status == 0:\n        print("Chunk uploaded successfully")\n    else:\n        print("Error uploading chunk")\n\ndef upload_file(evt):\n    file = document["file-upload"].files[0]\n    # Use pica.js to resize the image here\n    # ...\n    start = 0\n    end = CHUNK_SIZE\n    while start < file.size:\n        chunk = file.slice(start, end)\n        req = ajax.ajax()\n        req.bind("complete", on_complete)\n        req.open("POST", "/upload", True)\n        req.set_header("content-type", "application/octet-stream")\n        req.set_header("content-disposition", f"attachment; filename={file.name}")\n        req.set_header("chunk-number", str(start // CHUNK_SIZE))\n        req.set_header("chunk-size", str(CHUNK_SIZE))\n        req.set_header("total-size", str(file.size))\n        req.send(JSObject(chunk))\n        start = end\n        end += CHUNK_SIZE\n\ndocument["upload-btn"].bind("click", upload_file) \n In this example, the File.slice method to split the resized image file into chunks of size CHUNK_SIZE. Each chunk send to the server separately using an XMLHttpRequest object. Several custom headers are set on the request to provide the server with information about the chunk being uploaded. The content-disposition header specifies the filename of the uploaded file. The chunk-number header specifies the index of the current chunk. The chunk-size header specifies the size of each chunk. And the total-size header specifies the total size of the uploaded file. On the server-side, we need to implement logic to handle the incoming chunks and reassemble them into a complete file. We can use the custom headers sent with each request to determine which chunk is being uploaded and how to reassemble the complete file. \n bit by bit Flask side \n from flask import Flask, request\nimport os\n\napp = Flask(__name__)\napp.config["UPLOAD_FOLDER"] = "/path/to/upload/folder"\n\n@app.route("/upload", methods=["POST"])\ndef upload():\n    filename = request.headers["content-disposition"].split("filename=")[1]\n    chunk_number = int(request.headers["chunk-number"])\n    chunk_size = int(request.headers["chunk-size"])\n    total_size = int(request.headers["total-size"])\n    file_data = request.data\n\n    with open(os.path.join(app.config["UPLOAD_FOLDER"], filename), "ab") as f:\n        f.seek(chunk_number * chunk_size)\n        f.write(file_data)\n\n    return "Chunk uploaded successfully!"\n\nif __name__ == "__main__":\n    app.run() \n In this example, we use Flask’s request object to access the uploaded chunk and the custom headers sent with the request. We use the content-disposition header to determine the filename of the uploaded file. We use the chunk-number, chunk-size, and total-size headers to determine the index, size, and total size of the uploaded chunks. We open the file in append mode ("ab") and use the seek method to move the file pointer to the position where the current chunk should be written. Then we write the chunk data to the file using the write method. This is just a simple example to give you an idea of how you might handle chunked file uploads on the Flask side. You’ll need to add additional logic to handle errors, validate the uploaded chunks, and reassemble the complete file. \n The comple codes: \n from flask import Flask, request\nimport os\nimport hashlib\n\napp = Flask(__name__)\napp.config["UPLOAD_FOLDER"] = "/path/to/upload/folder"\napp.config["CHUNKS_FOLDER"] = "/path/to/chunks/folder"\n\ndef validate_chunk(filename, chunk_number, chunk_size, total_size, file_data):\n    # Check if the chunk size is correct\n    if len(file_data) != chunk_size and (chunk_number + 1) * chunk_size < total_size:\n        return False\n\n    # Check if the file data is corrupted\n    checksum = hashlib.md5(file_data).hexdigest()\n    if checksum != request.headers["checksum"]:\n        return False\n\n    return True\n\ndef reassemble_file(filename, total_size):\n    with open(os.path.join(app.config["UPLOAD_FOLDER"], filename), "wb") as f:\n        for i in range((total_size + CHUNK_SIZE - 1) // CHUNK_SIZE):\n            chunk_filename = f"{filename}.part{i}"\n            with open(os.path.join(app.config["CHUNKS_FOLDER"], chunk_filename), "rb") as cf:\n                f.write(cf.read())\n\n@app.route("/upload", methods=["POST"])\ndef upload():\n    filename = request.headers["content-disposition"].split("filename=")[1]\n    chunk_number = int(request.headers["chunk-number"])\n    chunk_size = int(request.headers["chunk-size"])\n    total_size = int(request.headers["total-size"])\n    file_data = request.data\n\n    if not validate_chunk(filename, chunk_number, chunk_size, total_size, file_data):\n        return "Invalid chunk", 400\n\n    chunk_filename = f"{filename}.part{chunk_number}"\n    with open(os.path.join(app.config["CHUNKS_FOLDER"], chunk_filename), "wb") as f:\n        f.write(file_data)\n\n    if (chunk_number + 1) * chunk_size >= total_size:\n        reassemble_file(filename, total_size)\n\n    return "Chunk uploaded successfully!"\n\nif __name__ == "__main__":\n    app.run() \n In this example, we added some simple validation logic to the validate_chunk function. We check if the size of the uploaded chunk is correct by comparing it to the expected chunk_size. If the size is incorrect and it’s not the last chunk of the file (i.e., (chunk_number + 1) * chunk_size < total_size), we return False to indicate that the chunk is invalid. We also added a check to see if the file data is corrupted. We use the md5 hash function from Python’s hashlib module to compute a checksum of the uploaded data and compare it to a checksum sent by the client in a custom checksum header. If the checksums don’t match, we return False to indicate that the chunk is invalid. On the client-side, you’ll need to compute the checksum of each chunk before uploading it and send it to the server in a custom checksum header. Here is an example of how you might do this using Brython: \n The client side: \n from browser import document, ajax\nfrom javascript import JSObject\n\nCHUNK_SIZE = 1024 * 1024  # 1MB\n\ndef on_complete(req):\n    if req.status == 200 or req.status == 0:\n        print("Chunk uploaded successfully")\n    else:\n        print("Error uploading chunk")\n\ndef upload_file(evt):\n    file = document["file-upload"].files[0]\n    # Use pica.js to resize the image here\n    # ...\n    start = 0\n    end = CHUNK_SIZE\n    while start < file.size:\n        chunk = file.slice(start, end)\n        reader = window.FileReader.new()\n        reader.readAsArrayBuffer(chunk)\n        reader.bind("loadend", lambda evt: send_chunk(chunk))\n        start = end\n        end += CHUNK_SIZE\n\ndef send_chunk(chunk):\n    checksum = hashlib.md5(chunk).hexdigest()\n    req = ajax.ajax()\n    req.bind("complete", on_complete)\n    req.open("POST", "/upload", True)\n    req.set_header("content-type", "application/octet-stream")\n    req.set_header("content-disposition", f"attachment; filename={file.name}")\n    req.set_header("chunk-number", str(start // CHUNK_SIZE))\n    req.set_header("chunk-size", str(CHUNK_SIZE))\n    req.set_header("total-size", str(file.size))\n    req.set_header("checksum", checksum)\n    req.send(JSObject(chunk))\n\ndocument["upload-btn"].bind("click", upload_file \n Brython side to add pica resize the image file before send in chunk: \n from browser import document, window, ajax\n\nCHUNK_SIZE = 1024 * 1024  # 1MB\n\ndef on_complete(req):\n    if req.status == 200 or req.status == 0:\n        print("Chunk uploaded successfully")\n    else:\n        print("Error uploading chunk")\n\ndef resize_image(file):\n    # Create a canvas element to draw the image on\n    canvas = document.createElement("canvas")\n    canvas.width = 300\n    canvas.height = 300\n    ctx = canvas.getContext("2d")\n\n    # Create an image element to hold the uploaded file\n    img = document.createElement("img")\n\n    def on_image_load(evt):\n        # Draw the uploaded image onto the canvas\n        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)\n\n        # Use pica to resize the image\n        window.pica.resize(img, canvas).then(lambda result: window.pica.toBlob(result).then(send_file))\n\n    img.bind("load", on_image_load)\n    img.src = window.URL.createObjectURL(file)\n\ndef send_file(file):\n    start = 0\n    end = CHUNK_SIZE\n    while start < file.size:\n        chunk = file.slice(start, end)\n        req = ajax.ajax()\n        req.bind("complete", on_complete)\n        req.open("POST", "/upload", True)\n        req.set_header("content-type", "application/octet-stream")\n        req.set_header("content-disposition", f"attachment; filename={file.name}")\n        req.set_header("chunk-number", str(start // CHUNK_SIZE))\n        req.set_header("chunk-size", str(CHUNK_SIZE))\n        req.set_header("total-size", str(file.size))\n        req.send(chunk)\n        start = end\n        end += CHUNK_SIZE\n\ndocument["upload-btn"].bind("click", lambda evt: resize_image(document["file-upload"].files[0])) \n What if user use the mobile phone camera to upload image file: \n <!DOCTYPE html>\n<html>\n  <head>\n    <script type="text/javascript" src="./../cmsimde/static/brython.js"></script>\n    <script type="text/javascript" src="./../cmsimde/static/pica.min.js"></script>\n  </head>\n  <body onload="brython()">\n    <input type="file" id="file-upload" accept="image/*" capture="camera">\n    <button id="upload-btn">Upload</button>\n    <script type="text/python" src="./../cmsimde/static/upload.py"></script>\n  </body>\n</html> \n', 'tags': '', 'url': 'Brython_Flask.html'}]};