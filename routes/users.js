var express = require("express");
var router = express.Router();

router.get("/", function(req, res) {
    res.send("users will be list here");
});

module.exports = router;
