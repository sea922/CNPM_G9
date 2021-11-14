import React from "react";
import PropTypes from "prop-types";
import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Button, TextField, Typography, withStyles } from "@material-ui/core";
import styles from "./styles";
import FileUpload from "../../../../components/FileUpload/FileUpload";
import { updateUser } from "../../../../redux/actions/user";
EditUser.propTypes = {};

function EditUser(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { classes } = props;
  const selectedUser = useSelector((state) => state.userState.selectedUser);
  return (
    <div>
      <Formik
        initialValues={{
          name: selectedUser ? selectedUser.name : "",
          username: selectedUser ? selectedUser.username : "",
          email: selectedUser ? selectedUser.email : "",
          phone: selectedUser ? selectedUser.phone : "",
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
            console.log(values)
            dispatch(
              updateUser(
                {
                  name: values.name,
                  phone: values.phone,
                },
                selectedUser._id
              )
            );
          } else {
            dispatch(updateUser(values, selectedUser._id));
          }
        }}
      >
        {(props) => {
          return (
            <Form>
              <Typography variant="h4">{t("admin.users.detail")}</Typography>
              <div className={classes.field}>
                <TextField
                  error={props.errors.name && props.touched.name ? true : false}
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
                color="primary"
                variant="contained"
                type="submit"
                onSubmit={props.handleSubmit}
              >
                {t("admin.users.update")}
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default withStyles(styles)(EditUser);
