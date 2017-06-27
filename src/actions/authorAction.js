var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');

var authorAction = {
  /**
   * get all job Action
   */
  getAuthor: function(data) {
    AppDispatcher.dispatch({
      actionType: Constants.GET_AUTHOR,
      data:data
    });
  },
  getAuthorById:function(data)
  {
    AppDispatcher.dispatch({
      actionType: Constants.GET_AUTHOR_ID,
      data:data
    });
  },

};

module.exports = authorAction;
