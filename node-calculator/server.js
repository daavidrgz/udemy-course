/*jshint esversion:6*/

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
	var options = {
		root: __dirname
	};
	res.sendFile("/index.html", options, function(err) {
		if ( err )
			next(err);
		else
			console.log("Sent file: " + options.root + "/index.html");
	});
});

app.get("/bmicalculator", function(req,res) {
	res.sendFile(__dirname + "/bmicalculator/bmicalc.html");
});
app.post("/", function(req, res) {
	res.send("The result is: " + ((+req.body.fst_number) + (+req.body.snd_number)));
});

app.post("/bmicalculator", function(req, res) {
	var bmi = (+req.body.weight) / Math.pow((+req.body.height), 2);
	res.send("Your BMI is: " + bmi); 
});
app.listen(5000);
