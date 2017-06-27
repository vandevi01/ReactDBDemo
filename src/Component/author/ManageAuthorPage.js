var React = require('react');
var AuthorForm=require('./authorForm');
var Router=require('react-router');
var authorStore=require('../../stores/authorStore');
var toastr=require('toastr');

function setStatedAuthor()
{
  return {
    author:authorStore.getAuthorById(),
    dirty:false
  }
}
var ManageAuthorPage=React.createClass({

  mixins:[
   Router.Navigation
  ],
  statics:{
   willTransitionFrom:function(transition,component){
     if(component.state.dirty && !confirm('Leave without saving?'))
     {
       transition.abort();
     }
   }
 },
  getInitialState:function()
  {
    return setStatedAuthor();
  },
  componentWillMount:function()
  {
    authorStore.addChangeListener(this._onChange);
   var Authorid=this.props.params.id;
    if(Authorid)
    {
      authorStore.getAuthorByIdCall(Authorid);
     //  this.setState({author:AuthorApi.getAuthorById(Authorid)});
    }
      console.log(this.state);
  },
  componentWillUnmount:function()
  {
      authorStore.reset();
      authorStore.removeChangeListener(this._onChange);
  },
  _onChange:function()
  {
    this.setState(setStatedAuthor());
  },
  setAuthorState:function(event)
  {
    this.setState({dirty:true});
    var field=event.target.name;
    var value=event.target.value;
    this.state.author[field]=value;

    return this.setState({author:this.state.author});


  },
  saveAuthor:function(event)
  {
    event.preventDefault();
   console.log(this.state.author.id);
    if(this.state.author.id== '')
    {
      var data={firstname:this.state.author.firstname,lastname:this.state.author.lastname};

        console.log(data);
        authorStore.createAuthor(data);
        toastr.success('Author saved');
        this.transitionTo('authors');
        this.setState({dirty:false});
    }
    else {

       var updatedata={id:this.state.author.id,firstname:this.state.author.firstname,lastname:this.state.author.lastname}
       authorStore.updateAuthor(updatedata);
       toastr.success('Author updated');
       this.transitionTo('authors');
       this.setState({dirty:false});

    }

    //AuthorApi.saveAuthor(this.state.author);

  },
  render:function()
  {
	  console.log("%%%");
	  console.log(this.state.author);
    return(
       <AuthorForm author={this.state.author} onChange={this.setAuthorState} onSave={this.saveAuthor}/>
   );
  }
});
module.exports=ManageAuthorPage;
