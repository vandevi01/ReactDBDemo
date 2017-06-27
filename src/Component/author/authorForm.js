var React = require('react');

var authorForm=React.createClass({

  render:function()
  {
    return(
     <form>
       <h1>Manage Author </h1>
       <label htmlFor="firstName">First Name</label>
       <input type="text"
          name="firstname"
          className="form-control"
          placeholder="First Name"
          ref="firstname"
          onChange={this.props.onChange}
          value={this.props.author.firstname} />
        <br />
        <label htmlFor="lastName">Last Name</label>
          <input type="text"
             name="lastname"
             className="form-control"
             placeholder="Last Name"
             ref="lastname"
             onChange={this.props.onChange}
             value={this.props.author.lastname} />
           <br />
           <input type="submit" value="Save" className="btn btn-default" onClick={this.props.onSave}/>
     </form>
   );
  }
});
module.exports=authorForm;
