var express = require("express");
var app = express();

// Get All Category
app.get("/category", function (req, res) {
  var gplay = require("google-play-scraper");
  const data = gplay.categories().then((data) => res.end(JSON.stringify(data)));
});

// Get all apps by Category and the collection type
app.get("/apps/:categoryCode/:collection", function (req, res) {
  var gplay = require("google-play-scraper");
  gplay
    .list({
      category: req.params.categoryCode,
      collection: req.params.collection,
      num: 500,
    })
    .then((data) => res.end(JSON.stringify(data)));
});

// Get app Details
app.get("/app-detail/:appId", function (req, res) {
  var gplay = require("google-play-scraper");
  gplay
    .app({ appId: req.params.appId })
    .then((data) => res.end(JSON.stringify(data)));
});

// Get inital 100 app Reviews
app.get("/app-review/:appId", function (req, res) {
  var gplay = require("google-play-scraper");
  gplay
    .reviews({ appId: req.params.appId, sort: gplay.sort.RATING, num: 50 })
    .then((data) => res.end(JSON.stringify(data)));
});

// Get inital 100 app Reviews
app.get("/app-review/all/:appId", function (req, res) {
  var gplay = require("google-play-scraper");
  gplay
    .reviews({ appId: req.params.appId, sort: gplay.sort.RATING, num: 3000 })
    .then((data) => res.end(JSON.stringify(data)));
});

// Server
// var server = app.listen(3000, function () {
//   var host = server.address().address;
//   var port = server.address().port;
//   console.log("Example app listening at http://%s:%s", host, port);
// });

var PORT = process.env.PORT || 8080;

var http = require("http");
var server = http.Server(app);

app.use(express.static("client"));

server.listen(PORT, function () {
  console.log("Running apk directory apis..");
});
