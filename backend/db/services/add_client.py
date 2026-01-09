from mysql.connector import Error
from db import get_connection

def add_client(name, gender, phone_number, email, country, 
               city, region_code, home_address, postal_code, 
               shipping_address):
    try:
        with get_connection() as connection:
            with connection.cursor() as cursor:
                sql = """
                INSERT INTO user_information
                (name, gender, phone_number, email, country, city, region_code, home_address, postal_code, shipping_address)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                """
                values = (name, gender, phone_number, email, country, city, region_code, home_address, postal_code, shipping_address)
                cursor.execute(sql, values)
                connection.commit()
                print(f"Client added with ID: {cursor.lastrowid}")
    except Error as err:
        print(f"Error: {err}")