import React, { useEffect } from "react";
import { makeStyles, Grid, Typography, Button } from "@material-ui/core";
import styles from "./styles";
import { withStyles } from "@material-ui/core";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import CustomField from "../../../components/CustomField/CustomField";
import CustomUpLoad from "../../../components/CustomUpload/CustomUpload";
import { useDispatch } from "react-redux";
import { createContact } from "../../../redux/actions/contact";
const ContactPage = ({ classes, setSubmitting, history }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  return (
    <Grid
      container
      xs={12}
      direction="column"
      alignItems="center"
      justify="center"
      spacing={2}
    >
      <Formik
        initialValues={{
          name: "",
          email: "",
          phone: "",
          image: null,
          message: "",
        }}
        validationSchema={Yup.object().shape({
          // Validate form field
          name: Yup.string()
            .required(t("validate.nameRq"))
            .min(5, t("validate.nameMin")),
          message: Yup.string().required(t("validate.messageRq")),
          email: Yup.string()
            .email(t("validate.emailInvalid"))
            .required(t("validate.emailRq")),
          phone: Yup.string().matches(
            /^(0)+([0-9]{9})\b$/,
            t("validate.phoneInvalid")
          ),
        })}
        onSubmit={(values) => {
          dispatch(createContact(values));
          console.log(history);
          return history.push("/");
        }}
      >
        {(propsForm) => (
          <Form className={classes.form}>
            <Typography className={classes.title} variant="h2">
              {t("contact.title")}
            </Typography>
            <Typography className={classes.subtitle} variant="body1">
              {t("contact.desc")}
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
                label={t("contact.message")}
                name="message"
                variant="outlined"
                multiline
                rows={4}
                rowsMax={7}
                placeholder={t("contact.hint")}
              />
              <CustomUpLoad
                name="image"
                className={classes.upload}
                label="Upload Photo"
              />
            </div>

            <Button
              className={classes.registerButton}
              color="primary"
              size="large"
              variant="contained"
              disabled={!propsForm.isValid || !propsForm.dirty}
              type="submit"
            >
              {t("contact.btn")}
            </Button>
          </Form>
        )}
      </Formik>
    </Grid>
  );
};
export default withStyles(styles)(ContactPage);
