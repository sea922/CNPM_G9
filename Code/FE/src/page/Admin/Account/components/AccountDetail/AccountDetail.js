import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { getProfile } from "../../../../../redux/actions/account";
import { updateUser } from "../../../../../redux/actions/user";

function AccountDetail(props) {
  const { t } = useTranslation();
  const { classes } = props;
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.profileState.profile);

  return (
    <Card>
      <Formik
        enableReinitialize={true}
        initialValues={{
          name: profile.name ? profile.name : "",
          username: profile.username ? profile.username : "",
          email: profile.email ? profile.email : "",
          phone: profile.phone ? profile.phone : "",
          password: "",
        }}
        validationSchema={Yup.object().shape({
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
            .min(8, t("validate.passwordMin"))
            .max(32, t("validate.passwordMax")),
        })}
        onSubmit={(values) => {
          if (values.password === "") {
            dispatch(
              updateUser(
                {
                  name: values.name,
                  phone: values.phone,
                },
                profile._id
              )
            );
          } else {
            dispatch(updateUser(values, profile._id));
          }
        }}
      >
        {(props) => {
          return (
            <CardContent>
              <Form>
                <Typography variant="h4">
                  {t("admin.account.cardName")}
                </Typography>
                <div className={classes.field}>
                  <TextField
                    error={
                      props.errors.name && props.touched.name ? true : false
                    }
                    helperText={
                      props.errors.name && props.touched.name
                        ? props.errors.name
                        : null
                    }
                    className={classes.textField}
                    label={t("register.name")}
                    margin="dense"
                    name="name"
                    required
                    value={props.values.name}
                    variant="outlined"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  />
                </div>
                <div className={classes.field}>
                  <TextField
                    disabled
                    className={classes.textField}
                    label={t("register.username")}
                    margin="dense"
                    name="username"
                    value={props.values.username}
                    variant="outlined"
                  />
                </div>
                <div className={classes.field}>
                  <TextField
                    disabled
                    className={classes.textField}
                    label={t("register.email")}
                    margin="dense"
                    name="email"
                    value={props.values.email}
                    variant="outlined"
                  />
                </div>
                <div className={classes.field}>
                  <TextField
                    error={
                      props.errors.phone && props.touched.phone ? true : false
                    }
                    helperText={
                      props.errors.phone && props.touched.phone
                        ? props.errors.phone
                        : null
                    }
                    className={classes.textField}
                    label={t("register.phone")}
                    margin="dense"
                    name="phone"
                    value={props.values.phone}
                    variant="outlined"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  />
                </div>
                <div className={classes.field}>
                  <TextField
                    error={
                      props.errors.password && props.touched.password
                        ? true
                        : false
                    }
                    helperText={
                      props.errors.password && props.touched.password
                        ? props.errors.password
                        : null
                    }
                    className={classes.textField}
                    label={t("register.password")}
                    margin="dense"
                    name="password"
                    value={props.values.password}
                    variant="outlined"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  />
                </div>
                <Button
                  className={classes.buttonFooter}
                  disabled={!props.dirty}
                  color="primary"
                  variant="contained"
                  type="submit"
                  onSubmit={props.handleSubmit}
                >
                  {t("admin.account.update")}
                </Button>
              </Form>
            </CardContent>
          );
        }}
      </Formik>
    </Card>
  );
}

export default withStyles(styles)(AccountDetail);
