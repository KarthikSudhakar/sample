Getting Started:

1. clone this repo

2. pip install virtualenv
   virtualenv venv
   venv\scripts\activate


3. install all the necessary packages (best done inside of a virtual environment)
> pip install -r requirements.txt

4. run the app
> python runserver.py

5. create and seed the db (the server must still be running, so open a new terminal window first)
> python manage.py create_db 
 python manage.py seed_db --seedfile 'data/db_items.json'

6. check out your blog
> http://localhost:5000/blog

