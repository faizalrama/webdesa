# app/routes/berita.py
from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from ..extensions import db
from ..models.berita import Berita
from ..schemas.berita import BeritaSchema

bp = Blueprint('berita', __name__, url_prefix='/api/berita')
berita_schema = BeritaSchema()
berita_list_schema = BeritaSchema(many=True)

@bp.route('/', methods=['GET'])
def list_berita():
    try:
        page = int(request.args.get('page', 1))
        limit = int(request.args.get('limit', 10))
    except ValueError:
        return {"msg": "Invalid pagination parameters"}, 400

    query = Berita.query.order_by(Berita.created_at.desc())
    pagination = query.paginate(page=page, per_page=limit, error_out=False)
    return {
        "data": berita_list_schema.dump(pagination.items),
        "total": pagination.total,
        "page": pagination.page,
        "pages": pagination.pages
    }

@bp.route('/<int:id>', methods=['GET'])
def detail_berita(id):
    berita = Berita.query.get_or_404(id)
    return berita_schema.dump(berita)

@bp.route('/', methods=['POST'])
@jwt_required()
def create_berita():
    data = request.json or {}
    obj = berita_schema.load(data)
    db.session.add(obj)
    db.session.commit()
    return berita_schema.dump(obj), 201

@bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_berita(id):
    berita = Berita.query.get_or_404(id)
    data = request.json or {}
    for key, value in data.items():
        setattr(berita, key, value)
    db.session.commit()
    return berita_schema.dump(berita)

@bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_berita(id):
    berita = Berita.query.get_or_404(id)
    db.session.delete(berita)
    db.session.commit()
    return {"msg": "deleted"}