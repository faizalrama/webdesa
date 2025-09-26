from app import create_app
from config import Config
from app.extensions import db
from app.models.user import User

app = create_app(Config)

with app.app_context():
    # Cek atau buat user admin
    admin = User.query.filter_by(email="admin@desa.id").first()
    
    if not admin:
        admin = User(
            username="admin",
            email="admin@desa.id",
            role="admin"
        )
        admin.set_password("admin123")  # Password yang mudah diingat
        db.session.add(admin)
        db.session.commit()
        print("✅ Admin user created successfully!")
        print("Email: admin@desa.id")
        print("Password: admin123")
    else:
        print("✅ Admin user already exists")
        print("Email: admin@desa.id")
        # Reset password jika perlu
        admin.set_password("admin123")
        db.session.commit()
        print("Password reset to: admin123")