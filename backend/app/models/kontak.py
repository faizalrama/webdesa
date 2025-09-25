# app/models/kontak.py
from ..extensions import db

class Kontak(db.Model):
    __tablename__ = "kontak"
    id = db.Column(db.Integer, primary_key=True)
    alamat = db.Column(db.String(500))
    telepon = db.Column(db.String(100))
    email = db.Column(db.String(150))
    google_maps_embed = db.Column(db.Text)