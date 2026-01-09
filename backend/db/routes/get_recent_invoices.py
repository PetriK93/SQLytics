from flask import Blueprint, jsonify
from db import get_connection
from mysql.connector import Error

recent_invoices_bp = Blueprint("recent_invoices", __name__)

@recent_invoices_bp.route("/api/invoices/recent", methods=["GET"])


def get_recent_invoices():
    try:
        with get_connection() as connection:
            with connection.cursor(dictionary=True) as cursor:
                query = """
                    SELECT 
                        i.order_id AS id,
                        i.customer_id AS customerID,
                        u.name AS customerName,
                        i.payment_method AS paymentMethod,
                        i.time_of_purchase AS date,
                        i.quantity_of_items AS quantity,
                        i.total AS amount
                    FROM invoices i
                    JOIN user_information u ON i.customer_id = u.id
                    ORDER BY i.time_of_purchase DESC
                    LIMIT 20
                """
                cursor.execute(query)
                rows = cursor.fetchall()
                return jsonify(rows), 200
    except Error as err:
        return jsonify({"error": str(err)}), 500
