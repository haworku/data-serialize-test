var avrojs = require("avro-js");
var data = require("./domain-models/contractAmendmentInfo.ts");

const avrojsType = avrojs.parse({
  name: "ContractAmendmentInfo",
  type: "record",
  fields: [
    {
      name: "itemsBeingAmended",
      type: {
        type: "array",
        items: {
          name: "Item",
          type: "enum",
          symbols: [
            "BENEFITS_PROVIDED",
            "CAPITATION_RATES",
            "ENCOUNTER_DATA",
            "ENROLLEE_ACCESS",
            "ENROLLMENT_PROCESS",
            "FINANCIAL_INCENTIVES",
            "GEO_AREA_SERVED",
            "GRIEVANCES_AND_APPEALS_SYSTEM",
            "LENGTH_OF_CONTRACT_PERIOD",
            "NON_RISK_PAYMENT",
            "PROGRAM_INTEGRITY",
            "QUALITY_STANDARDS",
            "RISK_SHARING_MECHANISM",
            "OTHER",
          ],
        },
      },
    },
    { name: "otherItemBeingAmended", type: ["null", "string"], default: null },
    {
      name: "capitationRatesAmendedInfo",
      type: [
        "null",
        {
          name: "capitationRatesAmendedInfo",
          type: "record",
          fields: [
            {
              name: "reason",
              type: {
                name: "reason",
                type: "enum",
                symbols: ["ANNUAL", "MIDYEAR", "OTHER"],
              },
            },
            {
              name: "otherReason",
              type: ["null", "string"],
              default: null,
            },
          ],
        },
      ],
      default: null,
    },
    { name: "relatedToCovid19", type: "boolean", default: false },
    { name: "relatedToVaccination", type: ["null", "boolean"], default: null },
  ],
});

console.log("--- testing avro-js ---");
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
  "valid type",
  avrojsType.isValid(data.sampleContractAmendmentInfo1)
);
console.log(
  "another valid type",
  avrojsType.isValid(data.sampleContractAmendmentInfo2)
);
console.log(
  "invalid type",
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
