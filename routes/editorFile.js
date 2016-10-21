var express = require('express');
var router = express.Router();
var fs = require('fs');


fs.mkdir('./editorFile', 0666, function(err) {console.log('Created newdir');});

	router.post('/save', function(req, res, next) {
			
		var content = req.body.contents;
		var fileName = req.body.fileName;
		var userId =req.body.userId;
		var path = './editorFile/'+userId+'/';
		var pathFile = path+fileName+'.m';
		
		
		fs.writeFile(pathFile, content, 'utf8', function(err) {
			
			console.log(fileName+'   ====   file success');
			
						fs.readdir(path, function (err, files) { 
				
							res.send({result:true , fileNames:files});		
					
						});
		});

	
		
	});	
	
	
	
	router.post('/saveAs', function(req, res, next) {
			
		var content = req.body.contents;
		var fileName = req.body.fileName;
		var userId =req.body.userId;
		var path = './editorFile/'+userId+'/';
		var pathFile = path+fileName+'.m';
		
		fs.exists(pathFile, (exists) => {
			if (exists) {
				console.error('myfile already exists');
				res.send({result:true , err:'err'});						
			} else {
				
				fs.writeFile(pathFile, content, 'utf8', function(err) {
					console.log(fileName+'   ====   file success');
					
						fs.readdir(path, function (err, files) { 
						
							res.send({result:true , fileNames:files});		
					
						});
				
				});
				
			}
		});
		
	router.post('/SendfileArray', function(req, res, next){
		
		var userId =req.body.userId;
		var path = './editorFile/'+userId+'/';
		
			fs.readdir(path, function (err, files) { 
						
					res.send({result:true , fileNames:files});		
					
				});
		
		});	
		
		
	});	



module.exports = router