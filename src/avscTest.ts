import * as avrojs from "avsc";
var data = require("./domain-models/contractAmendmentInfo.ts");
const schema = avrojs.parse("./src/test.avsc");
const type = avrojs.Type.forSchema(schema);

console.log("\n testing avsc  \n");
console.log("---------------");

// Serialization/ Encoding
const toSerializable = (domainData: any) => type.toString(domainData);
const toDomain = (str: any) => type.fromString(str);
const testData = data.sampleContractAmendmentInfo1;
const str = toSerializable(testData);
const valFromString = toDomain(str);
const buf = type.toBuffer(testData);
const valFromBuffer = type.fromBuffer(buf);

console.log("given this data \n", testData);
console.log("--- \n", "a serialized string looks like \n", str);
console.log("--- \n", "deserialized looks like \n", valFromString);
console.log("--- \n", "an encoded buffer looks like \n", buf);
console.log("--- \n", "decoded from buffer looks like \n", valFromBuffer);

// Error handling
function getInvalidPaths(
  type: {
    isValid: (arg0: any, arg1: { errorHook: (path: any) => void }) => void;
  },
  val: any
) {
  var paths: any[] = [];
  type.isValid(val, {
    errorHook: function (path) {
      // console.log(path);
      if (path.length > 0) paths.push(path.join());
    },
  });
  return paths;
}

console.log(
  "--- \n",
  "given this invalid data \n",
  data.sampleContractAmendmentInfoInvalid
);
console.log(
  "--- \n",
  "a custom function for invalid fields can return invalid fields\n",
  getInvalidPaths(schema, data.sampleContractAmendmentInfoInvalid)
);
console.log(
  "--- \n",
  "and given this valid data \n",
  data.sampleContractAmendmentInfo2,
  "\n a custom function for invalid fields returns",
  getInvalidPaths(schema, data.sampleContractAmendment2)
);

// Other misc notes
// Took me quite awhile to figure out how to format the schema for an array of enums.
// Finally realized the "items" may contain any type, no matter how complex.
// Errors related to schema shape were quite vague - when a schema is malformatted it seems the main way to find out is just keep trying to serialize and then deserialize until it doesn't error.
// Wasn't able to get line number errors - would report which type had a issue but not where in the schema - if we go this route worth exploring more

// avsc has the ability to try and infer a schema type from a set of values using forValue
// const forValueType = avrojs.Type.forValue(data.sampleContractAmendmentInfo1);
// console.log("this is it", forValueType);

// Can generate random instances of a schema using .random
// var randomInstance = type.random();
// console.log(randomInstance)

// Can run validity checks using isValid. Note: this will not error for an improperly set up schema
// schema.isValid(data.sampleContractAmendmentInfo1) // returns true
// schema.isValid(data.sampleContractAmendmentInfo2) // returns true
// schema.isValid(data.sampleContractAmendmentInfoInvalid) // returns false
