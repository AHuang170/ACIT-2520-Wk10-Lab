const request = require('request');
const gmap_api_header = "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDqT5FJOk0tTDsYLf_3ULaGHiq7oKeJCQQ&address=";

//console.log("Loaded Google Maps funcions...")

// var getCoor = (address, callback) => {

// 	console.log("Retrieving address coordinates...");

// 	request({
// 		url: gmap_api_header + encodeURIComponent(address),
// 		json: true
// 	}, (error, response, body) => {
// 		if (error){
// 			callback('Cannot connect to Google Maps');
// 		} else if (body.status === 'ZERO_RESULTS'){
// 			callback ('Cannot find requested address');
// 		} else if (body.status === 'OK'){
// 			callback(undefined, body.results[0].geometry.location);
// 		}
// 	});
// };

var getCoor = (address) => {
	//console.log("Retrieving address coordinates...");
	return new Promise((resolve, reject) => {

		request({
			url: gmap_api_header + encodeURIComponent(address),
			json: true
		}, (error, response, body) => {
			if (error){
				reject('Cannot connect to Google Maps');
			} else if (body.status === 'ZERO_RESULTS'){
				reject ('Cannot find requested address');
			} else if (body.status === 'OK'){
				resolve(body.results[0].geometry.location);
			}
		});

	});
}

module.exports = {
	getCoor
}