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
    const { url } = req;
    const { id } = req.params;


    dB.update(id, post)
        .then((usersID) => {
            if(usersID > 0){
                res.status(201).json({ postedContent: post, url: url, operation: "POST" })
            }
            res.status(400).json({ message: "The post with the specified ID does not exist." })
        })
        .catch(() => {
            res.status(500).json({ error: "There was an error while saving the comment to the database" })
        })
})

const port = process.env.PORT || 7000;
server.listen(port, () => console.log(`running on port ${port}`));