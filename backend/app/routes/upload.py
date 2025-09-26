# app/routes/upload.py
import os
from flask import Blueprint, request, current_app, url_for
from werkzeug.utils import secure_filename

bp = Blueprint('upload', __name__)  # Hapus url_prefix dari sini
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@bp.route('/', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return {"msg": "No file part"}, 400
    file = request.files['file']
    if file.filename == '':
        return {"msg": "No selected file"}, 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        upload_folder = current_app.config.get('UPLOAD_FOLDER', 'uploads')
        save_path = os.path.join(upload_folder, filename)
        file.save(save_path)
        # return a relative URL; in production use S3/Cloudinary
        file_url = url_for('static', filename=f'uploads/{filename}', _external=True)
        return {"url": file_url}
    return {"msg": "Invalid file type"}, 400