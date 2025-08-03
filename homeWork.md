- Create a respository
- Initialize the respository
- node_modules, package.json, package-lock.json
- Install Express
- Create a server
- Listen to the port 1818
- write request handlers for testing only /test, /about, /contact
- Install nodemon and update the script inside the package.json file
- what are the dependencies
- what is the use of "-g" while npm install
- difference between caret and tilde (^ and ~)


- initialize the git repo
- add .gitignore
- create remote repo on git hub
- push all code to remote region (git hub)
- play with routes and routes extensions ex: /hello  or /hello/2
- order of the routes matter here
- Install postman app and make a workspace/colletions >> test you API calls
- write a logic to handle GET, POST, PATCH, and DELETE API calls and test them on postman
- explore routing and use of ?, +, (), * in the routes
- use of regex in route /a/, /.*fly$/
- reading the query params in the route query object
- reading the dynamic routes using params object

EP:05: middlewares & handlers
- Multiple Routr Handlers
- next()
- next function along with errors
- app.use("/routes", rh1, [rh2, rh3], rh4, rh5)
- What is Middleware? why do we need it
- How express js basically handles request behind scenes
- Difference b/w app.use and app.all
- write a dummy auth middle ware for admin
- write a dummy auth middleware for all the user, routes, except /user/login
- Error Handling using app.use("/", (err, req, resp, next))


EP:06
- create a free cluster (mongodb atlas)
- install mongoose library
- connect your application to Database "Connection-url": /nalin-devTinder
- call the connectDB function and connect  to database before starting the server on 1818
- create a userSchema & userModel
- Create POST /signup  API to add  data into database
- Push some documents using API calls from postman
- Error Handling using try, catch

EP:07
- JS Object vs JSON Object
- add the express.json() milldleware to your app
- make your signup API  dynamci to receieve data from the end user
- to find the duplicates email ids using findOne() which one will it give you in output
- API - get user by email id
- API - feed API - GET /feed - get all the users from  the database
- Create a delete user API
- difference between PATCH and  PUT
- API - Update a user using userId
- Explore Mongoose documentation
- API - Update the user using emailID

EP:08
- explore the schematype option from the documentation
- add required, unique, lowercase, uppercase, min, minlength, maxlength, trim
- add default value
- create a custom validate function
- Improve the DB schema - PUT  appropriate validations on each filed in schema
- add timestamp to the user schema
- add API level validation on patch request and signup post api
- data sanitization add API validation for each filed
- Install validator npm package
- Explore what all the validator functions
- applied few validators on schema level like first name, email, password, photUrl etc...
- never ever trust your request.body it may contain melicous data