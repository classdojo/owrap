;(function(m) {

  var deep = require("deep"),
  deepcopy = require("deepcopy"),
  deepaccess = require("deep-access"),
  _        = require("underscore"),
  utils    = require("../utils");

  //consts
  var DELIM = ":";

  function OWrap(obj) {
    if (!(this instanceof OWrap)) {
      return new OWrap();
    }
    this.__on = {};
    this.__async = false;
  }

  OWrap.prototype.on = function(key, action) {
    this.__on[key] = action;
  }

  OWrap.prototype.resolve = function(obj) {
    var copy = deepcopy(obj);
    this.__handleFields(obj, copy);
    this.__handleControl(obj, copy);
    return copy;
  }

  OWrap.prototype.__handleFields = function(obj, copy) {
    var fieldKeyedObj = this.__filter(DELIM, new RegExp(/^field/));
    for(var key in fieldKeyedObj) { //sync only for now.
      if(utils.deep.get(key, obj)) {
        var val = fieldKeyedObj[key](copy[key]);
        utils.deep.set(key, val, copy);
      }
    }
  }

  OWrap.prototype.__handleControl = function(obj, copy) {
    var controlKeyedObj = this.__filter(DELIM, new RegExp(/^control/));
    for(var key in controlKeyedObj) { //sync only for now
      var control = key.split(DELIM);
      var controlField = control.shift();
      var controlRefs = deep.select(copy, function(o) {
        return _.isObject(o) && o[controlField];
      });
      if(!controlRefs.length) {
        continue;
      }
      controlRefs.forEach(function(v) {
        var j = v.path.join('.');
        var val = controlKeyedObj[key](utils.deep.get(j, obj));
        utils.deep.set(j, val, copy);
      });
    }

  }

  OWrap.prototype.__filter = function(delim, reg) {
    var newObj = {};
    for(var k in this.__on) {
      if(k.split(delim).shift().match(reg)) {
        newObj[k.split(delim).pop()] = this.__on[k];
      }
    }
    return newObj;
    // return _.filter(this.__on, function(v,k) {
    //   return k.split(delim).shift().match(reg);
    // });
  }
  m.exports = OWrap;
})(module);
