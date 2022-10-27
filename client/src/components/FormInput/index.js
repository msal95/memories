import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import React from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// import "./styles.css";

const InputField = (props) => {
  const {
    name,
    value,
    label,
    onChange,
    multiline = false,
    type,
    half,
    handleShowPassword,
    autoFocus,
  } = props;

  const inputProps = {};

  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        variant="outlined"
        label={label}
        fullWidth
        required
        autoFocus={autoFocus}
        value={value}
        type={type}
        onChange={onChange}
        className="inputField"
        multiline={multiline}
        InputProps={
          name === "password"
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                      {type === "password" ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : null
        }
      />
    </Grid>
  );
};

export default InputField;
