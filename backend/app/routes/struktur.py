# app/routes/struktur.py
from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from ..extensions import db
from ..models.struktur import Struktur
from ..schemas.struktur import StrukturSchema

bp = Blueprint('struktur', __name__, url_prefix='/api/struktur')
struktur_schema = StrukturSchema()
struktur_list_schema = StrukturSchema(many=True)

@bp.route('/', methods=['GET'])
def list_struktur():
    try:
        page = int(request.args.get('page', 1))
        limit = int(request.args.get('limit', 10))
    except ValueError:
        return {"msg": "Invalid pagination parameters"}, 400

    query = Struktur.query.order_by(Struktur.created_at.desc())
    pagination = query.paginate(page=page, per_page=limit, error_out=False)
    return {
        "data": struktur_list_schema.dump(pagination.items),
        "total": pagination.total,
        "page": pagination.page,
        "pages": pagination.pages
    }

@bp.route('/<int:id>', methods=['GET'])
def detail_struktur(id):
    struktur = Struktur.query.get_or_404(id)
    return struktur_schema.dump(struktur)

@bp.route('/', methods=['POST'])
@jwt_required()
def create_struktur():
    data = request.json or {}
    obj = struktur_schema.load(data)
    db.session.add(obj)
    db.session.commit()
    return struktur_schema.dump(obj), 201

@bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_struktur(id):
    struktur = Struktur.query.get_or_404(id)
    data = request.json or {}
    for key, value in data.items():
        setattr(struktur, key, value)
    db.session.commit()
    return struktur_schema.dump(struktur)

@bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_struktur(id):
    struktur = Struktur.query.get_or_404(id)
    db.session.delete(struktur)
    db.session.commit()
    return {"msg": "deleted"}