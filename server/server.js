var express=require('express');
var app=express();
var mongoose = require('mongoose');
var AuthorRoutes=require('./routes/AuthorRoutes');
var bodyParser = require('body-parser');

const cassandra = require('cassandra-driver');
const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: 'author_management'});

app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

mongoose.connect('mongodb://localhost:27017/assignment',{}, (err) => {
    if (err) {
      console.log(err);
    }
  });

app.get('/',function(req,res){
  res.send({'info':'server started on 8080'});

});

app.post('/createAuthor',function(req,res){
  AuthorRoutes.insertAuthor(req,function(data){
     res.send(data);
  })

});
app.get('/author/get',function(req,res){
  AuthorRoutes.getAuthor(function(authors){
     console.log("log server.js"+authors);
     res.send(authors);
   });

});
app.get('/author/get/:id',function(req,res){
  AuthorRoutes.getAuthorById(req.params.id,function(data){
    res.send(data);
  });
});
app.post('/author/edit',function(req,res){
  AuthorRoutes.updateAuthor(req,function(data){
    res.send(data);
  })
});
app.post('/author/delete/:id',function(req,res){
  AuthorRoutes.deleteAuthor(req,function(data){
    res.send(data);
  })
});
app.get('/author/search/:name',function(req,res){
  AuthorRoutes.searchAuthor(req,function(searchdata){
    res.send(searchdata);
  })
});
app.listen(8080,function(err,result){
  console.log('server start on 8080');
});
