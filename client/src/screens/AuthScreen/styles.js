import { makeStyles } from "@mui/styles";

export default makeStyles({
  paper: {
    marginTop: 30,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
  },
  root: {
    "& .MuiTextField-root": {
      margin: 8,
    },
  },
  avatar: {
    margin: 8,
    backgroundColor: "#f44336 !important",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: 24,
  },
  submit: {
    margin: "3px 0px 2px",
  },
  googleButton: {
    marginBottom: "16px !important",
    marginTop: "10px !important",
  },
});
