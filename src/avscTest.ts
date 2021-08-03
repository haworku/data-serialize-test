var avrojs = require("avsc");
var data = require("./domain-models/contractAmendmentInfo.ts");

const avrojsType = avrojs.parse("./src/test.avsc");

/* TODO
- Add examples of serializing and deserializing data
*/

console.log("\n --- testing avsc ------------   \n");
// serialize/deserialize
// var buf = avrojsType.toBuffer(data.sampleContractAmendmentInfo1); // Serialized object.
// var obj = avrojsType.fromBuffer(buf); // {kind: 'CAT', name: 'Albert'}
// console.log(buf, obj);

//Generate random instances of a schema. We might be able to use this for testing?!
var type = avrojs.parse(avrojsType);
var randomInstance = type.random(); // E.g. Buffer([48, 152, 2, 123])
console.log("randomInstance: \n", randomInstance);

console.log("--- \n", "check validity");

console.log(
  "--- \n",
  "valid data",
  avrojsType.isValid(data.sampleContractAmendmentInfo1)
);
console.log(
  "--- \n",
  "more valid data",
  avrojsType.isValid(data.sampleContractAmendmentInfo2)
);
console.log(
  "--- \n",
  "invalid data",
  avrojsType.isValid(data.sampleContractAmendmentInfoInvalid)
);

// Calculate specific invalid fields for error handling
function getInvalidPaths(
  type: {
    isValid: (arg0: any, arg1: { errorHook: (path: any) => void }) => void;
  },
  val: any
) {
  var paths: any[] = [];
  type.isValid(val, {
    errorHook: function (path) {
      paths.push(path.join());
    },
  });
  return paths;
}

var pathsInvalid = getInvalidPaths(
  avrojsType,
  data.sampleContractAmendmentInfoInvalid
);

console.log("invalid paths: ", pathsInvalid);
