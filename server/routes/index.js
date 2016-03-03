(function() {
 
  'use strict';
  var express = require('express');
  var router = express.Router();
  var mongojs = require('mongojs');
  var db = mongojs('silaw:souz0ku$@ds011168.mlab.com:11168/quizapplication'  , ['quizQuestions']);

 
  /* GET home page. */
  router.get('/', function(req, res) {
    res.render('index');
  });

  router.get('/quizQuestions', function(req, res) {
    db.quizQuestions.find(function(err, data) {
      res.json(data);
    });
  });

  router.get('/:name', function(req, res) {
    res.render('questionIndex');
  });

  router.get('/:name/results', function(req, res) {
    res.render('results');
  });

  router.post('/quizQuestions', function(req, res) {
    db.quizQuestions.insert(req.body, function(err, data) {
      res.json(data);
    });
 
  });
  
  router.put('/quizQuestions', function(req, res) {
    db.quizQuestions.update({
      _id: mongojs.ObjectId(req.body._id)
    }, {$set:{isRight: req.body.isRight}}, function(err, data) {
      res.json(data);
    });
  });

  router.delete('/quizQuestions/', function(req, res) {
    db.dropDatabase();
  });
 
  module.exports = router;
 
}());