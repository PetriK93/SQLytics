import os
from dotenv import load_dotenv
import mysql.connector

# Load .env
load_dotenv()

# Configure the database
dbconfig = {
    "host": os.getenv("DB_HOST"),
    "user": os.getenv("DB_USER"),
    "password": os.getenv("DB_PASSWORD"),
    "database": os.getenv("DB_NAME"),
    "port": int(os.getenv("DB_PORT", 3306))
}

# Create a connection pool
pool = mysql.connector.pooling.MySQLConnectionPool(
    pool_name="mypool",
    pool_size=10,
    **dbconfig
)

# Connect to the database
def get_connection():
    return pool.get_connection()