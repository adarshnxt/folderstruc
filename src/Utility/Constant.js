export const public_url = {
  landing_page: "/",
  login: "/log-in",
  dashboard: "/dashboard",
  addlead: "/:journey",
  loanDetail: "/loanDetail",
  scheme: "/scheme",
  success: "/success",
  failure: "/failure",
  leadLists: "/leadLists",
  DDEgst: "/DDEgst",
  DDEbank: "/DDEbank",
  DDEitr: "/DDEitr",
  DDEfsa: "/DDEfsa",
  leadInfo: "/leadInfo",
  dealerDsaInfo: "/dealerDsaInfo",
  otpVerification: "/otpVerification",
  concentRequest: "/concentRequest",
  addleadinfo: "/addleadinfo",
  otpverification: "/otpverification",
  consentLink: "/consentLink",
  qde: "/qde",
  dde: "/dde",
  editLead: "/editLead",
  loanSummary: "/loan-summary",
  collectR: "/collectR",
  loanDetails: "/loanDetails",
  loanOffer: "/loanOffer",
  loanAgreement: "/loanAgreement",
  verifyViaCreds: "/verifyViaCreds",
  SentLink: "/SentLink",
  repayment: "/repayment",
  preDisbursement: "/preDisbs",
  postDisbursement: "/postDisbursement",
  disbursement: "/disbursement"
};

export const CommonFileType = [
  { label: "PDF", value: ".pdf", type: "" },
  { label: "JPG", value: ".jpg", type: "image" },
  { label: "PNG", value: ".png", type: "image" },
  { label: "JPEG", value: ".jpeg", type: "image" },
];

export const numberFormat = (value) => {
  return value ? new Intl.NumberFormat("en-IN", {}).format(value) : 0;
};

export const convertToNumber = (str) => {
  return isNaN(parseFloat(str)) ? 0 : parseFloat(str);
};

export const productNameMapping = [
  { productId: 1, productName: "New Two Wheeler", leadCount: 0 },
  { productId: 2, productName: "Electric Two Wheeler", leadCount: 0 },
  { productId: 3, productName: "Used Two Wheeler", leadCount: 0 },
  { productId: 4, productName: "Other Two Wheeler", leadCount: 0 },
];
