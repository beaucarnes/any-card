'use strict';

var express = require('express');
var router = express.Router();
var path = require('path')
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost/database';

router.get('/:param*', function(req, res) {
  var name = req.url.slice(1).toLowerCase();
  
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      console.log('Connection established to', url);

      var collection = db.collection('names');
      
      if (name === 'deleteall') {
          collection.remove({})
          res.send('database reset')
      } else {
      
      
      collection.find({name: name}).toArray(function (err, result) {
        if (err) {
          console.log(err);
        } else if (result.length) {
            
          console.log('Found:', result[result.length-1]);
          var card = result[result.length-1].card + '.png';
          res.sendFile(path.join(__dirname + '/cards/' + card));
        } else {
          res.sendStatus(404);
        }
        
        
        //Close connection
        db.close();
      });
      }
    }

    })
})

module.exports = router;