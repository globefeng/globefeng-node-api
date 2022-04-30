var express = require("express");
var router = express.Router();
const pgClient = require("../postgres");
var requestIp = require('request-ip');

router.get("/", function(req, res) {
    pgClient.query("Select * from users", (err, results) => {
        if (!err) {
            // res.json(results.rows);
            res.send(requestIp.getClientIp(req));
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

router.post("/login", function(req, res) {
    const user = req.body;
    let findQuery = `Select * from users where name='${user.name}' AND password='${user.password}'`;
    console.log(findQuery);

    pgClient.query(findQuery, (err, results) => {
        if (!err && results.rows.length == 1) {
            res.json(results.rows);
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
