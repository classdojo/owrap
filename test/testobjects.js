exports.plain = {
  _id: "originalId",
  name: "noRefs",
  location: "California"
}

exports.ref = {
  _id: "originalId",
  name: {
    $type: "ObjectId",
    data: "otherObjectId"
  },
  location: "California"
}
