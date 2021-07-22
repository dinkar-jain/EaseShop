# EaseShop

It is a fully functional e-commerce website made with technologies like
  
**Front-End - React + Redux**
  
**Back-End - Node.js, Express.js & MongoDB**

It is made with the purpose of helping businesses have an online presence
and to increase their sales. It includes features like product filtering,
input validation, password hashing and many more...

#### Here is the demo : https://easeshop.herokuapp.com/

# To Run It Locally - 

1) Fork the repo and clone it

2) Make sure you have ***Node.js & MongoDB*** installed in your system

3) Open a terminal in the project folder and run (Only once while setting up) in the given order -

```
npm install
  
cd frontend
  
npm install
```

4) Create a file name ***.env*** in the project folder and write

```
MONGODB_URL = (Your localhost MONGODB URL)
  
JWT_SECRET = (Any secret key u want for hashing the passwords)
```

5) Start MongoDB service
6) Open two terminal windows one from the project main folder and another 
from the frontend folder (one for running Server and other for the UI) and
run command - ***npm run*** in both the terminals.

Note:- By default the client side code will run on port 3000 and the server side will run on port 5000.

7) Go to http://localhost:3000 to see the application running in any browser.
