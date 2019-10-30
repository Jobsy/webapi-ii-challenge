const express = require("express");
const server = express();
const cors = require("cors");
const router = require("./data/posts-router");

server.use(express.json());
server.use(cors());
server.use("/api/posts", router);

server.get("/", (req, res) => {
    res.send("hello world");
})

module.exports = server;