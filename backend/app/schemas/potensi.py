# app/schemas/potensi.py
from ..extensions import ma
from ..models.potensi import Potensi

class PotensiSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Potensi
        load_instance = True
        include_fk = True