var protobufjs = require("protobufjs");
var data = require("./domain-models/contractAmendmentInfo.ts");
var protoTest = require("./test.proto");
run().catch((err) => console.log(err));

async function run() {
  const root = await protobufjs.load(protoTest);

  const TestContractAmendmentInfo = root.lookupType(
    "testpackage.ContractAmendmentInfo"
  );

  console.log(TestContractAmendmentInfo.verify(data)); // null
  console.log(
    TestContractAmendmentInfo.verify({ propertyDoesntExist: "not real" })
  ); // null
  console.log(TestContractAmendmentInfo.verify({ age: "not a number" })); // "age: integer expected"
}
