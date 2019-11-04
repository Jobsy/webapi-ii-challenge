
require("dotenv").config();

const server = require("./server")

const port = process.env.PORT;
server.listen(port, () => console.log(`running on port ${port}`));