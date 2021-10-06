// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import fetch from "cross-fetch";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import SelectIcon from "../../assets/Images/select.svg";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import "./style.scss";
//styling---------------------------------->

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

//function default------------------------------>

export default function BusinessDetailsDropdown(props) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [flag, setFlag] = React.useState(false);
  const [subFlag, setSubFlag] = React.useState(false);
  const loading = open && options.length === 0;

  const { valueSubIndustry:type,
         isSelected,
         setValueSubIndustry,
         subindustryListName,
         subIndustryClear,
         subIndustryFlag,
    valueSector,
         valueSubIndustry
  } = props;

  React.useEffect(() => {
    if (subindustryListName) {
      setOptions(subindustryListName);
    }
  }, [subindustryListName])
  
  React.useEffect(() => {
  
    if (subIndustryClear) {
      setFlag(true)
    }
  },[props.subIndustryClear, props.subIndustryFlag, subIndustryClear])

  //return------------------------------------->
   const classes = useStyles();
  return (
    <Autocomplete
      // forcePopupIcon={false}
      classes={{
        popupIndicator: classes.popupIndicator,
      }}
      key={!subIndustryClear ? subIndustryFlag : valueSector}
      defaultValue={valueSubIndustry}
      disableClearable
      id="asynchronous-demo"
      disabled={isSelected}
      fullWidth
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={(event, value) => {
        setValueSubIndustry(value);
      }}
      getOptionSelected={(option, value) => option === value}
      getOptionLabel={(option) => option}
      options={options.length > 0 ? options : []}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Sub-industry"
          variant="standard"
          margin="normal"
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
        />
      )}
    />
  );
}
