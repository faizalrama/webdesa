# app/schemas/berita.py
from ..extensions import ma
from ..models.berita import Berita

class BeritaSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Berita
        load_instance = True
        include_fk = True