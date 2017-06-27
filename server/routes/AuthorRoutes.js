var Author=require('../model/Author');
var cassie = require('cassie-odm');
var config = {keyspace: "author_management", hosts: ["127.0.0.1:9042"]};
cassie.connect(config);
var authorSchema = new cassie.Schema(
		 {
			firstname:{ type: String},
			lastname:{ type: String}
		 }
		);
var Author = cassie.model('Author', authorSchema);

function getAuthor(callback)
{
    var Author = cassie.model('Author', authorSchema);
    Author.find({}).exec(function(err, results) { 
	  
	  if(err)
		callback(err);
	
	    callback(JSON.parse(JSON.stringify(results.toString())));

     });
}

function insertAuthor(req,callback)
{
    var author = new Author();
	author.firstname=req.body.firstname;
	author.lastname=req.body.lastname;
    author.save(function(err) {
       if(err)
		callback(err);
	
	   callback();
    });
}
function getAuthorById(id,callback)
{
	console.log(id);
    Author.findOne({id: id }, function(err, author) {
	 console.log(author);
    if (err) callback(err);
    callback(JSON.parse(JSON.stringify(author.toString())));
  });
}
function updateAuthor(req,callback)
{  
    Author.update({id: req.body.id}, {firstname: req.body.firstname,lastname:req.body.lastname}, function(err) {
        if(err) callback(err);
        callback({'info':'success'});
    });
}
function deleteAuthor(req,callback)
{
	Author.remove({id: req.params.id},function(err) {
        if(err) console.log(err);
		callback({'info':'success'});
    });
}
function searchAuthor(req,callback)
{ 
   if(req.params.name != "ALL")
   {
    Author.find({firstname:req.params.name} ).exec(function(err, data) {
               console.log(data.toString()); 
         if(err) callback(err);

         callback(JSON.parse(JSON.stringify(data.toString())));
    });
   }
}

module.exports={
  insertAuthor:insertAuthor,
  getAuthor:getAuthor,
  getAuthorById:getAuthorById,
  updateAuthor:updateAuthor,
  deleteAuthor:deleteAuthor,
  searchAuthor:searchAuthor
}
