# app/schemas/kontak.py
from ..extensions import ma
from ..models.kontak import Kontak

class KontakSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Kontak
        load_instance = True
        include_fk = True