from flask import Blueprint, jsonify
from mysql.connector import Error
from db import get_connection

# Create blueprint
sales_by_location_bp = Blueprint("sales_by_location", __name__)

# Assign a route to the blueprint
@sales_by_location_bp.route("/api/sales-by-location", methods=["GET"])

def sales_by_location():
    try:
        with get_connection() as connection:
            with connection.cursor(dictionary=True) as cursor:
                query = """
                

                """
                cursor.execute(query)
                rows = cursor.fetchall()
                return jsonify(rows), 200

    except Error as err:
        return jsonify({"error": str(err)}), 500