from flask import Blueprint, jsonify
from mysql.connector import Error
from db import get_connection

# Create blueprint
invoice_info_bp = Blueprint("invoice_info", __name__)

# Assign a route to the blueprint
@invoice_info_bp.route("/api/invoice-information", methods=["GET"])

def invoice_information():
    try:
        with get_connection() as connection:
            with connection.cursor(dictionary=True) as cursor:
                query = "SELECT * FROM invoices"
                cursor.execute(query)
                rows = cursor.fetchall()
                return jsonify(rows), 200

    except Error as err:
        return jsonify({"error": str(err)}), 500