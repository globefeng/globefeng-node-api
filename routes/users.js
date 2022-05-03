var express = require("express");
var router = express.Router();
const pgClient = require("../postgres");
var requestIp = require('request-ip');
const jwt = require("jsonwebtoken");

router.get("/", function(req, res) {
    pgClient.query("Select * from users", (err, results) => {
        if (!err) {
            res.json(results.rows);
            //res.send(requestIp.getClientIp(req));
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

router.post("/login", function(req, res) {
    const user = req.body;
    let findQuery = `Select * from users where name='${user.name}' AND password='${user.password}'`;
    console.log(findQuery);

    pgClient.query(findQuery, (err, results) => {
        if (!err && results.rows.length == 1) {
            const token = jwt.sign({name: user.name}, process.env.TOKEN_KEY, { expiresIn: "8h"})
            res.json({ "username": user.name, "token": token });
        } else {
            res.status(500).send("Invalid username and password");
        }
        pgClient.end();
    })
});

router.post("/register", function(req, res) {
    const user = req.body;
    console.log(user)

    let findQuery = `Select * from users where name='${user.name}'`;
    pgClient.query(findQuery, (err, results) => {
        if (!err && results.rows.length > 0) {
            res.status(500).send("user is already registered");
        }
        pgClient.end();
    })

    let insertQuery = `INSERT INTO users (name, password) values ('${user.name}', '${user.password}')`;

    pgClient.query(insertQuery, (err, results) => {
        if (!err) {
            const token = jwt.sign({name: user.name}, process.env.TOKEN_KEY, { expiresIn: "8h"})
            res.json({ "username": user.name, "token": token });
        } else {
            res.status(500).send("Fail to save the user");
        }
        pgClient.end();
    })
});


module.exports = router;
