/*jshint esversion:6*/

function reloadWeather() {
	reloadRotate(); // Animation
	$.ajax({url: "/api/weather"}).done(function(data) {
		const weatherData = JSON.parse(data);
		$("#current-temp").addClass("hide");
		$("#max-temp").addClass("hide");
		$("#min-temp").addClass("hide");
		$("#feels-like").addClass("hide");
		setTimeout(function() {
			$("#current-temp").text(parseInt(weatherData.main.temp));
			$("#max-temp").text(parseInt(weatherData.main.temp_max) + "°C");
			$("#min-temp").text(parseInt(weatherData.main.temp_min) + "°C");
			$("#feels-like").text(weatherData.main.feels_like + "°C");

			$("#current-temp").removeClass("hide");
			$("#max-temp").removeClass("hide");
			$("#min-temp").removeClass("hide");
			$("#feels-like").removeClass("hide");
		}, 300);
	});
}

function reloadRotate() {
	$("#reload-button").css("transform", "scale(1.5) rotate(360deg)");
	setTimeout(function() {
		$("#reload-button").css("transition", "all 0s");
		$("#reload-button").css("transform", "scale(1.5) rotate(0deg)");
		setTimeout(function() {
			$("#reload-button").css("transition", "all 1s");
		}, 100);
		
	}, 1000);
	
}
