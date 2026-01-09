import os
from dotenv import load_dotenv
import mysql.connector
from mysql.connector import Error

# Load environment variables from .env
load_dotenv()

DB_HOST = os.getenv("DB_HOST")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_NAME = os.getenv("DB_NAME")
DB_PORT = int(os.getenv("DB_PORT", 3306))

try:
    # Connect to the database
    connection = mysql.connector.connect(
        host=DB_HOST,
        user=DB_USER,
        password=DB_PASSWORD,
        database=DB_NAME,
        port=DB_PORT
    )

    if connection.is_connected():
        print(f"✅ Connected to MySQL database '{DB_NAME}' successfully!")
        # Optional: show MySQL version
        cursor = connection.cursor()
        cursor.execute("SELECT VERSION();")
        version = cursor.fetchone()
        print(f"MySQL version: {version[0]}")
        cursor.close()

except Error as e:
    print(f"❌ Error connecting to MySQL: {e}")

finally:
    if connection.is_connected():
        connection.close()
        print("Connection closed.")
