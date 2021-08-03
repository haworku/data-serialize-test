var avrojs = require("avsc");
var data = require("./domain-models/contractAmendmentInfo.ts");

const avrojsType = avrojs.parse("./src/test.avsc");

console.log("--- testing avsc ---");
// serialize/deserialize
// var buf = avrojsType.toBuffer(data.sampleContractAmendmentInfo1); // Serialized object.
// var obj = avrojsType.fromBuffer(buf); // {kind: 'CAT', name: 'Albert'}
// console.log(buf, obj);

//Generate random instances of a schema. We might be able to use this for testing?!
var type = avrojs.parse(avrojsType);
var randomInstance = type.random(); // E.g. Buffer([48, 152, 2, 123])
console.log("randomInstance: ", randomInstance);

// Check validity
console.log(
  "valid data",
  avrojsType.isValid(data.sampleContractAmendmentInfo1)
);
console.log(
  "more valid data",
  avrojsType.isValid(data.sampleContractAmendmentInfo2)
);
console.log(
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

var paths1 = getInvalidPaths(avrojsType, data.sampleContractAmendmentInfo1);
var paths2 = getInvalidPaths(avrojsType, data.sampleContractAmendmentInfo2);

var pathsInvalid = getInvalidPaths(
  avrojsType,
  data.sampleContractAmendmentInfoInvalid
);

console.log(
  "this is an invalid instance",
  data.sampleContractAmendmentInfoInvalid
);
console.log("invalidPaths1: ", paths1);
console.log("invalidPaths2: ", paths2);
console.log("invalidPaths3: ", pathsInvalid);

/* Notes:
- for isValid checks to work properly the schema names need to make the object being passed in (including casing). This risks being another place we are doubling up on logic, another place to add a new field
- could Avro also handle any conditional logic (e.g. no otherItemBeingAmended unless the itemsBeingAmended has the OTHER enum). Seems like no
*/
