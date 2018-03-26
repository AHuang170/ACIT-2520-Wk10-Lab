const express = require('express');
const request = require('request');
const geocode = require('./public/gmaps.js');
const darksky = require('./public/darksky.js');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 8080;

var app = express();

var weather = ''; //variable to hold the weather info
var staticLocation = '555 Seymour Street, Vancouver , BC';

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

hbs.registerPartials(__dirname+'/views/partials');

hbs.registerHelper('get_curr_date', () => {
	return `${new Date().getMonth() + 1} ${new Date().getDate()}`
})

//sample middleware
//this is executed at every render/page load
app.use((request, response, next) => {
	// var time = new Date().toString();
	// var log = `${time}: ${request.method} ${request.url}\n`;
	// fs.appendFile('server.log', log + '\n', (error) => {
	// 	if(error){
	// 		console.log('Unable to log message');
	// 	}
	// })
	response.render('maintenance.hbs');
	//next();
});

// here add routes
app.get('/', (request, response) => {
	// response.redirect('http://localhost:8080/main.html');
	response.render('main.hbs', {
		source: "http://www.apimages.com/Images/Ap_Creative_Stock_Header.jpg"
	});
});

app.get('/about', (request, response) => {
	// response.send(JSON.stringify(weather));
	
	
	// response.render('about.hbs', {
	// 	message: weather_message
	// })
	response.render('info.hbs', {
		content: "Name: Aldrich Huang    Birday: July 14    Summary: Current CIT student at BCIT",
		title: 'About',
		source: "http://www.apimages.com/Images/Ap_Creative_Stock_Header.jpg"

	});
});

app.get('/weather', (request, response) => {
	var weather_message = `The temperature in ${staticLocation} is ${weather.curr_temp}°F, and the current weather is ${weather.curr_summary}.`
	response.render('info.hbs', {
		content: weather_message,
		title: 'Weather',
		source: "http://www.apimages.com/Images/Ap_Creative_Stock_Header.jpg"
	})
});

app.listen(port, () => {
    console.log('Server is up on the port 8080');
    // here add the logic to return the weather based on the statically provided location and save it inside the weather variable

    geocode.getCoor(staticLocation).then((result) => {
			return darksky.get_forecast(result.lat, result.lng);
		}).then((result) => {
			// var output_string = `The temperature in ${staticLocation} is ${result.curr_temp} and is ${result.curr_summary}`;
			// console.log(output_string);
			weather = result;
		}).catch((error) => {
			console.log('Error:', result);
	});
});