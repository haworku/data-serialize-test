var protobufjs = require("protobufjs");
var data = require("./domain-models/contractAmendmentInfo.ts");
run().catch((err) => console.log(err));

async function run() {
  const root = await protobufjs.load("./src/test.proto");

  const TestContractAmendmentInfo = root.lookupType(
    "testpackage.ContractAmendmentInfo"
  );
  console.log("--- testing protobufjs ---");
  console.log(
    "valid data",
    Boolean(TestContractAmendmentInfo.verify(data.sampleContractAmendmentInfo1))
  );
  console.log(
    "valid data",
    Boolean(TestContractAmendmentInfo.verify(data.sampleContractAmendmentInfo2))
  );
  console.log(
    "invalid data",
    Boolean(
      TestContractAmendmentInfo.verify(data.sampleContractAmendmentInfoInvalid)
    )
  );
  console.log(
    "verify propertyDoesntExist should be false",
    Boolean(
      TestContractAmendmentInfo.verify({ propertyDoesntExist: "not real" })
    )
  );
  console.log(
    "invalid data should return failure",
    TestContractAmendmentInfo.verify({ relatedToCovid: "not a bool" })
  ); // "realatedToCovid: bool expected"
}
