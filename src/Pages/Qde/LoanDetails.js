/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import Slider from "@material-ui/core/Slider";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import { Button, Col, Form, Row, Radio } from "antd";
import isEmpty from "lodash/isEmpty";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Input from "@material-ui/core/Input";
import { connect } from "react-redux";
import SelectIcon from "../../assets/Images/select.svg";
import { saveLoanDetail, getMaxAmountValue } from "../../Redux/Services/Qde";
import { dealerList, loanDetails } from "../../Utility/Services/LoanDetails";
import { DatePicker, Select } from "antd";
import moment from "moment";
import "./style.scss";
import { tw } from "../../Utility/ReduxToaster";
import { public_url } from "../../Utility/Constant";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    '& .MuiSlider-markLabel[data-index="0"]': {
      transform: "translateX(0%)",
    },
    '& .MuiSlider-markLabel[data-index="1"]': {
      transform: "translateX(-100%)",
    },
  },
});
function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
};

const marksTenure = [
  {
    value: 3,
    label: "3 Months",
  },

  {
    value: 60,
    label: "60 Months",
  },
];

const LoanDetails = (props) => {
  const classes = useStyles();
  let form;
  const [vehicleTypeDropdownList, setVehicleTypeDropdownList] = useState([]);
  const [vehicleBrandDropdownList, setVehicleBrandDropdownList] = useState([]);
  const [vehicleModelDropdownList, setVehicleModelDropdownList] = useState([]);
  const [vehicleSubModelDropdownList, setVehicleSubModelDropdownList] =
    useState([]);
  const [amount, setAmount] = useState(50000);
  const [tenure, setTenure] = useState(12);
  const [rateOfInterest, setRateOfInterest] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [dealer, setDealer] = useState([]);
  const [emi, setEmi] = useState(0);
  const [total, setTotal] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const [PremiumAmount, setPremiumAmount] = useState(0);
  const [islifeInsurance, setIsInsuranceSelected] = useState(null);
  const [isPremiumamount, setPremiumSelected] = useState(false);
  const [maxAmt, setmaxAmt] = useState(500000);
  const [btnDisable, setBtnDisable] = useState(true);
  const [typePayout, setTypePayout] = useState("number");
  const [payout, setPayout] = useState(0);

  let history = useHistory();

  const { Option } = Select;

  const marksAmount = [
    {
      value: 20000,
      label: "20k",
    },

    {
      value: parseInt(maxAmt),
      label: parseInt(maxAmt),
    },
  ];

  const handleSliderAmount = (event, value) => {
    setAmount(value);
    if (isPremiumamount) {
      let total = parseInt(PremiumAmount) + parseInt(value);
      setTotal(total);
    }
    if (!isPremiumamount) {
      let total = parseInt(value);
      setTotal(total);
    }
  };

  const handleInputChangeAmount = (e) => {
    setAmount(e.target.value);
    if (isPremiumamount) {
      let total = parseInt(PremiumAmount) + parseInt(e.target.value);
      setTotal(total);
    }
    if (!isPremiumamount) {
      let total = parseInt(e.target.value);
      setTotal(total);
    }
  };
  const handleInputChangeTenure = (event) => {
    setTenure(event.target.value);
  };

  const disabledDate = (current) => {
    // Can not select days after today and today
    return current > moment().clone().subtract(18, "years");
  };

  const onCurrencyChange = (value) => {
    setTypePayout(value);
    form.resetFields(["dealerPayout"]);
    setPayout("");
  };

  // [ changeStep (5) ]
  const handleChangeStep = () => {
    props.changeStep(5);
  };

  // Redirect to leadList
  const redirectToLeadList = () => {
    history.push(
      `${public_url.leadLists}/${props.qde.getQdeSectionDetails.data.productId}`
    );
  };

  useEffect(() => {
    if (props.qde && props.qde.getMaxAmount && props.qde.getMaxAmount.maxamt) {
      setmaxAmt(props.qde.getMaxAmount.maxamt);
    }
  }, [props.qde && props.qde.getMaxAmount && props.qde.getMaxAmount.maxamt]);

  // EMI Calculation ----------Common Function
  const EmiCalculation = () => {
    if (rateOfInterest !== null) {
      let emiAmt = isPremiumamount
        ? parseInt(amount) + parseInt(PremiumAmount)
        : parseInt(amount);
      let a = (emiAmt / 100) * rateOfInterest;
      let b = tenure / 12;
      let c = parseFloat(emiAmt) + parseFloat(a * b);
      let emi = c / tenure;
      emi = emi.toFixed(2);
      setEmi(emi);
    }
  };
  useEffect(() => {
    EmiCalculation();
  }, [rateOfInterest, amount, tenure]);

  // ==========[ ComponentDidMount===========>]

  useEffect(() => {
    console.log(
      "form.getFieldValuedealerSubvention",
      form.getFieldValue("dealerSubvention")
    );
    //scroll top
    window.scrollTo(0, 0);
    if (isEmpty(form && form.getFieldValue("dealerSubvention"))) {
      form.setFieldsValue({
        dealerSubvention: 0,
      });
    }
    if (isEmpty(form && form.getFieldValue("adminFees"))) { 
      form.setFieldsValue({
        adminFees: 0,
      });
    }
    if (isEmpty(form && form.getFieldValue("nachCharges"))) {
      form.setFieldsValue({
        nachCharges: 0,
      });
    }
    if (isEmpty(form && form.getFieldValue("processingFees"))) {
      form.setFieldsValue({
        processingFees: 0,
      });
    }
    if (isEmpty(form && form.getFieldValue("preEmi"))) {
      form.setFieldsValue({
        preEmi: 0,
      });
    }
    if (isEmpty(form && form.getFieldValue("convenienceCharges"))) {
      form.setFieldsValue({
        convenienceCharges: 0,
      });
    }
    if (isEmpty(form && form.getFieldValue("pddCharges"))) {
      form.setFieldsValue({
        pddCharges: 0,
      });
    }
    if (isEmpty(form && form.getFieldValue("bureauCharges"))) {
      form.setFieldsValue({
        bureauCharges: 0,
      });
    }
    if (isEmpty(form && form.getFieldValue("stampDuty"))) {
      form.setFieldsValue({
        stampDuty: 0,
      });
    }
    if (isEmpty(form && form.getFieldValue("dealerCharges"))) {
      form.setFieldsValue({
        dealerCharges: 0,
      });
    }  if (isEmpty(form && form.getFieldValue("otherCharges"))) {
      form.setFieldsValue({
        otherCharges: 0,
      });
    } if (isEmpty(form && form.getFieldValue("dealerPayout"))) {
      form.setFieldsValue({
        dealerPayout: 0,
      });
    }

    
    dealerList({
      branchName:
        JSON.parse(localStorage.getItem("UserData")) &&
        JSON.parse(localStorage.getItem("UserData")).branchName,
    }).then((re) => {
      if (!isEmpty(re)) {
        let result = re.map((re) => re.dealer_name);
        setDealer(result);
      }
    });

    if (
      props.qde &&
      props.qde.getQdeSectionDetails &&
      props.qde.getQdeSectionDetails.data &&
      props.qde.getQdeSectionDetails.data.loandetails &&
      props.qde.getQdeSectionDetails.data.loandetails.submodel
    ) {
      props.getMaxAmountValue({
        leadCode: props.qde.getQdeSectionDetails.data.leadCode,
        lead_code: props.qde.getQdeSectionDetails.data.leadCode,
        submodel: props.qde.getQdeSectionDetails.data.loandetails.submodel,
      });
    }
    if (
      props.qde &&
      props.qde.getQdeSectionDetails &&
      props.qde.getQdeSectionDetails.data &&
      props.qde.getQdeSectionDetails.data.loandetails &&
      props.qde.getQdeSectionDetails.data.loandetails.islifeInsurance
    ) {
      setIsInsuranceSelected(
        props.qde.getQdeSectionDetails.data.loandetails.islifeInsurance
      );
    }
    if (
      props.qde &&
      props.qde.getQdeSectionDetails &&
      props.qde.getQdeSectionDetails.data &&
      props.qde.getQdeSectionDetails.data.loandetails &&
      props.qde.getQdeSectionDetails.data.loandetails.isPremiumamount
    ) {
      setPremiumSelected(true);
    }
  }, []);

  //--------[chnged Fields Handle Form Change]---------->
  const handleFormChange = (changedFields, allFields) => {
    const type = allFields.vehicletype;

    if (isEmpty(allFields.dateOfBirth)) {
      setIsSelected(false);
    }

    // set Amount selected
    if (changedFields.amount) {
      setAmount(amount);
      let total = parseInt(PremiumAmount) + parseInt(changedFields.amount);
      setTotal(total);
    }

    // set IsLife Insurance
    if (changedFields.islifeInsurance) {
      setIsInsuranceSelected(true);
    } else if (changedFields.islifeInsurance === false) {
      form.resetFields([
        "premiumAmount",
        "isPremiumamount",
        "relationType",
        "dateOfBirth",
        "name",
        "address",
      ]);
      setPremiumAmount(0);
      setPremiumSelected(false);
      setIsInsuranceSelected(false);
      setTotal(amount);
    }

    // set IsPremiumAmt when premium amount chnges
    if (changedFields.premiumAmount) {
      setPremiumAmount(changedFields.premiumAmount);
      let total;
      if (allFields.isPremiumamount === "Y") {
        total = parseInt(changedFields.premiumAmount) + parseInt(amount);
        setTotal(total);
      }
      if (allFields.isPremiumamount === "N") {
        total = parseInt(amount);
        setTotal(total);
      }
    }

    // set IsPremiumAmt when selection radio chnges
    if (changedFields.isPremiumamount === "Y") {
      EmiCalculation();
      setPremiumSelected(true);
      let total = parseInt(allFields.premiumAmount) + parseInt(amount);
      setTotal(total);
    }
    if (changedFields.isPremiumamount === "N") {
      EmiCalculation();
      setPremiumSelected(false);
      let total = parseInt(amount);
      setTotal(total);
    }

    // set Rate of Interest
    if (changedFields.roi) {
      setRateOfInterest(
        changedFields.roi === "" ? "" : Number(changedFields.roi)
      );
    }
    if (changedFields.submodel) {
      props.getMaxAmountValue({
        leadCode: props.qde.getQdeSectionDetails.data.leadCode,
        lead_code: props.qde.getQdeSectionDetails.data.leadCode,
        submodel: changedFields.submodel,
      });
    }

    // set Date Of Birth
    if (changedFields.dateOfBirth) {
      setIsSelected(changedFields.dateOfBirth !== null);
    }

    // set vehicle dropdowns
    const { vehicletype, vehiclebrand, model } = changedFields;
    if (vehicletype) {
      getDropdownData(
        { vehicletype },
        "getvehiclebrandlist",
        setVehicleBrandDropdownList,
        "vehiclebrand"
      );
      form.resetFields(["vehiclebrand", "model", "submodel"]);
      setVehicleModelDropdownList([]);
      setVehicleSubModelDropdownList([]);
    }

    if (vehiclebrand) {
      getDropdownData(
        { vehiclebrand, vehicletype: type },
        "getvehiclemodellist",
        setVehicleModelDropdownList,
        "model"
      );
      form.resetFields(["model", "submodel"]);
      setVehicleSubModelDropdownList([]);
    }

    if (model) {
      getDropdownData(
        { model },
        "getvehiclesubmodellist",
        setVehicleSubModelDropdownList,
        "submodel"
      );
      form.resetFields(["submodel"]);
    }
  };

  // --------[ onSubmit ]------------>
  const handleFormSave = (e) => {
    if (total > maxAmt) {
      tw("Total amount cannot exceed vehicle amount");
    } else {
      let id = null;

      if (
        props.qde.getQdeSectionDetails &&
        props.qde.getQdeSectionDetails.data &&
        props.qde.getQdeSectionDetails.data.loandetails &&
        !isEmpty(props.qde.getQdeSectionDetails.data.loandetails)
      ) {
        id = props.qde.getQdeSectionDetails.data.loandetails.id;
      }

      props.saveLoanDetail({
        ...e,
        isPremiumamount: isPremiumamount,
        dateOfBirth: e.dateOfBirth && e.dateOfBirth.format("DD/MM/YYYY"),
        premiumAmount: PremiumAmount,
        vehicle_type: e.vehicletype,
        brand_nm: e.vehiclebrand,
        model: e.model,
        submodel: e.submodel,
        dealer_name: e.dealer,
        subDealerName: e.subdealer,
        rateOfInterest: parseFloat(e.roi),
        amt_requested: total,
        tenure_requested: tenure,
        leadCode: props.qde.getQdeSectionDetails.data.leadCode,
        lead_code: props.qde.getQdeSectionDetails.data.leadCode,
        applicant_uniqueid: props.match.params.id,
        isguarantor: false,
        ismainapplicant: true,
        maxamt: maxAmt,
        emi: emi,
        dealerPayouttype: typePayout,
        id,
      });
    }
  };

  useEffect(() => {
    if (props.qde.getQdeSectionDetails) {
      if (
        props.qde.getQdeSectionDetails &&
        props.qde.getQdeSectionDetails.data &&
        props.qde.getQdeSectionDetails.data.loandetails &&
        !isEmpty(props.qde.getQdeSectionDetails.data.loandetails)
      ) {
        setBtnDisable(false);
        setIsSelected(true);
        setUpdated(true);
        const {
          amt_requested,
          brand_nm,
          dealer_name,
          model,
          rateOfInterest,
          submodel,
          tenure_requested,
          vehicle_type,
          subDealerName,
          dealerCharges,
          processingFees,
          insuranceAmount,
          bureauCharges,
          otherCharges,
          name,
          address,
          relationType,
          dateOfBirth,
          isPremiumamount,
          islifeInsurance,
          premiumAmount,
          dealerPayout,
          dealerSubvention,
          adminFees,
          nachCharges,
          preEmi,
          pddCharges,
          emi,
          convenienceCharges,
          stampDuty,
          dealerPayouttype,
        } = props.qde.getQdeSectionDetails.data.loandetails;

        form.setFieldsValue({
          vehicletype: vehicle_type,
          vehiclebrand: brand_nm,
          model: model,
          submodel: submodel,
          dealer: dealer_name,
          subdealer: subDealerName,
          roi: rateOfInterest,
          amount: isPremiumamount
            ? parseInt(amt_requested) - parseInt(premiumAmount)
            : parseInt(amt_requested),
          tenure: tenure_requested,
          isPremiumamount: isPremiumamount ? "Y" : "N",
          islifeInsurance,
          dealerCharges,
          processingFees,
          insuranceAmount,
          bureauCharges,
          otherCharges,
          name,
          address,
          relationType,
          dealerPayout,
          dealerSubvention,
          adminFees,
          nachCharges,
          preEmi,
          pddCharges,
          convenienceCharges,
          stampDuty,
          // dealerPayouttype,
        });
        setTypePayout(dealerPayouttype);
        setPayout(dealerPayout);
        setEmi(emi);
        if (islifeInsurance) {
          form.setFieldsValue({
            dateOfBirth: moment(dateOfBirth, "DD/MM/YYYY"),
          });
          form.setFieldsValue({
            premiumAmount,
          });
        }
        if (isPremiumamount) {
          let amount = parseInt(amt_requested) - parseInt(premiumAmount);
          let total = parseInt(amt_requested);
          setAmount(amount);
          setTotal(total);
        } else {
          let total = parseInt(amt_requested);
          setAmount(total);
          setTotal(total);
        }

        if (props.qde.getQdeSectionDetails.data.loandetails) {
        }
        // setAmount(amt_requested);
        setTenure(tenure_requested);
        setPremiumSelected(isPremiumamount);
        setPremiumAmount(premiumAmount);

        getDropdownData(
          { vehicletype: vehicle_type },
          "getvehiclebrandlist",
          setVehicleBrandDropdownList,
          "vehiclebrand"
        );
        getDropdownData(
          { vehiclebrand: brand_nm, vehicletype: vehicle_type },
          "getvehiclemodellist",
          setVehicleModelDropdownList,
          "model"
        );
        getDropdownData(
          { model, vehicletype: vehicle_type },
          "getvehiclesubmodellist",
          setVehicleSubModelDropdownList,
          "submodel"
        );
        setRateOfInterest(rateOfInterest);
      }
    }
  }, [props.qde.getQdeSectionDetails]);

  // -------input props Enable / disabled-------
  const inputProps = {
    readOnly: props.freezeCase || props.freezeUser,
    disabled: props.freezeCase || props.freezeUser,
  };

  // ----------------[getDropdown data]----
  const getDropdownData = async (data, type, setList, key) => {
    if (props.qde.getQdeSectionDetails) {
      const payload = {
        ...data,
        lead_code:
          props.qde.getQdeSectionDetails.data &&
          props.qde.getQdeSectionDetails.data.leadCode,
      };
      const response = await loanDetails(payload, type);
      if (!isEmpty(response)) {
        const list = [
          <option hidden></option>,
          ...response.map((item) => (
            <option value={item[key]}>{item[key]}</option>
          )),
        ];
        setList(list);
      }
    }
  };

  // date picker custom format dd/mm/yyyy...
 const customFormat = (value) => {
   return value.format("DD/MM/YYYY");
 };

  
  useEffect(() => {
    getDropdownData(
      {},
      "getvehicletypelist",
      setVehicleTypeDropdownList,
      "vehicletype"
    );
  }, [props.qde.getQdeSectionDetails]);

  //---[set dropdowns]-------->
  const dropdowns = [
    {
      name: "vehicletype",
      label: "Vehicle Type*",
      list: vehicleTypeDropdownList,
    },
    {
      name: "vehiclebrand",
      label: "Vehicle Brand*",
      list: vehicleBrandDropdownList,
    },
    {
      name: "model",
      label: "Vehicle Model*",
      list: vehicleModelDropdownList,
    },
    {
      name: "submodel",
      label: "Vehicle SubModel*",
      list: vehicleSubModelDropdownList,
    },
    {
      name: "dealer",
      label: "Dealer*",
      list: [
        <option hidden></option>,
        dealer.map((item) => <option value={item}>{item}</option>),
      ],
    },
    {
      name: "subdealer",
      label: "Sub Dealer",
      list: [
        <option hidden></option>,
        dealer.map((item) => <option value={item}>{item}</option>),
      ],
    },
  ].map((item) => {
    return (
      <Col lg={8}>
        <div className={"mui-dropdown-wrapper"}>
          <img alt={"select"} src={SelectIcon} className="searchIcon" />
          <Form.Item
            name={item.name}
            rules={[
              {
                required: item.name === "subdealer" ? false : true,
                message: `${
                  item.label && item.label.slice(0, -1)
                } is mandatory`,
              },
            ]}>
            <TextField
              key={form && form.getFieldValue(item.name)}
              disabled={!item.list.length}
              inputProps={inputProps}
              select
              label={item.label}
              fullWidth
              SelectProps={{
                native: true,
              }}
              InputLabelProps={
                updated
                  ? {
                      shrink: item.list.length ? true : false,
                    }
                  : {}
              }>
              {item.list}
            </TextField>
          </Form.Item>
        </div>
      </Col>
    );
  });

  return (
    <React.Fragment>
      <br />

      <div className="loanDetails">
        <Form
          ref={(e) => (form = e)}
          name="basic"
          onValuesChange={handleFormChange}
          onFinish={handleFormSave}>
          <div className="Business-container" style={{ padding: 40 }}>
            <Row gutter={[30, 20]}>{dropdowns}</Row>
            <Row gutter={[30, 20]}>
              <Col lg={8}>
                <Form.Item
                  name={"dealerSubvention"}
                  rules={[
                    {
                      required: true,
                      message: "Dealer Subvention is mandatory",
                    },
                    {
                      pattern: new RegExp(/^[0-9]*$/),
                      message: "Invalid Input Number",
                    },
                  ]}>
                  <TextField
                    defaultValue={0}
                    inputProps={inputProps}
                    className="dealerSubvention"
                    type="number"
                    id="dealerSubvention"
                    label="Dealer Subvention Charges*"
                    fullWidth
                    onKeyDown={(e) => e.keyCode === 190 && e.preventDefault()}
                    onInput={(e) => {
                      e.target.value =
                        e.target.value.length > 1
                          ? e.target.value.replace(/^0+/, "")
                          : e.target.value;
                    }}
                  />
                </Form.Item>
              </Col>
              <Col lg={8}>
                <Form.Item
                  name={"adminFees"}
                  rules={[
                    {
                      required: true,
                      message: "Admin Fees is mandatory",
                    },
                    {
                      pattern: new RegExp(/^[0-9]*$/),
                      message: "Invalid Input Number",
                    },
                  ]}>
                  <TextField
                    className="adminFees"
                    inputProps={inputProps}
                    defaultValue={0}
                    type="number"
                    id="adminFees"
                    label="Admin Fees Charges*"
                    fullWidth
                    onKeyDown={(e) => e.keyCode === 190 && e.preventDefault()}
                    onInput={(e) => {
                      e.target.value =
                        e.target.value.length > 1
                          ? e.target.value.replace(/^0+/, "")
                          : e.target.value;
                    }}
                  />
                </Form.Item>
              </Col>
              <Col lg={8}>
                <Form.Item
                  name={"nachCharges"}
                  rules={[
                    {
                      required: true,
                      message: "Nach Charges is mandatory",
                    },
                    {
                      pattern: new RegExp(/^[0-9]*$/),
                      message: "Invalid Input Number",
                    },
                  ]}>
                  <TextField
                    className="nachCharges"
                    defaultValue={0}
                    inputProps={inputProps}
                    type="number"
                    id="nachCharges"
                    label="Nach Charges*"
                    fullWidth
                    onKeyDown={(e) => e.keyCode === 190 && e.preventDefault()}
                    onInput={(e) => {
                      e.target.value =
                        e.target.value.length > 1
                          ? e.target.value.replace(/^0+/, "")
                          : e.target.value;
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[30, 20]}>
              <Col lg={8}>
                <Form.Item
                  name={"processingFees"}
                  rules={[
                    {
                      required: true,
                      message: "Processing Fee is mandatory",
                    },
                    {
                      pattern: new RegExp(/^[0-9]*$/),
                      message: "Invalid Input Number",
                    },
                  ]}>
                  <TextField
                    className="processingFees"
                    defaultValue={0}
                    inputProps={inputProps}
                    type="number"
                    id="processingFees"
                    label="Processing Fees*"
                    fullWidth
                    onKeyDown={(e) => e.keyCode === 190 && e.preventDefault()}
                    onInput={(e) => {
                      e.target.value =
                        e.target.value.length > 1
                          ? e.target.value.replace(/^0+/, "")
                          : e.target.value;
                    }}
                  />
                </Form.Item>
              </Col>
              <Col lg={8}>
                <Form.Item
                  name={"preEmi"}
                  rules={[
                    {
                      required: true,
                      message: "Pre EMI Fees is mandatory",
                    },
                    {
                      pattern: new RegExp(/^[0-9]*$/),
                      message: "Invalid Input Number",
                    },
                  ]}>
                  <TextField
                    className="preEmi"
                    defaultValue={0}
                    inputProps={inputProps}
                    type="number"
                    id="preEmi"
                    label="Pre Emi*"
                    fullWidth
                    onKeyDown={(e) => e.keyCode === 190 && e.preventDefault()}
                    onInput={(e) => {
                      e.target.value =
                        e.target.value.length > 1
                          ? e.target.value.replace(/^0+/, "")
                          : e.target.value;
                    }}
                  />
                </Form.Item>
              </Col>
              <Col lg={8}>
                <Form.Item
                  name={"convenienceCharges"}
                  rules={[
                    {
                      required: true,
                      message: "Convenience Charges is mandatory",
                    },
                    {
                      pattern: new RegExp(/^[0-9]*$/),
                      message: "Invalid Input Number",
                    },
                  ]}>
                  <TextField
                    inputProps={inputProps}
                    defaultValue={0}
                    className="convenienceCharges"
                    type="number"
                    id="convenienceCharges"
                    label="Convenience Charges*"
                    fullWidth
                    onInput={(e) => {
                      e.target.value =
                        e.target.value.length > 1
                          ? e.target.value.replace(/^0+/, "")
                          : e.target.value;
                    }}
                    onKeyDown={(e) => e.keyCode === 190 && e.preventDefault()}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[30, 20]}>
              <Col lg={8}>
                <Form.Item
                  name={"pddCharges"}
                  rules={[
                    {
                      required: true,
                      message: "PDD Charges is mandatory",
                    },
                    {
                      pattern: new RegExp(/^[0-9]*$/),
                      message: "Invalid Input Number",
                    },
                  ]}>
                  <TextField
                    inputProps={inputProps}
                    defaultValue={0}
                    className="pddCharges"
                    type="number"
                    id="pddCharges"
                    label="PDD Charges*"
                    fullWidth
                    onKeyDown={(e) => e.keyCode === 190 && e.preventDefault()}
                    onInput={(e) => {
                      e.target.value =
                        e.target.value.length > 1
                          ? e.target.value.replace(/^0+/, "")
                          : e.target.value;
                    }}
                  />
                </Form.Item>
              </Col>
              <Col lg={8}>
                <Form.Item
                  name={"bureauCharges"}
                  rules={[
                    {
                      required: true,
                      message: "Bureau Charges is mandatory",
                    },
                    {
                      pattern: new RegExp(/^[0-9]*$/),
                      message: "Invalid Input Number",
                    },
                  ]}>
                  <TextField
                    inputProps={inputProps}
                    defaultValue={0}
                    className="bureauCharges"
                    type="number"
                    id="bureauCharges"
                    label="Bureau Charges*"
                    fullWidth
                    onKeyDown={(e) => e.keyCode === 190 && e.preventDefault()}
                    onInput={(e) => {
                      e.target.value =
                        e.target.value.length > 1
                          ? e.target.value.replace(/^0+/, "")
                          : e.target.value;
                    }}
                  />
                </Form.Item>
              </Col>
              <Col lg={8}>
                <Form.Item
                  name={"stampDuty"}
                  rules={[
                    {
                      required: true,
                      message: "Stamp Duty is mandatory",
                    },
                    {
                      pattern: new RegExp(/^[0-9]*$/),
                      message: "Invalid Input Number",
                    },
                  ]}>
                  <TextField
                    className="stampDuty"
                    defaultValue={0}
                    inputProps={inputProps}
                    type="number"
                    id="stampDuty"
                    label="Stamp Duty*"
                    fullWidth
                    onKeyDown={(e) => e.keyCode === 190 && e.preventDefault()}
                    onInput={(e) => {
                      e.target.value =
                        e.target.value.length > 1
                          ? e.target.value.replace(/^0+/, "")
                          : e.target.value;
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[30, 20]}>
              <Col lg={8}>
                <Form.Item
                  name={"dealerCharges"}
                  rules={[
                    {
                      required: true,
                      message: "Dealer Charges is mandatory",
                    },
                    {
                      pattern: new RegExp(/^[0-9]*$/),
                      message: "Invalid Input Number",
                    },
                  ]}>
                  <TextField
                    inputProps={inputProps}
                    defaultValue={0}
                    className="dealerCharges"
                    type="number"
                    id="dealerCharges"
                    label="Dealer Charges*"
                    fullWidth
                    onKeyDown={(e) => e.keyCode === 190 && e.preventDefault()}
                    onInput={(e) => {
                      e.target.value =
                        e.target.value.length > 1
                          ? e.target.value.replace(/^0+/, "")
                          : e.target.value;
                    }}
                  />
                </Form.Item>
              </Col>
              <Col lg={8}>
                <Form.Item
                  name={"otherCharges"}
                  rules={[
                    {
                      required: true,
                      message: "Other Charges is mandatory",
                    },
                    {
                      pattern: new RegExp(/^[0-9]*$/),
                      message: "Invalid Input Number",
                    },
                  ]}>
                  <TextField
                    className="otherCharges"
                    defaultValue={0}
                    inputProps={inputProps}
                    type="number"
                    id="otherCharges"
                    label="Other Charges*"
                    fullWidth
                    onKeyDown={(e) => e.keyCode === 190 && e.preventDefault()}
                    onInput={(e) => {
                      e.target.value =
                        e.target.value.length > 1
                          ? e.target.value.replace(/^0+/, "")
                          : e.target.value;
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[30]}>
              <Col lg={8}>
                <Form.Item
                  name={"dealerPayout"}
                  rules={[
                    {
                      required: true,
                      message: "Dealer Payout is mandatory",
                    },
                    {
                      pattern:
                        typePayout === "percent"
                          ? new RegExp(/^(100|([0-9][0-9]?(\.[0-9]+)?))$/)
                          : new RegExp(/^[0-9]*$/),
                      message: "Invalid Percent Input",
                    },
                  ]}>
                  <span>
                    <TextField
                      label="Dealer Payout*"
                      inputProps={inputProps}
                      type="number"
                      value={payout}
                      onChange={(e) => setPayout(e.target.value)}
                      onKeyDown={(e) =>
                        typePayout === "number" &&
                        e.keyCode === 190 &&
                        e.preventDefault()
                      }
                      style={{
                        width: 200,
                        marginTop: "-5%",
                      }}
                      onInput={(e) => {
                        e.target.value =
                          typePayout === "percent"
                            ? e.target.value.toString()
                              ? e.target.value.toString().slice(0, 5)
                              : e.target.value
                                  .toString()
                                  .slice(0, e.target.value.length - 1)
                            : e.target.value.length > 1
                            ? e.target.value.replace(/^0+/, "")
                            : e.target.value;
                      }}
                    />
                    <Select
                      disabled={props.freezeCase || props.freezeUser}
                      value={typePayout}
                      style={{
                        width: 80,
                        margin: "0 8px",
                      }}
                      onChange={onCurrencyChange}>
                      <Option value="percent">Percent</Option>
                      <Option value="number">Number</Option>
                    </Select>
                  </span>
                </Form.Item>
              </Col>
            </Row>
            <div className="paddingVertical"></div>

            <br />
            <br />
            <br />
            <h6 className="para-slider">Loan Protect Insurance</h6>
            <Row>
              <Col lg={8}>
                <p className="para-slider-semi-bold">
                  Is Life Insurance taken ?
                </p>
              </Col>
              <br />
              <Col lg={8}>
                <Form.Item
                  name={"islifeInsurance"}
                  rules={[
                    {
                      required: true,
                      message: "Please Select an Option",
                    },
                  ]}>
                  <Radio.Group
                    style={{ display: "flex", width: "100%" }}
                    disabled={props.freezeCase || props.freezeUser}>
                    <Radio value={true} style={{ marginRight: 15 }}>
                      Yes
                    </Radio>
                    <Radio value={false}>No</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>

            <br />
            {islifeInsurance ? (
              <>
                <Row>
                  <Col lg={8}>
                    <p
                      className="para-slider-semi-bold"
                      style={{ marginTop: "10px" }}>
                      Premium Amount{" "}
                    </p>
                  </Col>
                  <Col lg={5}>
                    <Form.Item
                      name={"premiumAmount"}
                      rules={[
                        {
                          required: true,
                          message: "Premium Amount is mandatory",
                        },
                        {
                          pattern: new RegExp(/^[0-9]*$/),
                          message: "Invalid Input Number",
                        },
                      ]}>
                      <TextField
                        inputProps={inputProps}
                        id="premiumAmount"
                        style={{ marginTop: "-15px" }}
                        type="number"
                        label="Premium Amount*"
                        fullWidth
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <br />

                <Row>
                  <Col lg={8}>
                    <p className="para-slider-semi-bold">
                      Premium Amount to be added to loan amount ?
                    </p>
                  </Col>
                  <Col lg={6}>
                    <Form.Item
                      name={"isPremiumamount"}
                      rules={[
                        {
                          required: true,
                          message: "Please Select Option",
                        },
                      ]}>
                      <Radio.Group
                        fullWidth
                        disabled={props.freezeCase || props.freezeUser}>
                        <Radio value={"Y"} style={{ marginRight: 15 }}>
                          Yes
                        </Radio>
                        <Radio value={"N"}>No</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Row>
                <br />

                <h6 className="para-font-blue">Nominee Details</h6>
                <Row>
                  <Col lg={8}>
                    <Form.Item
                      name={"name"}
                      rules={[
                        {
                          required: true,
                          message: "Name is mandatory",
                        },
                      ]}>
                      <TextField
                        inputProps={inputProps}
                        className="pr-20"
                        type="name"
                        id="name"
                        label="Name*"
                        fullWidth
                        onInput={(e) => {
                          e.target.value = e.target.value
                            .toString()
                            .match(/^[a-zA-Z ]*$/)
                            ? e.target.value.toString().slice(0, 30)
                            : e.target.value
                                .toString()
                                .slice(0, e.target.value.length - 1);
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={8}>
                    <div className={"mui-dropdown-wrapper"}>
                      <img
                        alt={"select"}
                        src={SelectIcon}
                        className="searchIcon pr-20"
                      />
                      <Form.Item
                        name="relationType"
                        rules={[
                          {
                            required: true,
                            message: "Relationship selection is mandatory",
                          },
                        ]}>
                        <TextField
                          inputProps={inputProps}
                          className="pr-20"
                          select
                          label="Relationship*"
                          fullWidth
                          SelectProps={{
                            native: true,
                          }}>
                          <option hidden></option>
                          <option value="Father">Father</option>
                          <option value="Mother">Mother</option>
                          <option value="Brother">Brother</option>
                          <option value="Sister">Sister</option>
                          <option value="Spouse">Spouse</option>
                          <option value="Cousin">Cousin</option>
                          <option value="Colleague">Colleague</option>
                          <option value="Friend">Friend</option>
                          <option value="Neighbour">Neighbour</option>
                        </TextField>
                      </Form.Item>
                    </div>
                  </Col>

                  <Col lg={8}>
                    <label
                      id={"date-picker-label"}
                      className={`MuiFormLabel-root MuiInputLabel-root ${
                        (form && form.getFieldValue("dateOfbirth")) ||
                        isSelected
                          ? "MuiInputLabel-animated MuiInputLabel-shrink"
                          : ""
                      } MuiInputLabel-formControl MuiInputLabel-animated`}
                      data-shrink="false"
                      for="dateOfBirth">
                      Date of Birth*
                    </label>
                    <Form.Item
                      name="dateOfBirth"
                      rules={[
                        {
                          required: true,
                          message: "Date is mandatory",
                        },
                      ]}>
                      <DatePicker
                        inputProps={inputProps}
                        format={customFormat}
                        disabledDate={disabledDate}
                        disabled={props.freezeCase || props.freezeUser}
                        inputReadOnly={true}
                        placeholder={""}
                        labelId={"date-picker-label"}
                        bordered={false}
                        className={
                          "loanDetailDatePicker MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-formControl MuiInput-formControl"
                        }
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <br />
                <Row>
                  <Col lg={8}>
                    <Form.Item
                      name={"address"}
                      rules={[
                        {
                          required: true,
                          message: "Address is mandatory",
                        },
                      ]}>
                      <TextField
                        inputProps={inputProps}
                        multiline
                        className="pr-20"
                        type="address"
                        id="address"
                        label="Address*"
                        fullWidth
                        onInput={(e) => {
                          e.target.value = e.target.value.toString()
                            ? e.target.value.toString().slice(0, 255)
                            : e.target.value
                                .toString()
                                .slice(0, e.target.value.length - 1);
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </>
            ) : (
              <div></div>
            )}
            <br />
            <Row>
              <Col lg={15}>
                <Form.Item name={"amount"}>
                  <span className="para-font-blue">Amount Required*</span>

                  <Slider
                    disabled={props.freezeCase || props.freezeUser}
                    key={amount}
                    defaultValue={amount}
                    ValueLabelComponent={ValueLabelComponent}
                    className={classes.root}
                    marks={marksAmount}
                    track={"normal"}
                    onChangeCommitted={handleSliderAmount}
                    min={20000}
                    max={parseInt(maxAmt)}
                  />
                </Form.Item>
              </Col>
            </Row>

            <TextField
              label="Amount Selected"
              inputProps={inputProps}
              className="form-control amtSelected"
              type="number"
              value={parseInt(amount)}
              onChange={handleInputChangeAmount}
              onKeyDown={(e) =>
                (e.keyCode === 32 ||
                  e.keycode === 45 ||
                  e.keycode === 173 ||
                  e.keycode === 189) &&
                e.preventDefault()
              }
            />
            <br />
            <br />
            <p className="para-400">
              Amount Selected + PremiumAmount = &#8377; {total}
            </p>
            <br />

            <Row>
              <Col lg={15}>
                <Form.Item name={"tenure"}>
                  <span className="para-font-blue"> Tenure Required*</span>
                  <Slider
                    disabled={props.freezeCase || props.freezeUser}
                    key={tenure}
                    defaultValue={tenure}
                    ValueLabelComponent={ValueLabelComponent}
                    className={classes.root}
                    marks={marksTenure}
                    track={"normal"}
                    onChangeCommitted={(e, value) => setTenure(value)}
                    min={3}
                    max={60}
                  />
                </Form.Item>
              </Col>
            </Row>
            <div className="para-400">
              Tenure Selected:{" "}
              <Input
                className="inputSliderTxt"
                type="number"
                value={tenure}
                onChange={handleInputChangeTenure}
                inputProps={{
                  step: 1,
                  min: 3,
                  max: 60,
                  type: "number",
                  "aria-labelledby": "input-slider",
                  readOnly: props.freezeCase || props.freezeUser,
                  disabled: props.freezeCase || props.freezeUser,
                }}
              />{" "}
              Months
            </div>
            <br />
            <Col lg={5}>
              <Form.Item
                name={"roi"}
                rules={[
                  {
                    required: true,
                    message: "Rate Of Interest is mandatory",
                  },
                  {
                    pattern: new RegExp(/^(100|([0-9][0-9]?(\.[0-9]+)?))$/),
                    message: "Invalid Rate of Interest",
                  },
                ]}>
                <TextField
                  inputProps={inputProps}
                  id="roi"
                  className="rateOfInterest"
                  type="number"
                  label="Rate Of Interest % *"
                  fullWidth
                  onChange={(e) => isEmpty(e.target.value) && setEmi(0)}
                  onInput={(e) => {
                    e.target.value = e.target.value.toString()
                      ? e.target.value.toString().slice(0, 5)
                      : e.target.value
                          .toString()
                          .slice(0, e.target.value.length - 1);
                  }}
                />
              </Form.Item>
            </Col>
            <br />
            {/* <p className="para-slider">EMI CALCULATED AMOUNT : &#8377; {emi}</p> */}

            <p className="para-slider">
              EMI CALCULATED AMOUNT : &#8377;{" "}
              {Math.round(emi)}
            </p>
            <br />

            <div className="alignButton">
              <Button
                className="save-button mr-3"
                onClick={() => {
                  props.history.push(
                    `${public_url.loanSummary}/${
                      props.qde.getQdeSectionDetails &&
                      props.qde.getQdeSectionDetails.data &&
                      props.qde.getQdeSectionDetails.data.id
                    }`
                  );
                }}>
                Loan Summary
              </Button>{" "}
              <Button
                className="cancle-button mr-3"
                onClick={redirectToLeadList}>
                {" "}
                Cancel{" "}
              </Button>
              {!(props.freezeCase || props.freezeUser) && (
                <Button className="save-button mr-3" htmlType={"submit"}>
                  {" "}
                  Save{" "}
                </Button>
              )}
              <Button
                className="save-button"
                disabled={btnDisable}
                onClick={handleChangeStep}>
                {" "}
                Next{" "}
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </React.Fragment>
  );
};

const mapDispatchToProps = {
  saveLoanDetail,
  getMaxAmountValue,
};

const mapStateToProps = (state) => {
  return {
    qde: state.qde,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoanDetails);
