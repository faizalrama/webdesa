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
    data = request.get_json()
    if not data:
        return {"msg": "Request body must be JSON"}, 400

    obj = Potensi(
        title=data.get("title"),
        excerpt=data.get("excerpt"),
        description=data.get("description"),
        image_url=data.get("image_url"),
        location=data.get("location")
    )
    db.session.add(obj)
    db.session.commit()
    return potensi_schema.dump(obj), 201

@bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_potensi(id):
    potensi = Potensi.query.get_or_404(id)
    data = request.get_json()
    if not data:
        return {"msg": "Request body must be JSON"}, 400

    potensi.title = data.get("title", potensi.title)
    potensi.excerpt = data.get("excerpt", potensi.excerpt)
    potensi.description = data.get("description", potensi.description)
    potensi.image_url = data.get("image_url", potensi.image_url)
    potensi.location = data.get("location", potensi.location)

    db.session.commit()
    return potensi_schema.dump(potensi)

@bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_potensi(id):
    potensi = Potensi.query.get_or_404(id)
    db.session.delete(potensi)
    db.session.commit()
    return {"msg": "deleted"}