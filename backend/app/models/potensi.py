# app/models/potensi.py
from ..extensions import db
from datetime import datetime

class Potensi(db.Model):
    __tablename__ = "potensi"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    excerpt = db.Column(db.String(500))
    description = db.Column(db.Text)
    image_url = db.Column(db.String(300))
    location = db.Column(db.String(200))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)