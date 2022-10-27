import { TextField } from "@mui/material";
import React from "react";
import "./styles.css";

const InputFieldComponent = (props) => {
  const { name, value, label, onChange, multiline = false } = props;
  return (
    <TextField
      name={name}
      variant="outlined"
      label={label}
      fullWidth
      value={value}
      onChange={onChange}
      className="inputField"
      multiline={multiline}
    />
  );
};

export default InputFieldComponent;
