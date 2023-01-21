// index.js
const messages = require("./messages.js");
// or using destructuring:
// const { message1, message2 } = require("./messages.js");

console.log(messages.message1); // Logs: "hello"
console.log(messages.message2); // Logs: "goodbye"
console.log(process.env.TEST);

const server = require("./server.js");

// server.listen(3000, () => console.log("Listening at http://localhost:3000"));


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));





