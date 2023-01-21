const express = require("express");

const server = express();

module.exports = server;

//for styling using static file (style.css)
const staticHandler = express.static("public");

server.use(staticHandler);

server.use(logger)

function logger(request, response, next) {
  console.log(request.method + " " + request.url);
  next();
} 

server.get("/uh-oh", (request, response) => {
  response.status(500);
  response.set({
      "x-fake-header": "my value",
      "x-another-header": "another value",
    });
  response.send("something went wrong");
});


server.get("/search", (request, response) => {
  const keyword = request.query.keyword;
  response.send(`<p>You searched for ${keyword}</p>`);
}); 

server.get("/", (request, response) => {
    const year = new Date().getFullYear();
    response.send(`
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Home</title>
          <link rel="stylesheet" href="/style.css">
        </head>
        <body>
          <h1>Hello, it's ${year}</h1>
        </body>
      </html>
      <form action="/search" method="GET">
      <input name="keyword" />
      </form>
    `); //could form /submit, method="post" name="name"
  });  

//post requests
// server.post("/submit", (request, response) => {
//   response.send("thanks for submitting");
// }); can't have multiple post requests

// server.get("/", logger, (request, response) => {
//   response.send("<h1>Hello</h1>");
// });

//dynamic paths
server.get("/users/:name", (request, response) => {
  const name = request.params.name;
  response.send(`<h1>Hello ${name}</h1>`);
});

server.use((request, response) => {
  response.status(404).send("<h1>Not found</h1>");
});

//post requests with post handler to see how we deal with forms submitting user data to our server
//requires a form
const bodyParser = express.urlencoded(); //what html forms submit by default
//line 72 is a middleware - chose express.urlencoded as the right middleware (like choosing format for request body-JSON, form submission etc)
//express.urlencoded adds a request.body property, which is an object containing the submitted data


server.post("/submit", bodyParser, (request, response) => {
  const name = request.body.name;
  response.send(`thanks for submitting, ${name}`);
}); // this is for testing as well - passes 
//can only do one server.post from the same endpoint 
//but can do multiple server.posts 

//----------------------------------------------------

//this example:
server.post("/submit", bodyParser, (request, response) => {
  const name = request.body.name;
  response.send(`thanks for submitting, ${name}`);
}); //is not best practice, it is better to write it like this:
//because better to *redirect* response to another page (think of don't refresh page after paying for something example)

server.post("/submit", bodyParser, (request, response) => {
  const name = request.body.name;
  response.redirect(`/submit/success?name=${name}`);
});

//but the /submit/success page doesn't exist, so need to create it:
server.get("/submit/success", (request, response) => {
  const name = request.query.name;
  response.send(`<p>thanks for submitting, ${name}</p>`);
});