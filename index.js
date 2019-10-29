const express = require("express");
const server = express();

server.use(express.json());
const dB = require("./data/db");

server.get("/", (req, res) => {
    res.send("hello world");
})

server.post("/api/posts", (req, res) => {
    const posts = req.body;
    const { title, content } = req.body;
    const { url } = req;
    if (!title || !content) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
    dB.insert(posts)
        .then(() => {
            res.status(200).json({ postedContent: posts, url: url, operation: "POST" })
        })
        .catch(() => {
            res.status(500).json({ error: "There was an error while saving the post to the database" })
        })
})

const port = process.env.PORT || 7000;
server.listen(port, () => console.log(`running on port ${port}`));