var protobufjs = require("protobufjs");
var data = require("./domain-models/contractAmendmentInfo.ts");
run().catch((err) => console.log(err));

/* TODO
- Add examples of serializing and deserializing data
- Get valid checks working. Right now enum arrays are not working
  - Based on .proto file, protobuf expects them to be passed in as integers (field numbers) but we have strings 
  - look into message "reflection" for ways to enhance the `.decode` logic to handle enums as strings
*/

async function run() {
  const root = await protobufjs.load("./src/test.proto");

  const TestContractAmendmentInfo = root.lookupType(
    "testpackage.ContractAmendmentInfo"
  );

  console.log("\n --- testing protobufjs -----------  \n");
  console.log("--- \n", "check validity");
  console.log(
    "--- \n",
    "valid data",
    TestContractAmendmentInfo.verify(data.sampleContractAmendmentInfo1)
  );
  console.log(
    "--- \n",
    "more valid data",
    TestContractAmendmentInfo.verify(data.sampleContractAmendmentInfo2)
  );
  console.log(
    "--- \n",
    "invalid data \n",
    TestContractAmendmentInfo.verify(data.sampleContractAmendmentInfoInvalid)
  );
  console.log(
    "--- \n",
    "verify propertyDoesntExist should be null",
    TestContractAmendmentInfo.verify({ propertyDoesntExist: "not real" })
  );
  console.log(
    "--- \n",
    "verify valid field with invalid value \n",
    TestContractAmendmentInfo.verify({ relatedToCovid: "not a bool" })
  );
}
