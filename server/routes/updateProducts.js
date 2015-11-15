var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://cuitianze:cuitianze@ds054308.mongolab.com:54308/products';

router.post('/', function(req, res, next) {
	console.log(req.body, '请求');
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		db.collection('products').updateMany({"name": req.body.name}, {$set: req.body}, function(err, data) {
			assert.equal(null, err);
			db.collection('products').deleteOne({"name": null});
			db.collection('products').find({}).toArray(function(err, data) {
				assert.equal(null, err);
				res.json(data);
				db.close();
			})
		})
	})
})

module.exports = router;
