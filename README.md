## owrap

Javascript object wrapper that makes handling deeply nested field configurations easy.

### Tests
```bash
npm test
```

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
control fields ad-hoc can get messy. Instead, we can use a configured instance of owrap to easily resolve
these objects.  Owrap searches and resolves deeply nested fields too.

```javascript
oWrap = require("owrap")();

//tell oWrap to always run a
oWrap.on('field:_id', function(field) {
  console.log("Doing something with", field);
  return "SomeOtherVal";
});

//if it's a control field, the whole object value is passed to the function.
oWrap.on('control:$type', function(obj) {
  if(obj.$type == 'virtual') {
    //do something

  } else {
    //do something else
  }
  return "someOtherValue";
});

//we can even load events on more granular control types
oWrap.on('control:$type:virtual', function(obj) {
  //do some operation on only virtual types
  return "someOtherValue";
});
```
now if we have some object let's wrap it and resolve.
```javascript
var obj = {/* some object with control fields */};

var transformedObj = oWrap.resolve(obj);
```
