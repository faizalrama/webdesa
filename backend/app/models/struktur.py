# app/models/struktur.py
from ..extensions import db
from datetime import datetime

class Struktur(db.Model):
    __tablename__ = "struktur"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    position = db.Column(db.String(150), nullable=False)
    photo_url = db.Column(db.String(300))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)