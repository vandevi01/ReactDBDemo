var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var Constants = require('../constants/Constants');
var config=require('../../config');
var authorAction=require('../actions/authorAction');
var toastr=require('toastr');
var CHANGE_EVENT = 'change';
var _author=[];
var _authordata={id:'',firstname:'',lastname:''};
function getAuthorData(data)
{
  _author=data;
}
function getAuthorDataById(data)
{
  _authordata=data;
  console.log("callback method");
  console.log(_authordata);
}
var authorStore = assign({}, EventEmitter.prototype, {
  getAuthor:function()
  {
    return _author;
  },
  reset:function()
  {
    _authordata={id:'',firstname:'',lastname:''};
  },
  getAuthorById:function()
  {
    return _authordata;
  },
  emitChange: function() {
     this.emit(CHANGE_EVENT);
   },
   addChangeListener: function(callback) {
     this.on(CHANGE_EVENT, callback);
   },
   removeChangeListener: function(callback) {
   this.removeListener(CHANGE_EVENT, callback);
 },
  getAuthorApiCall:function()
  {
    $.ajax({
        url:config.APIURL+"author/get",
        type: "GET",
        success: function (data, textStatus, jqXHR) {
          authorAction.getAuthor(data);
        },
        error: function(xhr){
          toastr.error("error",'Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText,"error");
        }
      });
  },
  getAuthorByIdCall:function(id)
  {
    $.ajax({
        url:config.APIURL+"author/get/"+id,
        type: "GET",
        success: function (data, textStatus, jqXHR) {
			console.log("????");
			console.log(data);
          authorAction.getAuthorById(data);
        },
        error: function(xhr){
          toastr.error("error",'Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText,"error");
        }
      });
  },
  createAuthor:function(data)
  {
    $.ajax({
        url:config.APIURL+"createAuthor",
        type: "POST",
        data:data,
        success: function (data, textStatus, jqXHR) {

          authorStore.getAuthorApiCall();
          //callback();
        },
        error: function(xhr){
          toastr.error("error",'Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText,"error");
        }
      });
  },
  updateAuthor:function(data)
  {
    $.ajax({
        url:config.APIURL+"author/edit",
        type: "POST",
        data:data,
        success: function (data, textStatus, jqXHR) {

          authorStore.getAuthorApiCall();
          //callback();
        },
        error: function(xhr){
          toastr.error("error",'Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText,"error");
        }
      });
  },
  deleteAuthor:function(id)
  {
    $.ajax({
        url:config.APIURL+"author/delete/"+id,
        type: "POST",
        success: function (data, textStatus, jqXHR) {
          toastr.success('Author deleted');
            authorStore.getAuthorApiCall();
        },
        error: function(xhr){
          toastr.error("error",'Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText,"error");
        }
      });
  },
  searchAuthor:function(name)
  {
     if(name!="")
      {
        $.ajax({
            url:config.APIURL+"author/search/"+name,
            type: "GET",
            success: function (data, textStatus, jqXHR) {
                authorAction.getAuthor(data);
            },
            error: function(xhr){
              toastr.error("error",'Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText,"error");
            }
          });

      }
      else {
          authorStore.getAuthorApiCall();
      }

  }

});
AppDispatcher.register(function(action) {

  switch(action.actionType) {
    case Constants.GET_AUTHOR:
    getAuthorData(action.data);
    break;
    case Constants.GET_AUTHOR_ID:
    getAuthorDataById(action.data);
    break;
    default:
    // no op
  }
  authorStore.emitChange();
});
module.exports = authorStore;
