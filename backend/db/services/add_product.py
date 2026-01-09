from mysql.connector import Error
from db import get_connection

def add_product(name, price, tax_percentage, category, supplier_id, supplier_cut, status, reorder_level, brand):
    try:
        with get_connection() as connection:
            with connection.cursor() as cursor:
                sql = """
                INSERT INTO product_information
                (name, price, tax_percentage, category, supplier_id, supplier_cut, status, reorder_level, brand)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                """
                values = (name, price, tax_percentage, category, supplier_id, supplier_cut, status, reorder_level, brand)
                cursor.execute(sql, values)
                connection.commit()
                print(f"Client added with ID: {cursor.lastrowid}")
    except Error as err:
        print(f"Error: {err}")
