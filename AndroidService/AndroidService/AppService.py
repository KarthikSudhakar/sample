from flask import Flask
from flaskext.mysql import MySQL
from flask import request
from time import gmtime, strftime
from flask import abort
from flask import jsonify
import time
from json import JSONEncoder
import uuid
import json


mysql = MySQL()
app = Flask(__name__)
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'abcd'
app.config['MYSQL_DATABASE_DB'] = 'pack'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)
conn = mysql.connect()
cursor = conn.cursor()
roomid=0

#unique id generator
@app.route('/')
def index():
    from time import time
    return hex(int(time() * 10000000))[2:]
	
	
#reserve a room	
@app.route('/todo/api/v1.0/tasks', methods=['POST'])
def create_reservation():
    customer_id = request.json['Phone']
    start_date=request.json['start_date']
    end_date=request.json['end_date']
    first_name=request.json['first_name']
    last_name=request.json['last_name']
    room_type = request.json['room_type']
    uid = index()
    booking_timestamp = strftime("%Y-%m-%d %H:%M:%S")
    cursor.execute("""INSERT INTO Reservation (id, start_date, end_date, booking_timestamp, customer_id, room_type,last_name,first_name,status)VALUES (%s, %s, %s, %s, %s, %s,%s,%s,%s)""", (uid, start_date, end_date, booking_timestamp, customer_id, room_type,first_name,last_name,'reserved'))
    conn.commit()
    return jsonify({'reservationId':uid})
	
if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=5000)