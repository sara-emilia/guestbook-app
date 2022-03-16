const { response, request } = require("express");
var fs = require("fs");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./project_1"));
app.use(express.static(__dirname + "/images"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/ajaxmessage", function (req, res) {
  res.sendFile(__dirname + "/ajaxmessage.html");
});

app.post("/ajaxmessage", function (req, res) {
  var data = require("./exampledata.json");
  data.push({
    username: req.body.username,
    country: req.body.country,
    message: req.body.message,
    date: new Date().toDateString(),
  });

  var jsonStr = JSON.stringify(data);
  fs.writeFile("exampledata.json", jsonStr, (err) => {
    if (err) throw err;
    console.log("It's saved!");
  });
  res.send(
    "Your greetings have been saved! Read all greetings from /guestbook."
  );
});

app.get("/newmessage", function (req, res) {
  res.sendFile(__dirname + "/newmessage.html");
});

app.post("/newmessage", function (req, res) {
  var data = require("./exampledata.json");

  data.push({
    username: req.body.username,
    country: req.body.country,
    message: req.body.message,
    date: new Date().toDateString(),
  });

  var jsonStr = JSON.stringify(data);

  fs.writeFile("exampledata.json", jsonStr, (err) => {
    if (err) throw err;
    console.log("It's saved!");
  });
  res.send(
    "Your greetings have been saved! Read all greetings from /guestbook."
  );
});

app.get("/guestbook", function (request, response) {
  var data = require(__dirname + "/exampledata.json");

  var results = '<table border="1">';
  for (var i = 0; i < data.length; i++) {
    results +=
      "<tr>" +
      "<td>" +
      data[i].username +
      "</td>" +
      "<td>" +
      data[i].country +
      "</td>" +
      "</tr>" +
      "<td>" +
      data[i].date +
      "</td>" +
      "</tr>" +
      "<td>" +
      data[i].message +
      "</td>" +
      "</tr>";
  }
  response.send(results);
});

app.get("*", function (request, response) {
  response.status(404).send("Can't find the requested page");
});

var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log("Example app is listening on port %d", PORT);
});
