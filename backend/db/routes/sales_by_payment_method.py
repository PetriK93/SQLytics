from flask import Blueprint, jsonify
from mysql.connector import Error
from db import get_connection

# Create blueprint
sales_by_payment_method_bp = Blueprint("sales_by_payment_method", __name__)

# Assign a route to the blueprint
@sales_by_payment_method_bp.route("/api/sales-by-payment-method", methods=["GET"])

def sales_by_payment_method():
    try:
        with get_connection() as connection:
            with connection.cursor(dictionary=True) as cursor:
                query = """
                SELECT 
                    payment_method,
                    SUM(total_quantity) AS total_items_sold
                FROM invoices
                GROUP BY payment_method;

                """
                cursor.execute(query)
                rows = cursor.fetchall()
                
                total_items = sum(row["total_items_sold"] for row in rows)
                
                result = [
                {
                    "name": row["payment_method"],
                    "value": round((row["total_items_sold"] / total_items) * 100)
                }
                for row in rows
            ]
                return jsonify(result), 200

    except Error as err:
        return jsonify({"error": str(err)}), 500