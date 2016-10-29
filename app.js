const express = require("express");
const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
});

app.use(express.static("."));

app.get("/", function (request, response) {
    response.redirect("http://rawgit.com/mmkal/slimejs/gh-pages/index.html");
});

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