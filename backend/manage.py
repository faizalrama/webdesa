from app import create_app
from config import Config
from app.extensions import db

app = create_app(Config)

with app.app_context():
    db.create_all()
    print("✅ Database tables created successfully!")
    print("✅ Server is ready to run!")
    print("✅ Run: python app.py")