# app/models/berita.py
from ..extensions import db
from datetime import datetime

class Berita(db.Model):
    __tablename__ = "berita"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(250), nullable=False)
    summary = db.Column(db.String(500))
    content = db.Column(db.Text)
    image_url = db.Column(db.String(300))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)