var React = require('react');

var About=React.createClass({

  render:function()
  {
    return(
     <div>
     <h1>About</h1>
      <p>
      This application use the following Techanology:
      <ul>
       <li>React</li>
       <li>React-Router</li>
       <li>flux</li>
      </ul>
      </p>
     </div>
   );
  }
});
module.exports=About;
