from myapp import app

from flask.ext.sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask.ext.restless import APIManager


db = SQLAlchemy(app)

login_manager = LoginManager()
login_manager.init_app(app)

#from myapp.models import *
api_manager = APIManager(app, flask_sqlalchemy_db=db)
#api_manager.create_api(Customer)

