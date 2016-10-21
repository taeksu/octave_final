var express = require('express');
var router = express.Router();
var JSON = require('json');
var mysql = require('mysql');
var session = require('express-session');
var fs = require('fs');

router.use(session({
	secret: 'octavecluster',
	resave: false,
	saveUninitialized: true
}));


var connection = mysql.createConnection({
    host : 'localhost',
    /* post : '22', */
    user : 'tshong',
    password : 'cluster',
    database:'octaveTest'
});


connection.connect(function(err) {
    if (!err) {
        console.log('DB sccess');
    }else{
		console.error('mysql connection error index.js');
        console.error(err);
        throw err;		
	}
});

//frist Page
router.get('/', function(req, res, next) {		
			res.render('loginPage', { title: 'Express', alert: ''});	
});


//logout Page
router.get('/logout', function(req, res, next) {		
	req.session.destroy(function(){
		res.render('loginPage', { logout: 'logout !!', alert: ''});	
	});
});


//main Page
router.post('/mainPage', function(req, res, next) {
	
	var userId = req.body.userId;
	var password = req.body.password;
	
	
	req.session.sucessId = userId;
	
	connection.query('select Id,Password from octaveMember where Id = ?',[userId], function(err, row){
	
	
	if(row != ''){
		var connId = row[0].Id;
		var connPw = row[0].Password;
		
		
			if(userId ==  connId && password == connPw){
				
				connection.query('select CHistoryLog, CHistoryTime from CommandHistory where CHMember = ?' ,[userId],function(err, rows){
					
					
					var path = './editorFile/'+userId+'/';
				
				
					fs.exists('./editorFile/', (userId) => {
					  /* console.log(userId ? 'it\'s there' : 'no passwd!'); */
					  userId ? console.log("It's exist file") : fs.mkdir(path,0666,function(err){ if(err){console.log(err) } });
					  
					});
					
					/* fs.mkdir(path,0666,function(err){ if(err){console.log(err) } }); */
				
					fs.readdir(path, function (err, files) { 
					
						if(err) throw err;
					
						/* rows.forEach(function (row){console.log("row ===== "+JSON.stringify(row))}); */
					
						/* files.forEach(function(file) {console.log("start login == "+file);}); */
						
						res.render('index', { alert: 'sucess', sucessId : req.session.sucessId  ,fileNames : files, CHistory:rows });
						
					});
					
					
				
				});
				
			}else{
				
				res.render('loginPage', { alert: 'check password' });
			}

	}else{
				
		/* res.append('<script>alert("정상로그인 했습니다.");"</script>'); */
		res.render('loginPage',{ alert: 'check yourId' });
	}
  
  });
  
});

module.exports = router;
