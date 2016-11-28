from getpass import getpass
import bcrypt
import sys
from myapp.core import db
from myapp import app
from myapp.models import Employee

def main():
	db.init_app(app)
	db.app = app
	with app.app_context():
		db.metadata.create_all(db.engine)
	if Employee.query.all():
		print ('A user already exists! Create another? (y/n): '),
		create = input()
		if create == 'n':
			return
	
	print ('Enter First Name: '),
	first_name = raw_input()	
	print ('Enter Last Name: '),
	last_name = raw_input()	
	print ('Enter User name: '),
	username = raw_input()		
	password = getpass(prompt='Password:')
	assert password == getpass('Password (again):')
	


	user = Employee(username=username, password=bcrypt.hashpw(password.encode('utf-8'),bcrypt.gensalt()))
	user.first_name = first_name
	user.last_name = last_name
	db.session.add(user)
	db.session.commit()
	print ('User Added')

if __name__ == '__main__':
 		sys.exit(main())