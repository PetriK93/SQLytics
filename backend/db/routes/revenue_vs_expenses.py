from flask import Blueprint, jsonify
from db import get_connection
from mysql.connector import Error

revenue_vs_expenses_bp = Blueprint("revenue_vs_expenses", __name__)

@revenue_vs_expenses_bp.route("/api/revenue-vs-expenses", methods=["GET"])
def revenue_vs_expenses():
    try:
        with get_connection() as connection:
            with connection.cursor(dictionary=True) as cursor:
                query = """
                    SELECT 
                        SUM(net_profit) AS total_net_profit,
                        SUM(total_expenses) AS total_expenses
                    FROM invoices;
                """
                cursor.execute(query)
                row = cursor.fetchone()
                total_net_profit = float(row.get("total_net_profit", 0))
                total_expenses = float(row.get("total_expenses", 0))

                return jsonify([
                {"name": "Net profit", "value": total_net_profit},
                {"name": "Expenses", "value": total_expenses}
            ]), 200

    except Error as err:
        return jsonify({"error": str(err)}), 500
