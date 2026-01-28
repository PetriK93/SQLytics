# SQLytics

![Preview](https://github.com/user-attachments/assets/b5799afc-6e67-4d2a-9732-0c479fcf111e)

## 📖 Introduction

SQLytics is a web-based analytics dashboard designed to help businesses **visualize and analyze key financial data** from their MySQL databases.  
With interactive charts for revenue, expenses, and net profit by region or month, SQLytics turns raw database information into **actionable insights**.

The frontend is built with **React, Javascript and Recharts**, while the backend uses **Python, Flask and MySQL**, allowing seamless data retrieval and real-time chart updates.

---

## ✨ Features

📊 Track **net profit and expenses** by region.

📅 View **yearly & monthly revenue and expenses trends**.

📈 Interactive **horizontal and vertical bar charts** for easy visualization.

💾 Export charts as **images** for reporting purposes.

⚡ Fully dynamic dashboard that fetches **live data from a MySQL database**.

---

## 🚀 Installation

1. Clone the repository:

```bash
git clone https://github.com/PetriK93/SQLytics.git
cd sqlytics
```

2. Create and activate a virtual environment for the backend (optional but recommended):

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Linux / macOS
venv\Scripts\activate      # Windows
```

3. Install backend dependencies:

```
cd backend
pip install flask mysql-connector-python
```

4. Navigate to the frontend folder and install dependencies:

```
cd client
npm install
```

5. Run the backend:

```
cd backend
cd db
py app.py
```

6. Run the frontend:

```
cd client
npm run dev
```

---

## 💻 How to use SQLytics

Connect SQLytics to your MySQL database using the proper credentials.

Navigate to the dashboard.

Interact with the charts to explore:

Email types sent by users

Most used payment methods

New users compared to the last year

Currently active members

Revenue generated and units sold by category and location

Most recent transactions

Total net profit

Revenue & Expenses

Total net profit by region

Export charts as images directly from the dashboard for reports or presentations.

---

## 📦 Dependencies

python 3.12+

flask-cors

mysql-connector-python

react

recharts

axios for API calls

---

## 📝 License

This project is open source under the MIT License.
