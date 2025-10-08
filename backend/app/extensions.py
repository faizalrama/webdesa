from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from flask_marshmallow import Marshmallow
from flask_cors import CORS  # Pastikan ini ada

# Initialize extensions
db = SQLAlchemy()
jwt = JWTManager()
ma = Marshmallow() 
migrate = Migrate()
cors = CORS(resources={r"/api/*": {"origins": "*"}})

def init_extensions(app):
    """Initialize extensions with app"""
    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)
    cors.init_app(app)  # Initialize CORS