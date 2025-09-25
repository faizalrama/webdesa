# app/routes/potensi.py
from flask import Blueprint, request, current_app, jsonify
from flask_jwt_extended import jwt_required
from ..extensions import db
from ..models.potensi import Potensi
from ..schemas.potensi import PotensiSchema

bp = Blueprint('potensi', __name__, url_prefix='/api/potensi')
potensi_schema = PotensiSchema()
potensi_list_schema = PotensiSchema(many=True)

@bp.route('/', methods=['GET'])
def list_potensi():
    try:
        page = int(request.args.get('page', 1))
        limit = int(request.args.get('limit', 10))
    except ValueError:
        return {"msg": "Invalid pagination parameters"}, 400

    query = Potensi.query.order_by(Potensi.created_at.desc())
    pagination = query.paginate(page=page, per_page=limit, error_out=False)
    return {
        "data": potensi_list_schema.dump(pagination.items),
        "total": pagination.total,
        "page": pagination.page,
        "pages": pagination.pages
    }

@bp.route('/<int:id>', methods=['GET'])
def detail_potensi(id):
    potensi = Potensi.query.get_or_404(id)
    return potensi_schema.dump(potensi)

@bp.route('/', methods=['POST'])
@jwt_required()
def create_potensi():
    data = request.json or {}
    obj = potensi_schema.load(data)
    db.session.add(obj)
    db.session.commit()
    return potensi_schema.dump(obj), 201

@bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_potensi(id):
    potensi = Potensi.query.get_or_404(id)
    data = request.json or {}
    for key, value in data.items():
        setattr(potensi, key, value)
    db.session.commit()
    return potensi_schema.dump(potensi)

@bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_potensi(id):
    potensi = Potensi.query.get_or_404(id)
    db.session.delete(potensi)
    db.session.commit()
    return {"msg": "deleted"}