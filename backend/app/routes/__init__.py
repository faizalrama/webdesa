from .auth import bp as auth_bp
from .potensi import bp as potensi_bp
from .berita import bp as berita_bp
from .struktur import bp as struktur_bp
from .kontak import bp as kontak_bp
from .upload import bp as upload_bp

def register_routes(app):
    # Daftarkan dengan url_prefix yang konsisten
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(potensi_bp, url_prefix='/api/potensi')
    app.register_blueprint(berita_bp, url_prefix='/api/berita')
    app.register_blueprint(struktur_bp, url_prefix='/api/struktur')
    app.register_blueprint(kontak_bp, url_prefix='/api/kontak')
    app.register_blueprint(upload_bp, url_prefix='/api/upload')
    
    # Health check dan root route
    @app.route('/api/health')
    def health_check():
        return {"status": "healthy", "message": "Backend is running!"}
    
    @app.route('/')
    def index():
        return {
            "message": "Backend Desa API is running!",
            "endpoints": {
                "health": "/api/health",
                "auth": "/api/auth/login",
                "upload": "/api/upload/",
                "berita": "/api/berita/",
                "potensi": "/api/potensi/",
                "struktur": "/api/struktur/",
                "kontak": "/api/kontak/"
            }
        }