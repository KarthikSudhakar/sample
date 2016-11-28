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

    # def __init__(self,firstname, lastname, username, password, authenticated=None):
    #     self.first_name = firstname
    #     self.last_name = lastname
    #     self.username = username
    #     self.password = password
    #     self.authenticated = False

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

# models for which we want to create API endpoints
app.config['API_MODELS'] = {'employee': Employee}

# models for which we want to create CRUD-style URL endpoints,
# and pass the routing onto our AngularJS application
app.config['CRUD_URL_MODELS'] = {'employee': Employee}
