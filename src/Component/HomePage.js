"use strict";
var React = require('react');
var Router=require('react-router');
var Link=Router.Link;



var HomePage=React.createClass({

  render:function()
  {
    return(
     <div className="jumbotron">
     <h1>Manage Author</h1>
     <Link to="about" className="btn btn-primary btn-lg">Learn More </Link>
     </div>
   );
  }
});
module.exports=HomePage;
