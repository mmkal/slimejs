import express = require("express");
import fs = require("fs");
import path = require("path");
import util = require("util");
const nodeFetch: typeof fetch = require("node-fetch")
const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
});

const slimejsPath = "dist/slime.js";
const exists = fs.existsSync(slimejsPath);

if (exists && false) {
    app.get("/", (req, res) => res.sendFile(path.join(process.cwd(), "/index.html")));
    app.get("/" + slimejsPath, (req, res) => res.sendFile(path.join(process.cwd(), slimejsPath)));
} else {
    app.get("/", async (req, res) => nodeFetch("https://raw.githubusercontent.com/mmkal/slimejs/gh-pages/index.html")
        .then(response => response.text())
        .then(html => res.type('html').send(html))
        .catch(err => res.status(500).send({ error: util.inspect(err) }))
    );
    app.get("/" + slimejsPath, async (req, res) => nodeFetch("https://raw.githubusercontent.com/mmkal/slimejs/gh-pages/" + slimejsPath)
        .then(response => response.text())
        .then(js => res.type('application/javascript').send(js))
        .catch(err => res.status(500).send({ error: util.inspect(err) }))
    );
}

// hack: allow waking up server from github by requesting an 'image' in the readme :O
app.get("/wakeup.png", async (req, res) => res.type('png').send(""));

const hosts = [];

app.get("/ping", function(req, res) {
    res.send("pong");
})

app.get("/hosts", function(req, res) {
    res.send(hosts);
});

app.post("/deletehost", function(req, res) {
    const index = hosts.indexOf(req.query.id);
    if (index > -1) {
        hosts.splice(index, 1);
        res.sendStatus(200);
    } else {
        res.sendStatus(200);
    }
})

app.post("/takehost", function(req, res) {
    const exclude = req.query.me;
    const index = hosts.indexOf(exclude);
    if (index !== -1) {
        hosts.splice(index, 1);
    }
    console.dir(hosts);
    const host = hosts.pop();
    console.log("Host being taken: " + host);
    res.send(host);
    hosts.push(exclude);
    console.dir(hosts);
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/host", function(req, res) {
    const host = req.query.id;
    console.log("Host being added: " + host);
    hosts.push(host);
    res.sendStatus(200);
});

// listen for requests
const listener = app.listen(process.env.PORT || 5000, function () {
    console.log("App listening on port " + listener.address().port);
});