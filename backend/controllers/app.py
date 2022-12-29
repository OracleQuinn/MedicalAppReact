import collections
from flask import Flask, jsonify
import mysql.connector
from flask_ngrok import run_with_ngrok
import os

app = Flask(__name__)
run_with_ngrok(app)

connection = mysql.connector.connect(
    host=os.environ.get('DB_HOST'),
    user=os.environ.get('DB_USER'),
    password=os.environ.get('DB_PASSWORD'),
    database=os.environ.get('DB_DATABASE'),
)

cursor = connection.cursor()

@app.route('/api/ems/drugs', methods=['GET'])
def get_data():
    cursor.execute('SELECT * FROM medical_app.ems_drugs')
    Drug = collections.namedtuple("Drug", ["id", "latin_name", "name"])
    data = cursor.fetchall()
    drugs = [Drug(*drug)._asdict() for drug in data]
    return drugs

if __name__ == "__main__":
    app.run(port=5000)
