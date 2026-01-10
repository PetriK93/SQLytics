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
                UPDATE sales_by_category_and_location
                    SET
                        finland = (
                            SELECT
                                SUM(
                                    CASE
                                        WHEN ui.country = 'Finland'
                                        THEN i.quantity_of_items
                                        ELSE 0
                                    END
                                )
                            FROM invoices AS i
                            JOIN user_information AS ui
                                ON i.customer_id = ui.id
                        ),

                        eu = (
                            SELECT
                                SUM(
                                    CASE
                                        WHEN ui.country IN (
                                            'Austria','Belgium','Bulgaria','Croatia','Cyprus','Czech Republic',
                                            'Denmark','Estonia','France','Germany','Greece','Hungary','Ireland',
                                            'Italy','Latvia','Lithuania','Luxembourg','Malta','Netherlands',
                                            'Poland','Portugal','Romania','Slovakia','Slovenia','Spain','Sweden'
                                        )
                                        THEN i.quantity_of_items
                                        ELSE 0
                                    END
                                )
                            FROM invoices AS i
                            JOIN user_information AS ui
                                ON i.customer_id = ui.id
                        ),

                        us = (
                            SELECT
                                SUM(
                                    CASE
                                        WHEN ui.country = 'US'
                                        THEN i.quantity_of_items
                                        ELSE 0
                                    END
                                )
                            FROM invoices AS i
                            JOIN user_information AS ui
                                ON i.customer_id = ui.id
                        ),

                        others = (
                            SELECT
                                SUM(
                                    CASE
                                        WHEN ui.country NOT IN (
                                            'Finland','US','Austria','Belgium','Bulgaria','Croatia','Cyprus',
                                            'Czech Republic','Denmark','Estonia','France','Germany','Greece',
                                            'Hungary','Ireland','Italy','Latvia','Lithuania','Luxembourg',
                                            'Malta','Netherlands','Poland','Portugal','Romania','Slovakia',
                                            'Slovenia','Spain','Sweden'
                                        )
                                        THEN i.quantity_of_items
                                        ELSE 0
                                    END
                                )
                            FROM invoices AS i
                            JOIN user_information AS ui
                                ON i.customer_id = ui.id
                        )

                    WHERE id = 1;

                """
                cursor.execute(query)
                rows = cursor.fetchall()
                return jsonify(rows), 200

    except Error as err:
        return jsonify({"error": str(err)}), 500