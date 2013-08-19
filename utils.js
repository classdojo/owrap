exports.deep = {};
exports.deep.get = function(k, obj){
  var keys = k.split(".");
  while(keys.length) {
    obj = obj[keys.shift()];
  }
  return obj;
}

exports.deep.set = function(k, v, obj) {
  var keys = k.split("."),
  ref = {};
  if(keys.length == 1) {
    ref = obj;
  }
  while(keys.length > 1) {
    ref = obj[keys.shift()];
  }
  ref[keys[0]] = v;
  return obj;
}
