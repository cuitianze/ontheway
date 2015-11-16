var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://cuitianze:cuitianze@ds054308.mongolab.com:54308/products';
// var url = 'mongodb://localhost:27017/products';


/* GET Products */
router.get('/', function(req, res, next) {
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		console.log('数据库连接成功！');
		db.collection('products').find({}).toArray(function(err, docs) {
			// assert.equal(null, err);
			// assert.equal(2, docs.length);
			res.send(docs);
			db.close();
		});
	})
});

/* POST Products */
router.post('/', function(req, res, next) {
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		console.log('数据库连接成功！');
		console.log(req.body.name)
		db.collection('products').find({"name": req.body.name}).toArray(function(err, data) {

			console.log('data is', data);

			if(data.length) {
				res.json({"status":1, "msg":"用户名已存在"});
				db.close();
			} else {

				db.collection('products').insertOne(req.body, function(err, data) {
					console.log('插入')
					assert.equal(null, err);
					db.collection('products').find({}).toArray(function(err, data) {
						assert.equal(null, err);
						res.json(data);
						db.close();
					});
				})

			}

		})
	})
});

module.exports = router;
