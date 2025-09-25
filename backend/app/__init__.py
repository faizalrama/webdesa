# app/__init__.py
from flask import Flask
from .extensions import db, migrate, ma, jwt, cors
from .routes import register_routes


def create_app(config_object):
    app = Flask(__name__)
    app.config.from_object(config_object)

    # init extensions
    db.init_app(app)
    migrate.init_app(app, db)
    ma.init_app(app)
    jwt.init_app(app)
    cors.init_app(app, resources={r"/api/*": {"origins": app.config.get("CORS_ORIGINS")}})

    # create upload folder if not exists
    import os
    upload_folder = os.path.join(app.root_path, '..', app.config.get("UPLOAD_FOLDER", "uploads"))
    os.makedirs(upload_folder, exist_ok=True)

    # register blueprints
    register_routes(app)

    return app