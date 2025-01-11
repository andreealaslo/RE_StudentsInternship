# RE_StudentsInternship

## For the database
1. open pgAdmin and create a new database called **studentInternship**
2. Enter the application.properties file (backend -> src -> main -> resources) and edit it with your credentials (username, password, port)
3. Don't push the application.properties file to GitHub

## Restoring the database

1. create the database **studentInternship**
2. right-click on db -> Restore -> choose **dbSchema.sql**
3. if it doesn't work
    1. run the backend so that the tables are created
    2. right-click on db -> Query Tool -> copy-paste the content of **script.txt** and run

For swagger -> start the application and access the following URL: http://localhost:8080/swagger-ui/index.html#/
