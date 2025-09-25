# app/routes/kontak.py
from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from ..extensions import db
from ..models.kontak import Kontak
from ..schemas.kontak import KontakSchema

bp = Blueprint('kontak', __name__, url_prefix='/api/kontak')
kontak_schema = KontakSchema()

@bp.route('/', methods=['GET'])
def get_kontak():
    # Kontak is a singleton, always get the first one or create it
    kontak = Kontak.query.first()
    if not kontak:
        # Return default/empty values if not exists
        return kontak_schema.dump({})
    return kontak_schema.dump(kontak)

@bp.route('/', methods=['PUT'])
@jwt_required()
def update_kontak():
    kontak = Kontak.query.first()
    data = request.json or {}
    if not kontak:
        # If no contact info exists, create a new one
        kontak = kontak_schema.load(data)
        db.session.add(kontak)
    else:
        # Otherwise, update existing contact info
        for key, value in data.items():
            setattr(kontak, key, value)

    db.session.commit()
    return kontak_schema.dump(kontak)