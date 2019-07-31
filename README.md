# photo_gallery_app

# Steps to run

Change directory to project's directory

Install dependencies

$ pip install -r req.txt

Set username and password for mysql in photolib/settings.py

$ python manage.py makemigrations

$ python manage.py migrate

$ python manage.py runserver

Development server starts at http://127.0.0.1:8000/