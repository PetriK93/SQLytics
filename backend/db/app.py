from flask import Flask
from flask_cors import CORS
from routes.user_information import user_info_bp
from routes.product_information import product_info_bp
from routes.invoice_information import invoice_info_bp
from routes.get_recent_invoices import recent_invoices_bp

app = Flask(__name__)
CORS(app)

# Register blueprints
app.register_blueprint(user_info_bp)
app.register_blueprint(product_info_bp)
app.register_blueprint(invoice_info_bp)
app.register_blueprint(recent_invoices_bp)

if __name__ == "__main__":
    app.run(debug=True)
