# app/schemas/struktur.py
from ..extensions import ma
from ..models.struktur import Struktur

class StrukturSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Struktur
        load_instance = True
        include_fk = True