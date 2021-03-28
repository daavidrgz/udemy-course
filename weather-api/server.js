/*jshint esversion:6*/

const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
	
	res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
	const form = req.body;
});

app.get("/api/weather", function(req, res) {
	const url = "https://api.openweathermap.org/data/2.5/weather?q=Cangas,es&units=metric&appid=2d4effa0ce4033a6da21e1b80c3643f9";
	https.get(url, function(serverRes) {
		serverRes.on("data", function(data) {
			res.send(data);
		});
	});
});

app.listen(4000, function() {
	console.log("Server listening on port 3020");
});

function manageWeatherData(weatherData) {
	const icon = weatherData.weather[0].icon;
}
