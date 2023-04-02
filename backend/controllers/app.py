import collections
from flask import Flask, jsonify
import mysql.connector
from flask_ngrok import run_with_ngrok
import os
from dotenv import load_dotenv

app = Flask(__name__)
run_with_ngrok(app)

load_dotenv('.env.local')

print(os.getenv('DB_HOST'))
print(os.getenv('DB_USER'))
print(os.getenv('DB_PASSWORD'))
print(os.getenv('DB_DATABASE'))

connection = mysql.connector.connect(
    host=os.getenv('DB_HOST'),
    user=os.getenv('DB_USER'),
    password=os.getenv('DB_PASSWORD'),
    database=os.getenv('DB_DATABASE'),
)

cursor = connection.cursor()

@app.route('/api/ems/drugs', methods=['GET'])
def get_ems_drugs():
    cursor.execute('SELECT * FROM medical_app.ems_drugs')
    Drug = collections.namedtuple("Drug", ["id", "latin_name", "name"])
    data = cursor.fetchall()
    drugs = [Drug(*drug)._asdict() for drug in data]
    return jsonify(drugs)

@app.route('/api/drugs', methods=['GET'])
def get_all_drugs():
    cursor.execute("SELECT * FROM medical_app.all_drugs WHERE type = 'Ludzki'")
    Drug = collections.namedtuple("Drug", ["id", "name", "used_name", "type", "previous_name", "target_species", "power", "pharmaceutical_form", "active_substance"])
    data = cursor.fetchall()
    drugs = [Drug(*drug)._asdict() for drug in data]
    return jsonify(drugs)

if __name__ == "__main__":
    app.run(port=5000)
