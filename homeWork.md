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


- Multiple Routr Handlers
- next()
- next function along with errors
- app.use("/routes", rh1, [rh2, rh3], rh4, rh5)
- What is Middleware? why do we need it
- How express js basically handles request behind scenes
- Difference b/w app.use and app.all
- write a dummy auth middle ware for admin
- write a dummy auth middleware for all the user, routes, except /user/login