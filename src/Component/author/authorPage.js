var React = require('react');
var Router=require('react-router');
var Link=Router.Link;
var authorStore=require('../../stores/authorStore');
function setStatesData()
{
  return {
    Author:JSON.parse(JSON.stringify(authorStore.getAuthor()))
  }
}
var Author=React.createClass({
  getInitialState:function()
  {
     return setStatesData();
  },
componentWillMount:function()
{
    authorStore.addChangeListener(this._onChange);
    authorStore.getAuthorApiCall();
  //this.setState({Author:AuthorApi.getAllAuthors()});
},
componentWillUnmount:function()
{
    authorStore.removeChangeListener(this._onChange);
},
DeleteAuthor:function(event)
{
  var Id=event.target.id;
  authorStore.deleteAuthor(Id);
},
_onChange:function()
{
  this.setState(setStatesData());
},
Search:function(event)
{
  var name=$('#search').val();
  console.log(name);
  authorStore.searchAuthor(name);

},
  render:function()
  {
    var CreateAuthor=function(author)
    {
      return(
        <tr key={author.id}>
          <td><Link to="ManageAuthor" params={{id:author.id}}>{author.id}</Link></td>
          <td>{author.firstname}</td>
          <td>{author.lastname}</td>
          <td id={author.id}><button className='btn btn-danger' id={author.id} onClick={this.DeleteAuthor}>Delete</button></td>
        </tr>
      );
    };
    return(
      <div>
        <h1> Authors </h1>

        <Link to="addAuthor" className="btn btn-default">Add Author</Link>
        <br />
        <br />
        <div>
        <input type="text" className="form-control" id="search" style={{"width":"200px;","display":"inline-block","margin-right":"10px;"}}/>
        <button className="btn btn-primary" onClick={this.Search} style={{"display":"inline-block"}}>Search</button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>firstname</th>
              <th>lastname</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.Author.length> 0 ? this.state.Author.map(CreateAuthor,this):null}
          </tbody>
        </table>
      </div>
    );
  }
});
module.exports=Author;
