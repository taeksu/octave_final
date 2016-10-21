var express = require('express');
var router = express.Router();
var fs = require('fs');
var mysql = require('mysql');


var connection = mysql.createConnection({
    host : 'localhost',
    /* post : '22', */
    user : 'tshong',
    password : 'cluster',
    database:'octaveTest'
});


connection.connect(function(err) {
    if (!err) {
        console.log('sccess DB');
    }else{
		console.error('mysql connection error');
        console.error(err);
        throw err;		
	}

});

//diray 파일 초기화를 위한 삭제
// - 파일이 있으면 파일 삭제. 
fs.exists('diary',function(exists){
	if(exists ){
		fs.unlink('diary', function (err) {
			if (err) throw err;
		  console.log('successfully deleted diary');
		}); 	
	}
});


process.stdin.resume();
process.stdin.setEncoding('utf8');


const spawn = require("child_process").spawn;
const octave = spawn("/usr/bin/octave-cli",['-i']);


// 콘솔에 찍히게 하는 함수
function do_output(data){	
	process.stdout.write(data);
}	

octave.stdout.on('data',do_output);
octave.stderr.on('data',do_output);



// POST
	router.post('/', function(req, res, next) {
		
		var diary = req.body.diary;
		var msg = req.body.msg;
		var off = req.body.off;
		var time = req.body.time;
		
		var sucessId = req.body.sucessId;
		
		var cmd = diary+'\n'+msg+'\n'+off+'\n';
		
		
		octave.stdin.write(cmd);
		
		
		var ps = process.stdout.write(cmd);

		var data = [sucessId,msg,time];
		
		if(msg !=""){
			connection.query('insert into CommandHistory (CHMember,CHistoryLog,CHistoryTime) values (?,?,?)',data,function (err,results) {
				if(err) console.log(err);
				
			});
		}
		res.send({result:true , ps:ps});								
	});	
	
	router.post('/file', function(req, res, next) {
		
		var fileName = req.body.fileName;
		var userId = req.body.userId;
		
		var path = './editorFile/'+userId+'/';
				
					
		
		fs.readFile(path+fileName, 'utf8', function (err, data) { 


			res.send({result:true ,file:data});

		});

	});
	
	
	router.post('/fileEditor', function(req, res, next) {
		
		var fileName = req.body.fileName;
		var userId = req.body.userId;
		var content = req.body.contents;	
		
		var path = './editorFile/'+userId+'/';
		var pathFile = path+fileName;
		
		fs.open(pathFile,'w',function(err,fd){
			
			fs.writeFile(fd, content, 'utf8', function(err) {
				
				console.log('sucess and Run');
				
				fs.close(fd,function(){	

					fs.readFile(pathFile, function (err, data) { 
	
						if(err) throw err;

						const execFile = require('child_process').execFile;
						
							try{

								const child = execFile("/usr/bin/octave-cli", [pathFile], (error, stdout, stderr) => {
									
									console.log("error \n : "+error+"\nstdout \n : "+stdout);
									
									fs.readdir(path, function (err, files) { 
								
										res.send({result:true, ReadFile : stdout, errMas : stderr, fileNames : files });
							
									});
								
								});								
							
							}catch(exception){
									
								console.log(exception);
								
							}

						});
						
					});	

				});
			});	
			
			
		});

	
	router.post('/delFile',function(req, res, next) {
		
		var userId = req.body.userId;
		var fileName = req.body.fileName;
		
		var path = './editorFile/'+userId+'/';
		
		fs.unlink(path+fileName, function (err) {
		  
		  console.log('successfully deleted '+fileName);
		});
					
			fs.readdir(path, function (err, files) { 
						
							res.send({result:true , fileNames:files});		
					
						});
	});
	
	router.post('/renameFile',function(req, res, next) {
		
		var userId = req.body.userId;
		var fileName = req.body.fileName;
		var fileRename = req.body.fileRename;
		
		var path = './editorFile/'+userId+'/';
		
		fs.rename(path+fileName, path+fileRename+'.m', (err) => {
			
		  console.log('renamed complete');
		  
		});
		
			fs.readdir(path, function (err, files) { 
						
							res.send({result:true , fileNames:files});		
					
						});
		
	});
	
	
	

module.exports = router
