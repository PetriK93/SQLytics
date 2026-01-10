from flask import Blueprint, jsonify
from db import get_connection
from mysql.connector import Error

total_revenue_bp = Blueprint("total_revenue", __name__)

@total_revenue_bp.route("/api/invoices/total-revenue", methods=["GET"])


def total_profit():
    try:
        with get_connection() as connection:
            with connection.cursor(dictionary=True) as cursor:
                query = """
                    SELECT SUM(total) AS total_revenue
                    FROM invoices;
                """
                cursor.execute(query)
                rows = cursor.fetchone()
                return jsonify(rows), 200
    except Error as err:
        return jsonify({"error": str(err)}), 500
