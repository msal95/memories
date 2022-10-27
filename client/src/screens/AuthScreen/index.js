import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { useLocation, useNavigate } from "react-router-dom";

// Local Imports
import { useDispatch } from "react-redux";
import InputField from "../../components/FormInput";
import { getAllMemories } from "../../reducers/posts";
import useStyle from "./styles";
import Navbar from "../../components/NavBar";
import Icon from "../../components/Icon";
import { googleAuth, signInUser, signupUser } from "../../reducers/auth";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function AuthScreen() {
  const [currentId, setCurrentId] = useState(null);
  const [userData, setUserData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(getAllMemories());
  }, [currentId, dispatch]);

  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({ clientId });
    });
  }, []);

  const classes = useStyle();

  const clientId =
    "102268787629-uaar6elgjdbqlp3c3312rf999229gpsp.apps.googleusercontent.com";

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const switchMode = () => {
    setIsSignup((prevState) => !prevState);
    setShowPassword(false);
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch(googleAuth({ result, token }));
      navigate("/");
    } catch (error) {
      console.log("Auth Screen Error Login", error);
    }
  };

  const googleFailure = (error) => {
    console.log("Google Logn Failed. Try Agin Later", error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signupUser({ userData }));
      navigate("/");
    } else {
      dispatch(signInUser({ userData }));
      navigate("/");
    }
  };

  return (
    <Container maxWidth="lg">
      <Navbar />
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5">
            {isSignup ? "Sign Up" : "Sign In"}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {isSignup && (
                <>
                  <InputField
                    name="firstName"
                    label="First Name"
                    value={userData.firstName}
                    onChange={handleInputChange}
                    autoFocus
                    half
                    type="text"
                  />
                  <InputField
                    name="lastName"
                    label="Last Name"
                    value={userData.lastName}
                    onChange={handleInputChange}
                    autoFocus
                    half
                    type="text"
                  />
                </>
              )}
              <InputField
                name="email"
                type="email"
                label="Email"
                onChange={handleInputChange}
              />
              <InputField
                name="password"
                type={showPassword ? "text" : "password"}
                label="Password"
                onChange={handleInputChange}
                handleShowPassword={handleShowPassword}
              />
              {isSignup && (
                <InputField
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  label="Confirm Password"
                  onChange={handleInputChange}
                  handleShowPassword={handleShowPassword}
                />
              )}
            </Grid>

            <Button type="submit" variant="contained" fullWidth color="primary">
              {isSignup ? "SignUp" : "SignIn"}
            </Button>
            <GoogleLogin
              clientId={clientId}
              render={(renderProps) => (
                <Button
                  className={classes.googleButton}
                  color="primary"
                  fullWidth
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={<Icon />}
                  variant="contained"
                >
                  Google SignIn
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
            />
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignup
                    ? "Already have an account? SignIn"
                    : "Don't have an account? SignUp"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Container>
  );
}
