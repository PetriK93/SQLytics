from add_client import add_client

def generate_test_users(count, start_index=6, country="Finland", city="Helsinki", region_code="001"):
    """
    Generate `count` test users starting from `start_index`.
    """
    for i in range(start_index, start_index + count):
        name = f"Test{i}"
        gender = "male" if i % 2 == 0 else "female"
        phone_number = f"040{i:05d}"  # e.g., 04000001
        email = f"test{i}@example.com"
        home_address = f"Test Street {i}"
        postal_code = f"001{i:02d}"
        shipping_address = f"{home_address}, {city}"

        # Call your existing add_client function
        new_client_id = add_client(
            name=name,
            gender=gender,
            phone_number=phone_number,
            email=email,
            country=country,
            city=city,
            region_code=region_code,
            home_address=home_address,
            postal_code=postal_code,
            shipping_address=shipping_address
        )
        print(f"Created test user {name} with ID {new_client_id}")

# Example usage: create 100 test users starting from Test1
generate_test_users(100, start_index=6)
