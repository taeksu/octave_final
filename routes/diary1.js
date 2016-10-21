
var express = require('express');
var router = express.Router();
var fs = require('fs');


// POST
	router.post('/', function(req, res, next) {
		
		
		fs.readFile('./diary', 'utf8', function(err, fWriter) {
					
					console.log("diary1 == "+fWriter);
					res.send({result:true, fWriter:fWriter});	
					
				});
	
		
	});	
	
	


module.exports = router