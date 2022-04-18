# stack-overflow-api-clone


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
    

### Installation
Install all npm dependecies

```npm install```

Install nodemon globally

```npm install -g nodemon```
