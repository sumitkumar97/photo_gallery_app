# photo_gallery_app

# Steps to run

Change directory to project's directory

Install requirements

$ pip install -r req.txt

Set username and password for mysql in photolib/settings.py

$ python manage.py makemigrations

$ python manage.py migrate

$ python manage.py runserver

User can register/signup on 

http://127.0.0.1:8000/api/v1/rest-auth/registration/

User can login on

http://127.0.0.1:8000/api/v1/rest-auth/login/

After successful login user will receive csrf token in cookies.

The api calls will be made by passing the received X-CSRFToken as header for api calls.

album/urls.py contains the urlpatterns for api calls.
