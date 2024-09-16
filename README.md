Project management app similar to kanban board built using ReactJS and Django REST Framework 
This is the react repo 
be Repo: https://github.com/sachinbn96/DRF-project-management-kanban

Frontend deployed using vercel at: https://react-project-management-kanban.vercel.app/ 
Backend deplyed using railway deployed at: https://drf-project-management-kanban-production.up.railway.app/admin

Local front end setup:
npm install
npm run dev

Local backend Setup:
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver

Change backend_url to localhost in the constants.js file when running both locally
