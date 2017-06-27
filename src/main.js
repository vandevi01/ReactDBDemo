
var React = require('react');
var Router=require('react-router');
var DefaultRoute=Router.DefaultRoute;
var NotFoundRoute=Router.NotFoundRoute;
var Route=Router.Route;

var data=(
    <Route name="app" path="/" handler={require('./Component/app')}>

         <DefaultRoute handler={require('./Component/HomePage')} />
         <Route name="authors"  handler={require('./Component/author/authorPage')} />
         <Route name="addAuthor" path="author" handler={require('./Component/author/ManageAuthorPage')} />
         <Route name="ManageAuthor" path="author/:id" handler={require('./Component/author/ManageAuthorPage')} />
         <Route name="about" handler={require('./Component/about/aboutpage')} />
         <NotFoundRoute handler={require('./Component/404')} />


    </Route>
  );
  Router.run(data,function(Handler){
    React.render(<Handler />,document.getElementById('app'));
  });
