from flask import Blueprint, jsonify
from mysql.connector import Error
from db import get_connection

# Create blueprint
emails_by_type_bp = Blueprint("emails_by_type", __name__)

# Assign a route to the blueprint
@emails_by_type_bp.route("/api/emails-by-type", methods=["GET"])

def emails_by_type():
    try:
        with get_connection() as connection:
            with connection.cursor(dictionary=True) as cursor:
                query = """
                SELECT 
                    type, COUNT(*) AS count
                FROM sent_emails
                GROUP BY type;

                """
                cursor.execute(query)
                rows = cursor.fetchall()
                
                total_items = sum(row["count"] for row in rows)
                
                email_types = {
                    "complaint": "Complaint",
                    "feedback": "Feedback",
                    "inquiry": "Inquiry",
                    "other": "Other",
                }

                result = [
                {
                    "name": email_types.get(row["type"], row["type"]),
                    "value": round((row["count"] / total_items) * 100)
                }
                for row in rows
            ]
            
                return jsonify(result), 200

    except Error as err:
        return jsonify({"error": str(err)}), 500