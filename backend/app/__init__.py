from flask import Flask
from .extensions import db, migrate, ma, jwt, cors

def create_app(config_object):
    app = Flask(__name__)
    app.config.from_object(config_object)

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)  # Pastikan migrate di-init dengan db
    ma.init_app(app)
    jwt.init_app(app)
    cors.init_app(app, resources={r"/api/*": {"origins": app.config.get("CORS_ORIGINS")}})

    # Import models setelah db diinisialisasi
    from .models import user, berita, potensi, struktur, kontak

    # Import dan register blueprints
    from .routes import auth, berita, potensi, struktur, kontak, upload
    from .routes import register_routes
    register_routes(app)

    # Create upload folder
    import os
    upload_folder = app.config.get("UPLOAD_FOLDER", "uploads")
    os.makedirs(upload_folder, exist_ok=True)

    return app