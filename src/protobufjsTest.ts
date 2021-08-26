import * as protobufjs from "protobufjs";
var data = require("./domain-models/contractAmendmentInfo.ts");

console.log("\n testing protobuf  \n");
console.log("---------------");

protobufjs.load("./src/test.proto", function (err, root) {
  if (err) throw err;
  if (root === undefined) {
    console.log("no schema");
    return;
  }

  const TestContractAmendmentInfo = root.lookupType(
    "testpackage.ContractAmendmentInfo"
  );

  // Serialization/ Encoding
  const toSerializable = (domainData: any) =>
    JSON.stringify(TestContractAmendmentInfo.create(domainData));
  const toDomain = (str: any) => JSON.parse(str);
  const testData = data.sampleContractAmendmentInfo1;
  console.log("given this data \n", testData);
  console.log(
    "--- \n",
    "a serialized string looks like \n",
    toSerializable(testData)
  );
  console.log(
    "--- \n",
    "deserialized looks like \n",
    toDomain(toSerializable(testData))
  );
  console.log(
    "--- \n",
    "an encoded buffer looks like \n",
    TestContractAmendmentInfo.encode(
      TestContractAmendmentInfo.create(testData)
    ).finish()
  );
  console.log(
    "--- \n",
    "decoded from buffer looks like \n",
    TestContractAmendmentInfo.decode(
      TestContractAmendmentInfo.encode(
        TestContractAmendmentInfo.create(testData)
      ).finish()
    )
  );

  // Error handling
  console.log("------");
  console.log(
    "\n validation and error handling \n to validate data against an protobuf schema, you can use .verify \n"
  );

  console.log(
    "--- \n",
    "given this invalid data \n",
    data.sampleContractAmendmentInfoInvalid,
    " \n .verify returns \n",
    TestContractAmendmentInfo.verify(data.sampleContractAmendmentInfoInvalid)
  );
  console.log(
    "--- \n",
    "and given this valid data \n",
    data.sampleContractAmendmentInfo1,
    "\n .verify returns \n",
    TestContractAmendmentInfo.verify(data.sampleContractAmendmentInfo1)
  );

  console.log(
    "--- \n",
    "can also use .verify with options to check that a specific property does not exist",
    '\n e.g. TestContractAmendmentInfo.verify({ propertyDoesntExist: "not real" }) returns \n',
    TestContractAmendmentInfo.verify({ propertyDoesntExist: "not real" })
  );
  console.log(
    "--- \n",
    "or verify a specific field value",
    '\n e.g. TestContractAmendmentInfo.verify({ relatedToCovid: "not a bool" }) returns',
    TestContractAmendmentInfo.verify({ relatedToCovid: "not a bool" })
  );
});

// Other misc notes
// protobuf always references fields as integers (field numbers)
// on distribution - Where bundle size is a factor, there are additional stripped-down versions of the full library (~19kb gzipped) available that exclude certain functionality
