from datetime import datetime
from myapp.core import db
from myapp import app
import bcrypt
from myapp.common.helper import JsonSerializer


# class Post(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     title = db.Column(db.String(80))
#     body = db.Column(db.Text)
#     pub_date = db.Column(db.DateTime)

#     def __init__(self, title, body, pub_date=None):
#         self.title = title
#         self.body = body
#         if pub_date is None:
#             pub_date = datetime.utcnow()
#         self.pub_date = pub_date

#     def __repr__(self):
#         return '<Post %r>' % self.title

class EmployeeJsonSerializer(JsonSerializer):
    __json_public__ = ['username']
    __json_modifiers__ = {}

''' Employee who administrates guests at hotel'''
class Employee(db.Model,EmployeeJsonSerializer):
    __tablename__ =  "employee"

   # id           = db.Column(db.Integer, , sqlite_autoincrement=True)
    first_name    = db.Column(db.String(120), nullable=False)
    last_name     = db.Column(db.String(120), nullable=False)
    username     = db.Column(db.String(120),  primary_key = True, index = True, unique = True, nullable=False)
    password      = db.Column(db.String(20), unique = True, nullable=False)
    authenticated = db.Column(db.Boolean)

    def __init__(self, username, password):

        self.username = username
        self.password = password
        self.authenticated = False

    def __repr__(self):
        return '<User %r>' % self.username

    def _get_password(self):
        return self.password

    def _set_password(self, password):
        pwd = password.encode('utf-8')
        self.password = bcrypt.hashpw(pwd,bcrypt.gensalt())

    def check_password(self, password):
        if self.password is None:
            return False
        pwd = password.encode('utf-8')     
        return bcrypt.checkpw(pwd, self.password)
    

    def is_authenticated(self):
        print(self.authenticated)
        return self.authenticated
    def is_active(self):
        return True
    def is_anonymous(self):
        return False
    def get_id(self):
        return str(self.username)

    @classmethod
    def is_user_name_taken(cls, user_name):
        return db.session.query(db.exists().where(Employee.username==user_name)).scalar()

class Customer(db.Model):
    __tablename__ = "customer"

    customer_id = db.Column(db.String(45),primary_key=True)
    first_name = db.Column(db.String(45))
    last_name = db.Column(db.String(45))
    email = db.Column(db.String(45))
    reservations = db.relationship('Reservation',backref='customer',lazy='dynamic')

    

class Roomtype(db.Model):

    __tablename__ = "roomtype"

    room_id = db.Column(db.Integer,primary_key=True)
    max_occupants= db.Column(db.Integer,nullable=False)
    description = db.Column(db.String(45))
    std_rate = db.Column(db.Float)
    no_beds = db.Column(db.Integer)
    rooms = db.relationship('Room', backref='roomtype',lazy='dynamic')
    

    # def __init__(self, max_occupants, description, std_rate,no_beds):
    #     self.max_occupants = max_occupants
    #     self.description = description
    #     self.std_rate = std_rate
    #     self.no_beds = no_beds

    def __repr__(self):
        return '<Room Type %r with %d>' % (self.description, self.no_beds)



class Room(db.Model):

    __tablename__ ='room'

    room_num = db.Column(db.Integer,primary_key=True)
    status = db.Column(db.String(45),nullable=False)
    room_type_id = db.Column(db.Integer, db.ForeignKey('roomtype.room_id'))


class Reservation(db.Model):

    __tablename__ ="reservation"

    id = db.Column(db.Integer,primary_key=True)
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=False)
    booking_timestamp = db.Column(db.DateTime, default=datetime.utcnow())
    customer_id = db.Column(db.Integer, db.ForeignKey('customer.customer_id'))
    room_type = db.Column(db.Integer, db.ForeignKey('roomtype.room_id'))
    roomtype = db.relationship('Roomtype', backref='reservation',uselist=False)


class Roomoccupancy(db.Model):

    __tablename__ = "roomoccupancy"

    id = db.Column(db.Integer,primary_key=True)
    checkin = db.Column(db.DateTime, nullable=False)
    checkout = db.Column(db.DateTime, nullable=False)
    customer_id = db.Column(db.Integer, db.ForeignKey('customer.customer_id'))
    room_id = db.Column(db.Integer, db.ForeignKey('room.room_num'))
    reservation_id = db.Column(db.Integer, db.ForeignKey('reservation.id'))
    customer = db.relationship('Customer',backref='roomoccupancy', uselist=False,lazy='joined')
    reservation = db.relationship('Reservation',backref='roomoccupancy', uselist=False,lazy='joined')
    room = db.relationship('Room',backref='roomoccupancy', uselist=False,lazy='joined')


class Extensionrequests(db.Model):
    __tablename__ = 'extensionrequests'

    extensionreqid = db.Column(db.Integer, primary_key=True)
    extend_to = db.Column(db.DateTime,nullable=False)
    status = db.Column(db.String(48))
    customer_id = db.Column(db.Integer, db.ForeignKey('customer.customer_id'))
    room_id = db.Column(db.Integer, db.ForeignKey('room.room_num'))
    reservation_id = db.Column(db.Integer, db.ForeignKey('reservation.id'))
    customer = db.relationship('Customer',backref='extensionrequests')
    room = db.relationship('Room',backref='extensionrequests', uselist=False,cascade='delete')

# models for which we want to create API endpoints
app.config['API_MODELS'] = {'employee': Employee}
app.config['API_MODELS'] = {'customer': Customer}
app.config['API_MODELS'] = {'room type': Roomtype}
app.config['API_MODELS'] = {'room': Room}
app.config['API_MODELS'] = {'reservation': Reservation}
app.config['API_MODELS'] = {'roomoccupancy': Roomoccupancy}
app.config['API_MODELS'] = {'extensionrequests': Extensionrequests}

# models for which we want to create CRUD-style URL endpoints,
# and pass the routing onto our AngularJS application
app.config['CRUD_URL_MODELS'] = {'employee': Employee}
app.config['CRUD_URL_MODELS'] = {'room': Room}
app.config['CRUD_URL_MODELS'] = {'room type': Roomtype}
app.config['CRUD_URL_MODELS'] = {'reservation': Reservation}
app.config['CRUD_URL_MODELS'] = {'customer': Customer}
app.config['CRUD_URL_MODELS'] = {'roomoccupancy': Roomoccupancy}
app.config['CRUD_URL_MODELS'] = {'extensionrequests': Extensionrequests}
