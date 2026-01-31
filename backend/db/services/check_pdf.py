from PyPDF2 import PdfReader

# Path to your PDF template
pdf_path = "public/SQLytics_pdf_template2.pdf"

# Load the PDF
reader = PdfReader(pdf_path)

# Get form fields
fields = reader.get_fields()

if fields:
    print("PDF form fields found:")
    for name, info in fields.items():
        print(f"- Field name: {name}")
        print(f"  Field type: {info.get('/FT')}")
        print(f"  Default value: {info.get('/V')}")
else:
    print("No form fields detected.")
