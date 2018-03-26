const request = require('request');
const SECRETKEY = "6ccb4f4b68df2fd0ddf60972d00e46e0";

const dark_sky_api_header = `https://api.darksky.net/forecast/${SECRETKEY}`;

//console.log("Loaded DarkSky functions...");

// var get_forecast = (latitude, longitude, callback) => {

// 	console.log("Retrieving weather data...");

// 	dark_sky_address = `${dark_sky_api_header}/${latitude},${longitude}`;
	
// 	request({
// 		url: dark_sky_address,
// 		json: true
// 	}, (error, response, body) => {
// 		if(error){
// 			callback("Cannot connect to DarkSky...");
// 		} else if (response.statusCode !== 200) {
// 			callback("Unable to retrieve results...");
// 		} else if (response.statusCode === 200) {
// 			result = {
// 				curr_summary: body.currently.summary,
// 				curr_temp: body.currently.temperature,
// 				day_humid: body.daily.data[0].humidity,
// 				day_precip: body.daily.data[0].precipProbability,
// 				day_summary: body.daily.data[0].summary,
// 				curr_alerts: body.alerts
// 			}
// 			callback(undefined, result);
// 		}
// 	});
// }

var get_forecast = (latitude, longitude, callback) => {

	//console.log("Retrieving weather data...");

	dark_sky_address = `${dark_sky_api_header}/${latitude},${longitude}`;
	
	return new Promise((resolve, reject) => {
		request({
			url: dark_sky_address,
			json: true
		}, (error, response, body) => {
			if(error){
				reject("Cannot connect to DarkSky...");
			} else if (response.statusCode !== 200) {
				reject("Unable to retrieve results...");
			} else if (response.statusCode === 200) {
				result = {
					curr_summary: body.currently.summary,
					curr_temp: body.currently.temperature,
					day_humid: body.daily.data[0].humidity,
					day_precip: body.daily.data[0].precipProbability,
					day_summary: body.daily.data[0].summary,
					curr_alerts: body.alerts
				}
				resolve(result);
			}
		});
	})

	
}


module.exports = {
	get_forecast
}