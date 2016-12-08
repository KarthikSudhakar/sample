import os

from flask import Flask, request, flash, jsonify, json
import requests
from flask import render_template, url_for, redirect, send_from_directory
from flask import send_file, make_response, abort
from flask_login import login_user, login_required, logout_user, current_user


from myapp import app


from myapp.core import api_manager
from myapp.core import login_manager
from myapp.models import *
from myapp.common import Response

# routing for API endpoints, generated from the models designated as API_MODELS
# for model_name in app.config['API_MODELS']:
#     model_class = app.config['API_MODELS'][model_name]
#     api_manager.create_api(model_class,)
api_manager.create_api(Employee, methods=['GET','PUT', 'POST','DELETE'])
api_manager.create_api(Room, methods=['GET', 'POST','DELETE'])
api_manager.create_api(Roomtype, methods=['GET', 'POST','DELETE'])
api_manager.create_api(Reservation, methods=['GET', 'POST','DELETE'])
api_manager.create_api(Customer, methods=['GET', 'POST','DELETE'])
api_manager.create_api(Roomoccupancy, methods=['GET', 'POST','DELETE'])
api_manager.create_api(Extensionrequests, methods=['GET', 'POST','DELETE'])    

session = api_manager.session

#db.app = app    

def auth_func(**kw):
    if not current_user.is_authenticated():
        raise ProcessingException(description='Not Authorized', code=401)



@login_manager.user_loader
def load_user(username):
    return Employee.query.filter_by(username = username).first()

@login_manager.unauthorized_handler
def unauthorized(msg=None):
    '''Handles unauthorized request  '''
    return Response.make_error_resp(msg="You're not authorized!", code=401)  



# routing for basic pages (pass routing onto the Angular app)
@app.route('/api/login', methods=['GET','POST'])
def login():
    
    if request.method == 'GET':
        return make_response(open('myapp/templates/index.html').read())
    elif request.method == 'POST':
        form = request.json
        user=Employee.query.filter_by(username=form['username']).first()
        if user:
            pwd = form['password'].encode('utf-8') 
            if bcrypt.checkpw( pwd, user.password.encode('utf-8')):
                user.authenticated = True
                db.session.add(user)
                db.session.commit()
                login_user(user)
                print(current_user)
                return jsonify({'result': True})                
            else:
                flash('Username and password pair not found')  
                return jsonify({'result': False})         
        else:
            flash("user doesn't exist")
            return jsonify({'result': False})

@app.route('/api/authenticated', methods=['GET'])
@login_required
def validateLogin():
    return Response.make_data_resp(current_user.to_json())

@app.route("/api/logout", methods=['GET'])
@login_required
def logout():
    user = current_user
    user.authenticated = False
    db.session.add(user)
    db.session.commit()
    logout_user()
    return Response.make_success_resp()    



@app.route('/')
def index():
    return make_response(open('myapp/templates/index.html').read())


# routing for CRUD-style endpoints
# passes routing onto the angular frontend if the requested resource    
from sqlalchemy.sql import exists

crud_url_models = app.config['CRUD_URL_MODELS']


# @app.route('/<model_name>/')
# @app.route('/<model_name>/<item_id>')
# def rest_pages(model_name, item_id=None):
#     print("coming here into models");
#     if model_name in crud_url_models:
#         model_class = crud_url_models[model_name]
#         if item_id is None or session.query(exists().where(
#                 model_class.id == item_id)).scalar():
#             return make_response(open(
#                 'myapp/templates/index.html').read())
#     abort(404)

@app.route('/<model_name>/')
@app.route('/<model_name>/<item_id>')
# catch all other requests here
def rest_pages(model_name, item_id=None):
    return make_response(open('myapp/templates/index.html').read())


# special file handlers and error handlers
@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'img/favicon.ico')


@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404
