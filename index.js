// code away!
const server = require("./server.js");


// server.listen(4000, () => {
//   console.log("\n*** Server Running on http://localhost:4000 ***\n");
// });

const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});