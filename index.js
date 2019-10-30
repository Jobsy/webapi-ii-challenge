
const server = require("./server")

const port = process.env.PORT || 7000;
server.listen(port, () => console.log(`running on port ${port}`));