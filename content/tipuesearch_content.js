var tipuesearch = {"pages": [{'title': 'About', 'text': 'https://github.com/mdewcm2023/site-scrum-1   \n https://mdewcm2023.github.io/site-scrum-1', 'tags': '', 'url': 'About.html'}, {'title': 'Upload_image', 'text': 'using  pica javascript library  to resize the image integrated with Brython before sending to Flask \n from browser import document, window, ajax\n \ndef on_complete(req):\n    if req.status == 200 or req.status == 0:\n        print("File uploaded successfully")\n    else:\n        print("Error uploading file")\n \ndef upload_file(file):\n    req = ajax.ajax()\n    req.bind("complete", on_complete)\n    req.open("POST", "/upload", True)\n    req.set_header("Content-Type", "application/octet-stream")\n    req.send(file)\n \ndef resize_image(file):\n    pica = window.pica\n    img = document.createElement("img")\n    img.src = window.URL.createObjectURL(file)\n    canvas = document.createElement("canvas")\n    max_size = 800\n    if img.width > max_size or img.height > max_size:\n        if img.width > img.height:\n            canvas.width = max_size\n            canvas.height = max_size * img.height / img.width\n        else:\n            canvas.height = max_size\n            canvas.width = max_size * img.width / img.height\n    else:\n        canvas.width = img.width\n        canvas.height = img.height\n \n    def on_resize(result):\n        resized_image_data = result.toDataURL("image/jpeg").split(",")[1]\n        upload_file(resized_image_data)\n \n    pica.resize(img, canvas).then(on_resize)\n \ndef handle_files(event):\n    file = event.target.files[0]\n    resize_image(file)\n \ninput = document.createElement("input")\ninput.type = "file"\ninput.accept = "image/*"\ninput.capture = "camera"\ninput.bind("change", handle_files)\ndocument <= input \n', 'tags': '', 'url': 'Upload_image.html'}, {'title': 'Brython_Flask', 'text': 'Flask form \n from flask import Flask, render_template, request\nimport json\n\napp = Flask(__name__)\n\n@app.route("/")\ndef index():\n    return render_template("index.html")\n\n@app.route("/upload", methods=["POST"])\ndef upload():\n    data = json.loads(request.form["data"])\n    filename = data["filename"]\n    image_data = data["data"]\n    # Save the resized image to the server here\n    # ...\n    return "File uploaded successfully!"\n\nif __name__ == "__main__":\n    app.run() \n index.html \n <!DOCTYPE html>\n<html>\n  <head>\n    <script type="text/javascript" src="./../cmsimde/static/brython.js"></script>\n    <script type="text/javascript" src="./../cmsimde/static/brython_stdlib.js"></script>\n  </head>\n  <body onload="brython()">\n    <input type="file" id="file-upload" accept="image/*" capture="camera">\n    <button id="upload-btn">Upload</button>\n    <script type="text/python" src="./../cmsimde/static/upload.py"></script>\n  </body>\n</html> \n Brython side \n from browser import document, ajax\nimport json\n\ndef on_complete(req):\n    if req.status == 200 or req.status == 0:\n        alert("File uploaded successfully!")\n    else:\n        alert("Error uploading file")\n\ndef upload_file(evt):\n    file = document["file-upload"].files[0]\n    # Use pica.js to resize the image here\n    # ...\n    data = {\n        "filename": file.name,\n        "data": resized_image_data\n    }\n    req = ajax.ajax()\n    req.bind("complete", on_complete)\n    req.open("POST", "/upload", True)\n    req.set_header("content-type", "application/x-www-form-urlencoded")\n    req.send({"data": json.dumps(data)})\n\ndocument["upload-btn"].bind("click", upload_file) \n Complete Brython side \n <!DOCTYPE html>\n<html>\n  <head>\n    <script type="text/javascript" src="./../cmsimde/static/brython.js"></script>\n    <script type="text/javascript" src="./../cmsimde/static/brython_stdlib.js"></script>\n    <script type="text/javascript" src="./../cmsimde/static/pica.min.js"></script>\n  </head>\n  <body onload="brython()">\n    <input type="file" id="file-upload" accept="image/*">\n    <button id="upload-btn">Upload</button>\n    <img id="preview">\n    <script type="text/python" src="./../cmsimde/static/upload.py"></script>\n  </body>\n</html> \n Brython side \n from browser import document, window, ajax\nfrom javascript import JSConstructor\nimport json\n\npica = JSConstructor(window.pica)\n\ndef on_complete(req):\n    if req.status == 200 or req.status == 0:\n        alert("File uploaded successfully!")\n    else:\n        alert("Error uploading file")\n\ndef resize_image(file):\n    # Create a canvas element to draw the image on\n    canvas = document.createElement("canvas")\n    canvas.width = 300\n    canvas.height = 300\n    ctx = canvas.getContext("2d")\n\n    # Create an image element to hold the uploaded file\n    img = document.createElement("img")\n\n    def on_image_load(evt):\n        # Draw the uploaded image onto the canvas\n        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)\n\n        # Use pica to resize the image\n        pica.resize(img, canvas).then(lambda result: pica.toBlob(result).then(send_data))\n\n    img.bind("load", on_image_load)\n    img.src = window.URL.createObjectURL(file)\n\ndef send_data(blob):\n    # Convert the blob to a data URL and set it as the src of the preview image\n    reader = window.FileReader.new()\n    reader.readAsDataURL(blob)\n    reader.bind("loadend", lambda evt: (document["preview"].src = reader.result))\n\ndef upload_file(evt):\n    file = document["file-upload"].files[0]\n    resize_image(file)\n\ndocument["upload-btn"].bind("click", upload_file) \n Flask side to save uploaded file \n from flask import Flask, request\nimport os\nfrom werkzeug.utils import secure_filename\n\napp = Flask(__name__)\napp.config["UPLOAD_FOLDER"] = "/path/to/upload/folder"\n\n@app.route("/upload", methods=["POST"])\ndef upload():\n    file = request.files["file"]\n    filename = secure_filename(file.filename)\n    file.save(os.path.join(app.config["UPLOAD_FOLDER"], filename))\n    return "File uploaded successfully!"\n\nif __name__ == "__main__":\n    app.run() \n \n bit by bit upload with Brython \n IT is possible to upload an image file in chunks using Brython and pica. Use the File.slice method to split the file into smaller chunks and send each chunk to the server separately. Here is an example of how to do this: \n from browser import document, ajax\nfrom javascript import JSObject\n\nCHUNK_SIZE = 1024 * 1024  # 1MB\n\ndef on_complete(req):\n    if req.status == 200 or req.status == 0:\n        print("Chunk uploaded successfully")\n    else:\n        print("Error uploading chunk")\n\ndef upload_file(evt):\n    file = document["file-upload"].files[0]\n    # Use pica.js to resize the image here\n    # ...\n    start = 0\n    end = CHUNK_SIZE\n    while start < file.size:\n        chunk = file.slice(start, end)\n        req = ajax.ajax()\n        req.bind("complete", on_complete)\n        req.open("POST", "/upload", True)\n        req.set_header("content-type", "application/octet-stream")\n        req.set_header("content-disposition", f"attachment; filename={file.name}")\n        req.set_header("chunk-number", str(start // CHUNK_SIZE))\n        req.set_header("chunk-size", str(CHUNK_SIZE))\n        req.set_header("total-size", str(file.size))\n        req.send(JSObject(chunk))\n        start = end\n        end += CHUNK_SIZE\n\ndocument["upload-btn"].bind("click", upload_file) \n In this example, the File.slice method to split the resized image file into chunks of size CHUNK_SIZE. Each chunk send to the server separately using an XMLHttpRequest object. Several custom headers are set on the request to provide the server with information about the chunk being uploaded. The content-disposition header specifies the filename of the uploaded file. The chunk-number header specifies the index of the current chunk. The chunk-size header specifies the size of each chunk. And the total-size header specifies the total size of the uploaded file. On the server-side, we need to implement logic to handle the incoming chunks and reassemble them into a complete file. We can use the custom headers sent with each request to determine which chunk is being uploaded and how to reassemble the complete file. \n bit by bit Flask side \n from flask import Flask, request\nimport os\n\napp = Flask(__name__)\napp.config["UPLOAD_FOLDER"] = "/path/to/upload/folder"\n\n@app.route("/upload", methods=["POST"])\ndef upload():\n    filename = request.headers["content-disposition"].split("filename=")[1]\n    chunk_number = int(request.headers["chunk-number"])\n    chunk_size = int(request.headers["chunk-size"])\n    total_size = int(request.headers["total-size"])\n    file_data = request.data\n\n    with open(os.path.join(app.config["UPLOAD_FOLDER"], filename), "ab") as f:\n        f.seek(chunk_number * chunk_size)\n        f.write(file_data)\n\n    return "Chunk uploaded successfully!"\n\nif __name__ == "__main__":\n    app.run() \n In this example, we use Flask’s request object to access the uploaded chunk and the custom headers sent with the request. We use the content-disposition header to determine the filename of the uploaded file. We use the chunk-number, chunk-size, and total-size headers to determine the index, size, and total size of the uploaded chunks. We open the file in append mode ("ab") and use the seek method to move the file pointer to the position where the current chunk should be written. Then we write the chunk data to the file using the write method. This is just a simple example to give you an idea of how you might handle chunked file uploads on the Flask side. You’ll need to add additional logic to handle errors, validate the uploaded chunks, and reassemble the complete file. \n The comple codes: \n from flask import Flask, request\nimport os\nimport hashlib\n\napp = Flask(__name__)\napp.config["UPLOAD_FOLDER"] = "/path/to/upload/folder"\napp.config["CHUNKS_FOLDER"] = "/path/to/chunks/folder"\n\ndef validate_chunk(filename, chunk_number, chunk_size, total_size, file_data):\n    # Check if the chunk size is correct\n    if len(file_data) != chunk_size and (chunk_number + 1) * chunk_size < total_size:\n        return False\n\n    # Check if the file data is corrupted\n    checksum = hashlib.md5(file_data).hexdigest()\n    if checksum != request.headers["checksum"]:\n        return False\n\n    return True\n\ndef reassemble_file(filename, total_size):\n    with open(os.path.join(app.config["UPLOAD_FOLDER"], filename), "wb") as f:\n        for i in range((total_size + CHUNK_SIZE - 1) // CHUNK_SIZE):\n            chunk_filename = f"{filename}.part{i}"\n            with open(os.path.join(app.config["CHUNKS_FOLDER"], chunk_filename), "rb") as cf:\n                f.write(cf.read())\n\n@app.route("/upload", methods=["POST"])\ndef upload():\n    filename = request.headers["content-disposition"].split("filename=")[1]\n    chunk_number = int(request.headers["chunk-number"])\n    chunk_size = int(request.headers["chunk-size"])\n    total_size = int(request.headers["total-size"])\n    file_data = request.data\n\n    if not validate_chunk(filename, chunk_number, chunk_size, total_size, file_data):\n        return "Invalid chunk", 400\n\n    chunk_filename = f"{filename}.part{chunk_number}"\n    with open(os.path.join(app.config["CHUNKS_FOLDER"], chunk_filename), "wb") as f:\n        f.write(file_data)\n\n    if (chunk_number + 1) * chunk_size >= total_size:\n        reassemble_file(filename, total_size)\n\n    return "Chunk uploaded successfully!"\n\nif __name__ == "__main__":\n    app.run() \n In this example, we added some simple validation logic to the validate_chunk function. We check if the size of the uploaded chunk is correct by comparing it to the expected chunk_size. If the size is incorrect and it’s not the last chunk of the file (i.e., (chunk_number + 1) * chunk_size < total_size), we return False to indicate that the chunk is invalid. We also added a check to see if the file data is corrupted. We use the md5 hash function from Python’s hashlib module to compute a checksum of the uploaded data and compare it to a checksum sent by the client in a custom checksum header. If the checksums don’t match, we return False to indicate that the chunk is invalid. On the client-side, you’ll need to compute the checksum of each chunk before uploading it and send it to the server in a custom checksum header. Here is an example of how you might do this using Brython: \n The client side: \n from browser import document, ajax\nfrom javascript import JSObject\n\nCHUNK_SIZE = 1024 * 1024  # 1MB\n\ndef on_complete(req):\n    if req.status == 200 or req.status == 0:\n        print("Chunk uploaded successfully")\n    else:\n        print("Error uploading chunk")\n\ndef upload_file(evt):\n    file = document["file-upload"].files[0]\n    # Use pica.js to resize the image here\n    # ...\n    start = 0\n    end = CHUNK_SIZE\n    while start < file.size:\n        chunk = file.slice(start, end)\n        reader = window.FileReader.new()\n        reader.readAsArrayBuffer(chunk)\n        reader.bind("loadend", lambda evt: send_chunk(chunk))\n        start = end\n        end += CHUNK_SIZE\n\ndef send_chunk(chunk):\n    checksum = hashlib.md5(chunk).hexdigest()\n    req = ajax.ajax()\n    req.bind("complete", on_complete)\n    req.open("POST", "/upload", True)\n    req.set_header("content-type", "application/octet-stream")\n    req.set_header("content-disposition", f"attachment; filename={file.name}")\n    req.set_header("chunk-number", str(start // CHUNK_SIZE))\n    req.set_header("chunk-size", str(CHUNK_SIZE))\n    req.set_header("total-size", str(file.size))\n    req.set_header("checksum", checksum)\n    req.send(JSObject(chunk))\n\ndocument["upload-btn"].bind("click", upload_file \n Brython side to add pica resize the image file before send in chunk: \n from browser import document, window, ajax\n\nCHUNK_SIZE = 1024 * 1024  # 1MB\n\ndef on_complete(req):\n    if req.status == 200 or req.status == 0:\n        print("Chunk uploaded successfully")\n    else:\n        print("Error uploading chunk")\n\ndef resize_image(file):\n    # Create a canvas element to draw the image on\n    canvas = document.createElement("canvas")\n    canvas.width = 300\n    canvas.height = 300\n    ctx = canvas.getContext("2d")\n\n    # Create an image element to hold the uploaded file\n    img = document.createElement("img")\n\n    def on_image_load(evt):\n        # Draw the uploaded image onto the canvas\n        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)\n\n        # Use pica to resize the image\n        window.pica.resize(img, canvas).then(lambda result: window.pica.toBlob(result).then(send_file))\n\n    img.bind("load", on_image_load)\n    img.src = window.URL.createObjectURL(file)\n\ndef send_file(file):\n    start = 0\n    end = CHUNK_SIZE\n    while start < file.size:\n        chunk = file.slice(start, end)\n        req = ajax.ajax()\n        req.bind("complete", on_complete)\n        req.open("POST", "/upload", True)\n        req.set_header("content-type", "application/octet-stream")\n        req.set_header("content-disposition", f"attachment; filename={file.name}")\n        req.set_header("chunk-number", str(start // CHUNK_SIZE))\n        req.set_header("chunk-size", str(CHUNK_SIZE))\n        req.set_header("total-size", str(file.size))\n        req.send(chunk)\n        start = end\n        end += CHUNK_SIZE\n\ndocument["upload-btn"].bind("click", lambda evt: resize_image(document["file-upload"].files[0])) \n', 'tags': '', 'url': 'Brython_Flask.html'}]};