var express = require("express");
var router = express.Router();
const pgClient = require("../postgres");

router.get("/", function(req, res) {
    pgClient.query("Select * from users", (err, results) => {
        if (!err) {
            res.json(results.rows);
        }
    })
    pgClient.end;
});

router.get("/:id", function(req, res) {
    pgClient.query(`Select * from users where id=${req.params.id}`, (err, results) => {
        if (!err) {
            res.json(results.rows);
        }
        else {
            res.send("Fail to get the user");
        }
    })
    pgClient.end;
});

router.post("/", function(req, res) {
    const user = req.body;
    console.log(user);
    let insertQuery = `INSERT INTO users (name, password) values ('${user.name}', '${user.password}')`;
    console.log(insertQuery);

    pgClient.query(insertQuery, (err, results) => {
        if (!err) {
            res.send("User is saved successfully");
        } else {
            res.status(500).send("Fail to save the user");
        }
    })
    pgClient.end;
});

router.delete("/:id", function(req, res) {
    pgClient.query(`delete from users where id=${req.params.id}`, (err, results) => {
        if (!err) {
            res.send('User is deleted');
        }
        else {
            res.send("Fail to get the user");
        }
    })
    pgClient.end;
});

module.exports = router;
