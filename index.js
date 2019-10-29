const express = require("express");
const server = express();

server.use(express.json());
const dB = require("./data/db");

server.get("/", (req, res) => {
    res.send("hello world");
})

server.post("/api/posts", (req, res) => {
    const post = req.body;
    const { title, content } = req.body;
    const { url } = req;
    if (!title || !content) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
    dB.insert(post)
        .then(() => {
            res.status(201).json({ postedContent: post, url: url, operation: "POST" })
        })
        .catch(() => {
            res.status(500).json({ error: "There was an error while saving the post to the database" })
        })
});

server.post("/api/posts/:id/comments", (req, res) => {
    const post = req.body;
    const { title } = req.body;
    const { url } = req;
    const { id } = req.params;
    if (!title) {
        res.status(400).json({ errorMessage: "Please provide text for the comment." })
    }
    dB.update(id, post)
        .then((usersID) => {
            if (usersID > 0) {
                res.status(201).json({ postedContent: post, url: url, operation: "POST" })
            }
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        })
        .catch(() => {
            res.status(500).json({ error: "There was an error while saving the comment to the database" })
        })
})

server.get("/api/posts", (req, res) => {
    dB.find()
        .then((posts) => {
            res.status(200).json(posts)
        })
        .catch(() => {
            res.status(500).json({ error: "The posts information could not be retrieved." })
        })
})

server.get("/api/posts/:id", (req, res) => {
    const { id } = req.params;


    dB.findById(id)
        .then((posts) => {

            if (posts.length === 0) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
            res.status(200).json({ posts: posts })
        })
        .catch(() => {
            res.status(500).json({ error: "The post information could not be retrieved." })
        })
})


const port = process.env.PORT || 7000;
server.listen(port, () => console.log(`running on port ${port}`));