## owrap

Javascript object wrapper that makes handling deeply nested field configurations easy.

### Usage
Say you have an object
```javascript
{
  _id: "AnId",
  field1: {
    $ref: "AnotherObject",
    data: "AnotherId"
  }
  field2: {
    $type: "virtual",
    fn: function(){
      return this.field1;
    }
  }
}
```
We can define control fields for any number of fields in an object, but parsing and interpreting these
control fields ad-hoc can get messy. Instead, we can use a configured isnstance of owrap to easily resolve
these objects.

```javascript
oWrap = require("owrap")();

//tell oWrap to always run a
oWrap.on('field:_id', function(field, callback) {
  console.log("Doing something with", field);
  callback(null, field);
});

//if it's a control field, the whole object value is passed to the function.
oWrap.on('control:$type', function(obj, callback) {
  if(obj.$type == 'virtual') {
    //do something
    callback(null, obj);
  } else {
    //do something else
    callback(null, obj);
  }
});

//we can even load events on more granular control types
oWrap.on('control:$type:virtual', function(obj, callback) {
  //do some operation on only virtual types
  callback(null, obj);
});
```
now if we have some object let's wrap it and resolve.
```javascript
var obj = {/* some object with control fields */};

var transformedObj = oWrap(obj).resolve();
```
