import React from "react";
import { connect } from "react-redux";
import { saveUpdateBusinessDetailsService } from "../../Redux/Services/Qde";
import { Form, Button } from "antd";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Row, Col } from "antd";
import { useEffect } from "react";
import {
  fetchSectors,
  fetchIndustries,
  fetchSubIndustries,
  fetchSegments,
} from "../../Utility/Services/businessDetails";
import { getBusinessDetails } from "../../Utility/Services/businessDetails";
import { te } from "../../Utility/ReduxToaster";
import SelectIcon from "../../assets/Images/select.svg";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import BusinessDetailsDropdown from "./BusinessDetailsDropdown";
import _ from "lodash";
import "./style.scss";

const BuisnessDetails = (props) => {
  // const classes = useStyles();

  const [value, setValue] = React.useState(null);
  const [valueID, setValueID] = React.useState(null);
  const [valueSector, setValueSector] = React.useState(null);
  const [sectorFlag, setSectorFlag] = React.useState(false);
  const [valueIndustry, setValueIndustry] = React.useState(null);
  const [industryFlag, setIndustryFlag] = React.useState(false);
  const [valueSubIndustry, setValueSubIndustry] = React.useState(null);
  const [subIndustryFlag, setSubIndustryFlag] = React.useState(false);
  const [valueSegment, setValueSegment] = React.useState(null);
  const [segmentFlag, setSegmentFlag] = React.useState(false);
  const [valueTurnover, setValueTurnover] = React.useState(null);
  const [valueNetworth, setValueNetworth] = React.useState(null);
  const [isUpdated, setIsUpdated] = React.useState(false);
  const [sectorList, setSectorList] = React.useState([]);
  const [sectorListName, setSectorListName] = React.useState([]);
  const [industryList, setIndustryList] = React.useState([]);
  const [industryListName, setIndustryListName] = React.useState([]);
  const [subindustryList, setSubIndustryList] = React.useState([]);
  const [subindustryListName, setSubIndustryListName] = React.useState([]);
  const [segmentList, setSegmentList] = React.useState([]);
  const [segmentListName, setSegmentListName] = React.useState([]);
  const [isSelected, setIsSelected] = React.useState(true);
  const [businessDetails, setBusinessDetails] = React.useState(null);
  const [options, setOptions] = React.useState([]);
  const [subIndustryClear, setSubIndustryClear] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [cob, setCob] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [isSaved, setIsSaved] = React.useState(false);

  const useStyles = makeStyles((theme) => ({
    popupIndicator: {
      "& span": {
        "& svg": {
          "& path": {
            d: "path('M20 20L0 40')",
            stroke: "#fff",
          },
        },
      },
    },
  }));

  useEffect(() => {
    (async () => {
      try {
        const leadCode = props.leadDetails.leadCode;
        const response = await getBusinessDetails({
          lead_code: leadCode,
          applicant_uniqueid: props.leadDetails.applicantUniqueId,
        }).then((re) => {
          return re;
        });

        if (!response.data.error) {
          setBusinessDetails(response.data.data.businessdetails);
          setValueID(response.data.data.businessdetails.id);
          setValueIndustry(response.data.data.businessdetails.industry);
          setValueSector(response.data.data.businessdetails.sector);
          setValueSubIndustry(response.data.data.businessdetails.subindustry);
          setValueSegment(response.data.data.businessdetails.segment);
          setValueNetworth(response.data.data.businessdetails.networth);
          setValueTurnover(response.data.data.businessdetails.turnover);
          setIsUpdated(true);
        } else if (response.data.error) {
          console.log(response.data.message);
        }
      } catch (error) {
        te("Something went wrong");
        console.log(error, "ERROR");
      }
    })();
  }, [props.leadDetails]);

  useEffect(() => {
    (async () => {
      if (isSaved) {
        try {
          const leadCode = props.leadDetails.leadCode;
          const response = await getBusinessDetails({
            lead_code: leadCode,
            applicant_uniqueid: props.leadDetails.applicantUniqueId,
          }).then((re) => {
            return re;
          });

          if (!response.data.error) {
            setBusinessDetails(response.data.data.businessdetails);
            setValueID(response.data.data.businessdetails.id);
            setValueIndustry(response.data.data.businessdetails.industry);
            setValueSector(response.data.data.businessdetails.sector);
            setValueSubIndustry(response.data.data.businessdetails.subindustry);
            setValueSegment(response.data.data.businessdetails.segment);
            setValueNetworth(response.data.data.businessdetails.networth);
            setValueTurnover(response.data.data.businessdetails.turnover);
            setIsSaved(false);
          } else if (response.data.error) {
            console.log(response.data.message);
          }
        } catch (error) {
          // te("Something went wrong");
          console.log(error, "ERROR");
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSaved]);

  const fetchSectorDetails = async () => {
    fetchSectors().then((res) => {
      if (res.data) {
        if (!res.data.error) {
          setSectorList(res.data.data);
        }
      }
    });
  };

  const fetchSectorCode = async (e, value) => {
    if (value) {
      if (value !== valueSector) {
        setValueSubIndustry(null);

        setSubIndustryClear(true);
      }
      setValueSector(value);

      // ? ------------>[logic to get sector_code matching sector_name]------------->
      let obj = sectorList.find((o) => o.sectorName === value);

      if (obj.sector_code) {
        fetchSubndustriesDetails(obj.sector_code);
      }
    }
  };

  const fetchSubndustriesDetails = (sectorcode) => {
    fetchSubIndustries(sectorcode).then((res) => {
      if (res.data) {
        if (!res.data.error) {
          setIsSelected(false);
          setSubIndustryList(res.data.data);
        }
      }
    });
  };

  const fetchIndustriesDetails = async () => {
    fetchIndustries().then((res) => {
      if (res.data) {
        if (!res.data.error) {
          setIndustryList(res.data.data);
        }
      }
    });
  };

  const fetchSegmentsDetails = async () => {
    fetchSegments().then((res) => {
      if (res.data) {
        if (!res.data.error) {
          setSegmentList(res.data.data);
        }
      }
    });
  };

  const random = () => {};
  //*---------------[set Flag]------------------------------->
  useEffect(() => {
    if (valueSegment !== null && isUpdated) {
      setSegmentFlag(true);
    }
  }, [isUpdated, valueSegment]);
  // ------------
  useEffect(() => {
    if (valueIndustry !== null && isUpdated) {
      setIndustryFlag(true);
    }
  }, [isUpdated, valueIndustry]);
  // -----------------
  useEffect(() => {
    if (valueSubIndustry !== null && isUpdated) {
      setSubIndustryFlag(true);
    }
  }, [isUpdated, subIndustryClear, valueSubIndustry]);

  useEffect(() => {});

  useEffect(() => {
    if (valueSector !== null && isUpdated) {
      setSectorFlag(true);
    }
  }, [isUpdated, valueSector]);

  useEffect(() => {
    fetchSectorDetails();
    fetchIndustriesDetails();
    fetchSegmentsDetails();
  }, []);

  //logic to Extract and Send sector_code
  useEffect(() => {
    (async () => {
      if (isUpdated) {
        // logic to get sector_code matching sector_name
        let obj = await sectorList.find((o) => o.sectorName === valueSector);

        if (obj) {
          fetchSubndustriesDetails(obj.sector_code);
        }
      }
    })();
  }, [isUpdated, sectorList, valueSector]);

  //!logic to convert array of obj to array

  useEffect(() => {
    if (sectorList) {
      let resultt = sectorList.map((a) => a.sectorName);

      setSectorListName(resultt);
    }
  }, [sectorList]);

  useEffect(() => {
    if (subindustryListName) {
      setOptions(subindustryListName);
    }
  }, [subindustryListName]);

  useEffect(() => {
    if (industryList) {
      let resultt = industryList.map((a) => a.industryDesc);

      setIndustryListName(resultt);
    }
  }, [industryList]);

  useEffect(() => {
    if (segmentList) {
      let resultt = segmentList.map((a) => a.segmentcode);
      setSegmentListName(resultt);
    }
  }, [segmentList]);

  useEffect(() => {
    if (subindustryList) {
      let resultt = subindustryList.map((a) => a.subindustryDesc);

      setSubIndustryListName(resultt);
    }
  }, [subindustryList]);

  // !---------------[onFinish]------------------------>
  //  console.log(props,"propsssssssssssssss")
  const onFinish = (values) => {
    const lead_code = props.leadDetails.leadCode;
    //!need to replace this with bwlow
    const { journey } = props;
    const applicant_uniqueid = props.leadDetails.applicantUniqueId;

    const data = {
      id: valueID,
      lead_code,
      applicant_uniqueid,
      sector: valueSector,
      industry: valueIndustry,
      subindustry: valueSubIndustry,
      segment: valueSegment,
      networth: valueNetworth,
      turnover: valueTurnover,
      ismainapplicant: journey === "applicant",
      isguarantor: journey === "guarantor",
    };
    props.saveUpdateBusinessDetailsService(data);
    setTimeout(() => {
      setIsSaved(true);
    }, 2000);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failedd........:", errorInfo);
    te(errorInfo);
  };

  const classes = useStyles();
  return (
    <React.Fragment>
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div className="Business-container" style={{ padding: 40 }}>
          <Row>
            <Col span={24}></Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={8}>
              <Form.Item
                name="sector"
                rules={[
                  {
                    required: valueSector !== null ? false : true,
                    message: "Sector name is mandatory",
                  },
                ]}
              >
                <Autocomplete
                  classes={{
                    popupIndicator: classes.popupIndicator,
                  }}
                  // forcePopupIcon={false}
                  key={sectorFlag}
                  disableClearable
                  id="sector"
                  onClick={() => {
                    !isUpdated ? setSectorFlag(true) : random();
                  }}
                  filterSelectedOptions
                  defaultValue={valueSector}
                  options={sectorList.length > 0 ? sectorListName : []}
                  getOptionSelected={(option, value) => option === value}
                  getOptionLabel={(option) => option}
                  onChange={fetchSectorCode}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            <InputAdornment position="end">
                              <IconButton className="btnDropdownCommonArrow">
                                <img
                                  alt="select-Icon"
                                  src={SelectIcon}
                                  className="searchIcon"
                                />
                              </IconButton>
                            </InputAdornment>
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                      label="Sector"
                      margin="normal"
                    />
                  )}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              {/* {valueIndustry} */}
              <Form.Item
                name="industry"
                rules={[
                  {
                    required: valueIndustry !== null ? false : true,
                    message: "Industry name is mandatory",
                  },
                ]}
              >
                <Autocomplete
                  classes={{
                    popupIndicator: classes.popupIndicator,
                  }}
                  key={industryFlag}
                  onClick={() => {
                    !isUpdated ? setIndustryFlag(true) : random();
                  }}
                  // forcePopupIcon={false}
                  disableClearable
                  id="industry"
                  onChange={(event, newValue) => {
                    setValueIndustry(newValue);
                  }}
                  options={industryListName.length > 0 ? industryListName : []}
                  getOptionSelected={(option, value) => option === value}
                  getOptionLabel={(option) => option}
                  defaultValue={valueIndustry}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            <InputAdornment position="end">
                              <IconButton className="btnDropdownCommonArrow">
                                <img
                                  alt="select-Icon"
                                  src={SelectIcon}
                                  className="searchIcon"
                                />
                              </IconButton>
                            </InputAdornment>
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                      value={valueIndustry}
                      label={"Industry"}
                      margin="normal"
                    />
                  )}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="subindustry"
                rules={[
                  {
                    required: valueSubIndustry !== null ? false : true,
                    message: "Sub-industry name is mandatory",
                  },
                ]}
              >
                <BusinessDetailsDropdown
                  valueSubIndustry={valueSubIndustry}
                  isSelected={isSelected}
                  setValueSubIndustry={setValueSubIndustry}
                  subindustryListName={subindustryListName}
                  subIndustryClear={subIndustryClear}
                  subIndustryFlag={subIndustryFlag}
                  valueSector={valueSector}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={8} style={{ textAlign: "center" }}>
              <Form.Item
                name="cin"
                rules={[
                  {
                    required: false,
                    message: "Please input CIN!",
                  },
                ]}
              >
                <Autocomplete
                  disableClearable
                  classes={{
                    popupIndicator: classes.popupIndicator,
                  }}
                  // forcePopupIcon={false}
                  disabled
                  id="controlled-demo"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            <InputAdornment position="end">
                              <IconButton className="btnDropdownCommonArrow">
                                <img
                                  alt="select-Icon"
                                  src={SelectIcon}
                                  className="searchIcon"
                                />
                              </IconButton>
                            </InputAdornment>
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                      label="CIN"
                      margin="normal"
                    />
                  )}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="segment"
                rules={[
                  {
                    required: valueSegment !== null ? false : true,
                    message: "Segment name is mandatory",
                  },
                ]}
              >
                <Autocomplete
                  classes={{
                    popupIndicator: classes.popupIndicator,
                  }}
                  key={segmentFlag}
                  // forcePopupIcon={false}
                  disableClearable
                  onClick={() => {
                    !isUpdated ? setSegmentFlag(true) : random();
                  }}
                  // id="segment"

                  options={segmentListName.length > 0 ? segmentListName : []}
                  defaultValue={valueSegment}
                  filterSelectedOptions
                  getOptionLabel={(segmentListName) => segmentListName}
                  onChange={(event, value) => {
                    setValueSegment(value);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            <InputAdornment position="end">
                              <IconButton className="btnDropdownCommonArrow">
                                <img
                                  alt="select-Icon"
                                  src={SelectIcon}
                                  className="searchIcon"
                                />
                              </IconButton>
                            </InputAdornment>
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                      label="Segment"
                      margin="normal"
                    />
                  )}
                />
              </Form.Item>
            </Col>
            <Col span={8} style={{ marginTop: 15 }}>
              <Form.Item
                name="turnover"
                rules={[
                  {
                    required: _.isNumber(valueTurnover) ? false : true,
                    message: "Please input Turnover!",
                  },
                  {
                    pattern: new RegExp(/^[0-9]*$/),
                    message: "Invalid Input Number",
                  },
                ]}
              >
                {/* {valueTurnover} */}
                <TextField
                  key={valueTurnover}
                  defaultValue={valueTurnover}
                  id="turnover"
                  label="Turnover"
                  fullWidth
                  onBlur={(e) => setValueTurnover(e.target.value)}
                  type="number"
                  // onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
                  onKeyDown={(e) =>
                    (e.keyCode === 69 || e.keyCode === 190) &&
                    e.preventDefault()
                  }
                  onInput={(e) => {
                    e.target.value = e.target.value.match(/^[0-9]*$/)
                      ? e.target.value
                      : e.target.value
                          // .toString()
                          .slice(0, e.target.value.length - 1);
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={8} style={{ marginTop: 10 }}>
              <Form.Item
                name="networth"
                rules={[
                  {
                    // required: valueNetworth !== null ? false : true,

                    required: _.isNumber(valueNetworth) ? false : true,
                    message: "Please input Networth!",
                  },
                ]}
              >
                <TextField
                  key={valueNetworth}
                  defaultValue={valueNetworth}
                  id="networth"
                  fullWidth
                  onBlur={(e) => setValueNetworth(e.target.value)}
                  label="Networth"
                  type="number"
                  // onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
                  onKeyDown={(e) =>
                    (e.keyCode === 69 || e.keyCode === 190) &&
                    e.preventDefault()
                  }
                  onInput={(e) => {
                    e.target.value = e.target.value.match(/^[0-9]*$/)
                      ? e.target.value
                      : e.target.value
                          // .toString()
                          .slice(0, e.target.value.length - 1);
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={8} style={{ textAlign: "center" }}></Col>
            <Col span={8} style={{ textAlign: "center" }}></Col>
          </Row>
          <br />
          <Row>
            <Col span={24} style={{ textAlign: "center" }}>
              <button className="cancle-button btnBusinessCancel">
                Cancel
              </button>
              <Button htmlType="submit" className="save-button">
                Save{" "}
              </Button>
            </Col>
          </Row>
        </div>
      </Form>
    </React.Fragment>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    saveUpdateBusinessDetailsService: (payload) => {
      dispatch(saveUpdateBusinessDetailsService(payload)); //same name as action.js
    },
  };
}

const mapStateToProps = (state) => {
  return {
    qde: state.qde,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BuisnessDetails);
