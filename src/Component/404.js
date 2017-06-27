"use strict";
var React = require('react');
var Router=require('react-router');
var Link=Router.Link;



var NotFoundPage=React.createClass({

  render:function()
  {
    return(
     <div>
     <h1>Page Not found</h1>
     <Link to="app" >Back to Home</Link>
     </div>
   );
  }
});
module.exports=NotFoundPage;
