// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get("/", function(req, res) {
	res.render('index');
});

app.listen(4000, function() {
	console.log("Server running");
});
