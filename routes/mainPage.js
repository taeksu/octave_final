var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/mainPage', function(req, res, next) {
	
	console.log("check page");
	
  res.render('index', { title: 'Express' });
});

module.exports = router;