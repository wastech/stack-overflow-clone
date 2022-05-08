# stack-overflow-api-clone
>This is a stackOverflow cloned API (Application Programming Interface) that helps people find the answers they need, when they need them 


![st1](https://user-images.githubusercontent.com/56930241/167307268-b1770b0a-c0e0-4c8b-8f5

![st2](https://user-images.githubusercontent.com/56930241/167307272-4356d782-10cf-45c7-99a1-0da1288833ec.png)
![st3](https://user-images.githubusercontent.com/56930241/167307275-49abe8ba-43a5-4855-998e-c1ccdd9311bc.png)
![st4](https://user-images.githubusercontent.com/56930241/167307276-691ddc17-3aa5-4b64-98ab-669e86db1616.png)
![st5](https://user-images.githubusercontent.com/56930241/167307280-9547a67b-dc7a-49ef-a81e-66e88da7d6a5.png)
e-430171df01fe.png)

)



#### Features
>CRUD (Create, Read, Update And Delete)>
* Authentication with JWT (Reset Password with email) 
    - Login 
    - Register
    - Forgot Password
* API Security (NoSQL Injections, XSS Attacks, http param pollution etc)
* Ask Question
* View Questions
* Upvote or downvote question
* Answer Question
* Search (Questions,Tags, Answers and Users)


### Stack

  * NodeJS
  * Authentication with jsonwebtoken
  * MongoDB
  * ExpressJS 
  * Mongoose

### Configuration File

Rename the config/.env.example to .env, then modify to your environment variables, mongodb uri, set your JWT_SECRET and SMTP variables

```
    NODE_ENV=development
    PORT=3000
    MONGO_URI=YOUR_URL
    
    JWT_SECRET=YOUR_SECRET
    JWT_EXPIRE=30d
    JWT_COOKIE_EXPIRE=30
    
    SMTP_HOST=smtp.mailtrap.io
    SMTP_PORT=2525
    SMTP_EMAIL=
    SMTP_PASSWORD=
    FROM_EMAIL=noreply@quizapp.com
    FROM_NAME=wastech
 ```
 
 ### HTTP Requests
 All API requests are made by sending a secure HTTPS request using the GET, POST, PUT methods to work with the 3 resource
 * Users
 * Questions
 * Answers
 * Comments
 * Tag


### Installation
Install all npm dependecies

```npm install```

Install nodemon globally

```npm install -g nodemon```
