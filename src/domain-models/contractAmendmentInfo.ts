type ContractAmendmentInfo = {
  itemsBeingAmended: string[];
  otherItemBeingAmended?: string;
  capitationRatesAmendedInfo?: {
    reason?: "ANNUAL" | "MIDYEAR" | "OTHER";
    otherReason?: string;
  };
  relatedToCovid19?: boolean;
  relatedToVaccination?: boolean;
};

const sampleContractAmendmentInfo1 = {
  itemsBeingAmended: [
    "BENEFITS_PROVIDED",
    "CAPITATION_RATES",
    "ENROLLEE_ACCESS",
    "OTHER",
  ],
  otherItemBeingAmended: "This is why items amended",
  capitationRatesAmendedInfo: {
    reason: "OTHER",
    // otherReason: "This is capitation rates info",
  },
  relatedToCovid19: false,
  // relatedToVaccination: false,
};

const sampleContractAmendmentInfo2 = {
  itemsBeingAmended: ["BENEFITS_PROVIDED"],
  relatedToCovid19: false,
};

const sampleContractAmendmentInfoInvalid = {
  itemsBeingAmended: ["INVALID_ENUM", "OTHER"],
  otherItemBeingAmended: "This is why items amended",
  relatedToCovid19: "a boolean",
};

exports.sampleContractAmendmentInfo1 = sampleContractAmendmentInfo1;
exports.sampleContractAmendmentInfo2 = sampleContractAmendmentInfo2;
exports.sampleContractAmendmentInfoInvalid = sampleContractAmendmentInfoInvalid;
