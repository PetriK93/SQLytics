from flask import Blueprint, jsonify
from db import get_connection
from mysql.connector import Error

monthly_revenue_vs_expenses_bp = Blueprint(
    "monthly_revenue_vs_expenses",
    __name__
)

@monthly_revenue_vs_expenses_bp.route(
    "/api/monthly-revenue-vs-expenses",
    methods=["GET"]
)
def monthly_revenue_vs_expenses():
    try:
        with get_connection() as connection:
            with connection.cursor(dictionary=True) as cursor:
                query = """
                    SELECT
                        MONTH(time_of_purchase) AS month_num,
                        DATE_FORMAT(time_of_purchase, '%b') AS month,
                        SUM(net_profit) AS revenue,
                        SUM(total_expenses) AS expenses
                    FROM invoices
                    GROUP BY month_num, month
                    ORDER BY month_num;
                """
                cursor.execute(query)
                rows = cursor.fetchall()

                data = [
                    {
                        "month": row["month"],
                        "revenue": float(row["revenue"] or 0),
                        "expenses": float(row["expenses"] or 0),
                    }
                    for row in rows
                ]

                return jsonify(data), 200

    except Error as err:
        return jsonify({"error": str(err)}), 500
