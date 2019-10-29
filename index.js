const express = require("express");
const server = express();

server.use(express.json());


server.get("/", (req, res) => {
    res.send("hello world");
})

const port = process.env.PORT || 7000;
server.listen(port, () => console.log(`running on port ${port}`));