# app/utils/upload.py
# helper untuk upload ke local atau menghasilkan presigned URL untuk S3 (boleh dikembangkan)
import os
from werkzeug.utils import secure_filename
from flask import current_app

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def save_file_storage(file_storage):
    if file_storage and allowed_file(file_storage.filename):
        filename = secure_filename(file_storage.filename)
        folder = current_app.config.get('UPLOAD_FOLDER', 'uploads')
        os.makedirs(folder, exist_ok=True)
        path = os.path.join(folder, filename)
        file_storage.save(path)
        # return relative path
        return path
    return None