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

def encode_password(password):
    """Encode the password using MD5"""
    md5_hash = hashlib.md5()
    md5_hash.update(password.encode('utf-8'))
    return md5_hash.hexdigest()

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json  # Assuming you're sending a JSON payload containing username and password
    username = data.get('username')
    password = data.get('password')
    encoded_password = encode_password(password)

    # Check if the username and encoded password match in the database
    cursor.execute('SELECT COUNT(*) FROM users WHERE username=%s AND password=%s', (username, encoded_password))
    result = cursor.fetchone()
    count = result[0]

    if count == 1:
        return jsonify({'success': True, 'message': 'Login successful!'})
    else:
        return jsonify({'success': False, 'message': 'Invalid username or password.'})

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
