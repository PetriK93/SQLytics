from flask import Blueprint, jsonify
from db import get_connection
from mysql.connector import Error

net_profit_per_region_bp = Blueprint(
    "net_profit_per_region",
    __name__
)

@net_profit_per_region_bp.route(
    "/api/net-profit-per-region",
    methods=["GET"]
)
def net_profit_per_region():
    try:
        with get_connection() as connection:
            with connection.cursor(dictionary=True) as cursor:
                query = """
                    SELECT
                        country AS region,
                        SUM(net_profit) AS net_profit
                    FROM invoices
                    GROUP BY country
                    ORDER BY net_profit DESC;
                """
                cursor.execute(query)
                rows = cursor.fetchall()

                data = [
                    {
                        "region": row["region"],
                        "net_profit": float(row["net_profit"] or 0)
                    }
                    for row in rows
                ]

                return jsonify(data), 200

    except Error as err:
        return jsonify({"error": str(err)}), 500
