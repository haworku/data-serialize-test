var protobufjs = require("protobufjs");
var data = require("./domain-models/contractAmendmentInfo.ts");
run().catch((err) => console.log(err));

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
  ); // "relatedToCovid: bool expected"
}
