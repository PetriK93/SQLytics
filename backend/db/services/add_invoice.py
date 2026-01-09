from mysql.connector import Error
from db import get_connection

def add_invoice(order_id, customer_id, payment_method, quantity_of_items, total):
    try:
        with get_connection() as connection:
            with connection.cursor() as cursor:
                sql = """
                INSERT INTO invoices
                (order_id, customer_id, payment_method, quantity_of_items, total)
                VALUES (%s, %s, %s, %s, %s)
                """
                values = (order_id, customer_id, payment_method, quantity_of_items, total)
                cursor.execute(sql, values)
                connection.commit()
                print(f"Client added with ID: {cursor.lastrowid}")
    except Error as err:
        print(f"Error: {err}")

add_invoice(22, 29, "card", 1, 365.90)