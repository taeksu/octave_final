
var express = require('express');
var router = express.Router();
var fs = require('fs');




// POST
	router.post('/', function(req, res, next) {
		
		
		fs.readFile('./diary', 'utf8', function(err, fWriter) {
			
					console.log("diary2 == "+fWriter);
					res.send({result:true, fWriter:fWriter});	
					
				});
	
		fs.exists('diary',function(exists){
			if(exists ){
				fs.unlink('diary', function (err) {
					if (err) throw err;
				  console.log('successfully deleted diary');
				}); 	
			}
			
		});
		
	});	
	





module.exports = router