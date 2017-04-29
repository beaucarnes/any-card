'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var path = require('path')
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost/database';

router.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
router.use(bodyParser.json());

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/secret.html'));
});

router.post('/', function(req, res){
    
    
      MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      console.log('Connection established to', url);

      var collection = db.collection('names');
      
            var entry = {name: req.body.name.toLowerCase(), card: req.body.number + '_of_' + req.body.suit};
            if(!err){
                console.log(JSON.stringify(entry))
                collection.insert(entry, function (err, result) {
                if (err) {
                  console.log(err);
                } else {
                  console.log('Inserted into database');
                  res.send('Not Found');
                }
                
                db.close();
        
              });
            }
        }
        });
  
     
    
});

module.exports = router;