const test = require("node:test");
const assert = require("node:assert");
const server = require("../server.js");

test("the test works", () => {
  assert.equal(1, 1);
});

//Let’s write a test that verifies the route we just added. Our test should:

//Start the server
//Send a request to the server
//Verify the request was successful
//Retrieve the response body
//Verify that the response is what we expect
//Stop the server

//First we need a test function. 
//We will use an async function here so that Node knows to wait for any promises to resolve:
test("home route returns expected page", async () => {
    const app = server.listen(9876);//starting server in new port to avoid clashes 
    //send a request to the server:
    const response = await fetch("http://localhost:9876");
    app.close();
  
    assert.equal(response.status, 200);
    //check the response body
    const body = await response.text();
    // assert.equal(body, "hello");
    assert.match(response.body, /Hello it's 2023/);
  }); //test not passed - but in practice it does pass - only failed because it no longer matches Hello (has a form as well)
  

test("/uh-oh route returns error message", async () => {
  const app = server.listen(9876);
  const response = await fetch("http://localhost:9876/uh-oh");
  app.close();

  assert.equal(response.status, 500);
  const body = await response.text();
  assert.equal(body, "something went wrong");
}); //test passed

test("/search returns message including keyword", async () => {
  const app = server.listen(9876);
  const response = await fetch("http://localhost:9876/search?keyword=bananas");
  app.close();

  assert.equal(response.status, 200);
  const body = await response.text();
  assert.match(body, /You searched for bananas/);
}); //test passed

test("missing routes return 404 response", async () => {
  const app = server.listen(9876);
  const response = await fetch("http://localhost:9876/definitely-not-real");
  app.close();

  assert.equal(response.status, 404);
  const body = await response.text();
  assert.match(body, /Not found/);
}); //test passed

// test("/submit route responds to POST requests", async () => {
//   const app = server.listen(9876);
//   const response = await fetch("http://localhost:9876/submit", {
//     method: "POST",
//   });
//   app.close();

//   assert.equal(response.status, 200); // 200 is good 
//   const body = await response.text();
//   assert.match(body, /thanks for submitting/);
// }); //test passed

test("/submit route responds to POST requests", async () => {
  const app = server.listen(9876);

  const response = await fetch("http://localhost:9876/submit", {
    method: "POST",
    body: "name=oli", //notice this!
    headers: {
      "content-type": "application/x-www-form-urlencoded", //from urlencoded 
    },
  });
  app.close();

  assert.equal(response.status, 200);
  const body = await response.text();
  assert.match(body, /thanks for submitting, oli/);
})

//console.log things you're not sure of!
//can also use typeOf
