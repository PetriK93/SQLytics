from flask import Blueprint, jsonify
from mysql.connector import Error
from db import get_connection

# Create blueprint
user_info_bp = Blueprint("user_info", __name__)

# Assign a route to the blueprint
@user_info_bp.route("/api/user-information", methods=["GET"])

def user_information():
    try:
        with get_connection() as connection:
            with connection.cursor(dictionary=True) as cursor:
                query = "SELECT * FROM user_information"
                cursor.execute(query)
                rows = cursor.fetchall()
                return jsonify(rows), 200

    except Error as err:
        return jsonify({"error": str(err)}), 500