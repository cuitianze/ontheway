var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://tianze:tianze123@ds048487.mongolab.com:48487/mean-first-20140706";

/* add Article */
router.post('/addArticle', function(req, res, next) {
	console.log('add')
	MongoClient.connect(url, function(err, db) {
		db.collection('article').insertOne(req.body, function(err, result) {
			console.log(result);
			res.end();
		})
	})
});

module.exports = router;
