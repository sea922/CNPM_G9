import React, { useEffect } from "react";
import styles from "./styles";
import { withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import CustomField from "../../../components/CustomField/CustomField";
import CustomUpLoad from "../../../components/CustomUpload/CustomUpload";
import CustomCheckbox from "../../../components/CustomCheckbox/CustomCheckbox";
import { Button, Grid, IconButton, Typography } from "@material-ui/core";
import { ArrowBack as ArrowBackIcon } from "@material-ui/icons";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { registerUser } from "../../../redux/actions/auth";
import { useTranslation } from "react-i18next";
import { useDispatch, connect } from "react-redux";

const Register = ({ classes, history, setSubmitting, isAuthenticated }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
  }, [isAuthenticated]);

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container>
        <Grid className={classes.bgWrapper} item lg={5}>
          <div className={classes.bg} />
        </Grid>
        <Grid className={classes.content} item lg={7} xs={12}>
          <div className={classes.content}>
            <div className={classes.contentHeader}>
              <IconButton
                className={classes.backButton}
                onClick={() => {
                  history.goBack();
                }}
              >
                <ArrowBackIcon />
              </IconButton>
            </div>
            <div className={classes.contentBody}>
              <Formik
                initialValues={{
                  name: "",
                  username: "",
                  email: "",
                  phone: "",
                  password: "",
                  image: null,
                  policy: false,
                }}
                validationSchema={Yup.object().shape({
                  // Validate form field
                  name: Yup.string()
                    .required(t("validate.nameRq"))
                    .min(5, t("validate.nameMin")),
                  username: Yup.string()
                    .required(t("validate.usernameRq"))
                    .min(5, t("validate.usernameMin"))
                    .max(16, t("validate.usernameMax")),
                  email: Yup.string()
                    .email(t("validate.emailInvalid"))
                    .required(t("validate.emailRq")),
                  phone: Yup.string()
                    .matches(/^(0)+([0-9]{9})\b$/, t("validate.phoneInvalid"))
                    .required(t("validate.phoneRq")),
                  password: Yup.string()
                    .matches(
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                      t("validate.passwordDesc")
                    )
                    .required(t("validate.passwordRq"))
                    .min(8, t("validate.passwordMin"))
                    .max(32, t("validate.passwordMax")),
                  image: Yup.mixed().required(t("validate.avatarRq")),
                  policy: Yup.boolean().oneOf([true], t("validate.policyRq")),
                })}
                onSubmit={(values) => {
                  dispatch(registerUser(values));
                  setSubmitting(false);
                }}
              >
                {(propsForm) => (
                  <Form className={classes.form}>
                    <Typography className={classes.title} variant="h2">
                      {t("register.title")}
                    </Typography>
                    <Typography className={classes.subtitle} variant="body1">
                      {t("register.desc")}
                    </Typography>
                    <div className={classes.fields}>
                      <CustomField
                        className={classes.textField}
                        label={t("register.name")}
                        name="name"
                        variant="outlined"
                      />
                      <CustomField
                        className={classes.textField}
                        label={t("register.username")}
                        name="username"
                        variant="outlined"
                      />
                      <CustomField
                        className={classes.textField}
                        label={t("register.email")}
                        name="email"
                        variant="outlined"
                      />
                      <CustomField
                        className={classes.textField}
                        label={t("register.phone")}
                        name="phone"
                        variant="outlined"
                      />
                      <CustomField
                        className={classes.textField}
                        label={t("register.password")}
                        type="password"
                        name="password"
                        variant="outlined"
                      />
                      <CustomUpLoad
                        name="image"
                        className={classes.upload}
                        label="Upload Avatar"
                      />
                      <div className={classes.policy}>
                        <CustomCheckbox
                          className={classes.policyCheckbox}
                          color="primary"
                          name="policy"
                        />
                        <Typography
                          className={classes.policyText}
                          variant="body1"
                        >
                          {t("register.first-policy")} &nbsp;
                          <Link className={classes.policyUrl} to="#">
                            {t("register.second-policy")}
                          </Link>
                        </Typography>
                      </div>
                    </div>

                    <Button
                      className={classes.registerButton}
                      color="primary"
                      size="large"
                      variant="contained"
                      disabled={!propsForm.isValid || !propsForm.dirty}
                      type="submit"
                    >
                      {t("register.btn")}
                    </Button>

                    <Typography className={classes.login} variant="body1">
                      {t("register.question")}{" "}
                      <Link className={classes.loginUrl} to="/login">
                        {t("register.link")}
                      </Link>
                    </Typography>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.authState.isAuthenticated,
});

export default withStyles(styles)(connect(mapStateToProps)(Register));
