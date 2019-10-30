const express = require("express");
const server = express();
const router = require("./data/posts-router");

server.use(express.json());
server.use("/api/posts", router);

server.get("/", (req, res) => {
    res.send("hello world");
})

module.exports = server;