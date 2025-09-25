# app/routes/__init__.py
from .auth import bp as auth_bp
from .potensi import bp as potensi_bp
from .berita import bp as berita_bp
from .struktur import bp as struktur_bp
from .kontak import bp as kontak_bp
from .upload import bp as upload_bp


def register_routes(app):
    app.register_blueprint(auth_bp)
    app.register_blueprint(potensi_bp)
    app.register_blueprint(berita_bp)
    app.register_blueprint(struktur_bp)
    app.register_blueprint(kontak_bp)
    app.register_blueprint(upload_bp)