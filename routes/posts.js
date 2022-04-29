var express = require("express");
var router = express.Router();
var { Post } = require("../mongodb");

router.get("/", function(req, res) {
    Post.find().then(data => {
        res.json(data);
    }).catch(err => {
        res.send("Fail to get posts");
    })
});

router.get("/:postId", function(req, res) {
    Post.findById(req.params.postId).then(data => {
        res.json(data);
    }).catch(err => {
        res.send("Fail to get the post");
    })
});

router.post("/", function(req, res) {
    console.log(req.body)
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    })

    post.save().then((data) => {
        res.json(data);
    }).catch(err => {
        res.json({message: err})
    })
});

router.delete("/:postId", async (req, res) => {
    try {
      const removedPost = await Post.remove({_id: req.params.postId});
      res.json(removedPost);
    }
    catch (err) {
        res.json({message: err});
    } 
});

router.patch("/:postId", async (req, res) => {
    try {
      const updatedPost = await Post.updateOne({_id: req.params.postId},
        { $set: {
            title: req.body.title
        }});
      res.json(updatedPost);
    }
    catch (err) {
        res.json({message: err});
    } 
});

module.exports = router;
