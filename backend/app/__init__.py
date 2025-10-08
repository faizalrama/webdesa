from flask import Flask
from .extensions import db, migrate, ma, jwt, cors
from .routes import register_routes   # ✅ import register_routes

def create_app(config_object):
    app = Flask(__name__)
    app.config.from_object(config_object)

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)  # Pastikan migrate di-init dengan db
    ma.init_app(app)
    jwt.init_app(app)
    cors.init_app(app)

    cors.init_app(
        app,
        supports_credentials=True,
        origins=["http://192.168.11.154:8080"],  # asal frontend kamu
    )


    # Import models setelah db diinisialisasi
    from .models import user, berita, potensi, struktur, kontak

    # ✅ Daftarkan semua route & blueprint
    register_routes(app)

    # Create upload folder
    import os
    upload_folder = app.config.get("UPLOAD_FOLDER", "uploads")
    os.makedirs(upload_folder, exist_ok=True)

    return app
