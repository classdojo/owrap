var OWrap = require(".."),
expect = require("expect.js"),
testObjects = require("./testobjects"),
deepcopy = require("deepcopy"),
equal = require("deep-equal"),
_ = require("underscore");


describe(".on", function() {
  it("should pass the right value to a field on event", function(next) {
    var owrap = OWrap();
    var testObject = testObjects.plain;
    owrap.on("field:_id", function(val) {
      expect(val).to.equal(testObject._id);
      next();
    });
    owrap.resolve(testObject);
  });

  it("should pass the right object to a control on event");

});

describe("field", function() {

  it("should transform a field properly", function(next) {
    var newId = "TransformedId";
    var testObject = _.extend(deepcopy(testObjects.plain), {_id: newId});
    var owrap = OWrap();
    owrap.on("field:_id", function(val) {
      return newId;
    });
    var newObject = owrap.resolve(testObjects.plain);
    expect(equal(newObject, testObject)).to.be.ok();
    next();
  });

  it("should transform two fields properly", function(next) {
    var newId = "TransformedId";
    var newName = "TransformedName";
    var testObject = _.extend(deepcopy(testObjects.plain), {_id: newId, name: newName});
    var owrap = OWrap();
    owrap.on("field:_id", function(val) {
      return newId;
    });
    owrap.on("field:name", function(val) {
      return newName;
    });
    var newObject = owrap.resolve(testObjects.plain);
    expect(equal(newObject, testObject)).to.be.ok();
    next();
  });

  it("should ignore events on fields that don't exist");

});

describe("control", function() {
  it("should transform a control reference", function(next) {
    var newName = "transformedRef";
    var testObject = _.extend(deepcopy(testObjects.ref), {name: newName});
    var owrap = OWrap();
    owrap.on("control:$type", function(obj) {
      return newName;
    });
    var newObject = owrap.resolve(testObjects.ref);
    expect(equal(newObject, testObject)).to.be.ok();
    next();
  });

  //eg. owrap.on("control:$ref:validation" ... );
  it("should transform a specific control reference");

  it("should ignore events on controls that don't exist");

});
