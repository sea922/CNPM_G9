import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Button, Typography, withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import CustomField from "../../../../components/CustomField/CustomField";
import { useTranslation } from "react-i18next";
import {
  login,
  facebookLogin,
  googleLogin,
} from "../../../../redux/actions/auth";
import styles from "./styles";

function LoginForm(props) {
  const {
    isAuthenticated,
    user,
    redirect,
    classes,
    history,
    resetForm,
    setSubmitting,
    location,
  } = props;
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const target = location.state ? location.state.from.pathname : "/";
  useEffect(() => {
    if (isAuthenticated && redirect) {
      if (user && user.role === "superadmin")
        return history.push("/admin/dashboard");
      return history.push(target);
    }
  }, [isAuthenticated, user, redirect]);

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string().required(t("validate.usernameRq")),
        password: Yup.string().required(t("validate.passwordRq")),
      })}
      onSubmit={(values) => {
        dispatch(login(values));
        resetForm({});
        setSubmitting(false);
      }}
    >
      {(propsForm) => (
        <Form className={classes.form}>
          <Typography className={classes.title} variant="h2">
            {t("login.sign-in")}
          </Typography>

          {/* <div className={classes.socialLogin}>
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              // onSuccess={dispatch(googleLogin)}
              // onFailure={dispatch(googleLogin)}
              cookiePolicy={"single_host_origin"}
              render={(renderProps) => (
                <Button
                  onClick={renderProps.onClick}
                  fullWidth
                  variant="contained"
                  style={{
                    borderRadius: 0,
                    background: "#fff",
                    color: "#de5246",
                    marginBottom: 10,
                    height: 60,
                    fontSize: "calc(.27548vw + 12.71074px)",
                    fontWeight: 700,
                  }}
                >
                  Login With Google
                </Button>
              )}
            />
            <FacebookLogin
              buttonStyle={{ width: "100%", height: 60 }}
              appId="707524936551493"
              fields="name,email,picture"
              callback={dispatch(facebookLogin)}
            />
          </div> */}

          <div className={classes.fields}>
            <CustomField
              className={classes.textField}
              label={t("register.username")}
              name="username"
              type="text"
              variant="outlined"
            />
            <CustomField
              className={classes.textField}
              label={t("register.password")}
              name="password"
              type="password"
              variant="outlined"
            />
          </div>

          <Button
            className={classes.loginButton}
            color="primary"
            size="large"
            variant="contained"
            type="submit"
            disabled={!propsForm.isValid || !propsForm.dirty}
          >
            {t("login.login")}
          </Button>
          <Typography className={classes.register} variant="body1">
            {t("login.haveAccount")}
            <Link className={classes.registerUrl} to="/register">
              {t("login.register")}
            </Link>
          </Typography>
        </Form>
      )}
    </Formik>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.authState.isAuthenticated,
  user: state.authState.user,
});
export default withStyles(styles)(connect(mapStateToProps)(LoginForm));
