//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

//send static files with express//
app.use(express.static('public'));

//MUST USE FOR BODY PARSER
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.PORT || 3000, function () {
	console.log('Server Running 3000');
});

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/signup.html');
});

app.post('/', function (req, res) {
	//Request.body.(name of input)
	var firstName = req.body.firstName;
	var lastName = req.body.lastName;
	var email = req.body.email;

	var data = {
		members : [
			{
				email_address : email,
				status        : 'subscribed',
				merge_fields  : {
					FNAME : firstName,
					LNAME : lastName
				}
			}
		]
	};

	var jsonData = JSON.stringify(data);

	var options = {
		url     : 'List URL',
		method  : 'POST',
		headers : {
			Authorization : 'API Key'
		},
		body    : jsonData
	};

	request(options, function (error, response, body) {
		if (error) {
			res.sendfile(__dirname + '/failure.html');
		} else if (response.statusCode !== 200) {
			res.sendfile(__dirname + '/failure.html');
		} else {
			res.sendfile(__dirname + '/success.html');
		}
	});
});

// redirect "try again" button back to home page
app.post('/failure.html', function (req, res) {
	res.redirect('/');
});
