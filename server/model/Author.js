	var cassie = require('cassie-odm');
    var config = {keyspace: "author_management", hosts: ["127.0.0.1:9042"]};
    cassie.connect(config);

    var authorSchema = new cassie.Schema(
	 {
		firstName:{ type: String},
		lastName:{ type: String}
	 }
	);
	
    var Author = cassie.model('Author', authorSchema);

    cassie.syncTables(config, function(err, results) {
    
    });

	module.exports=Author;