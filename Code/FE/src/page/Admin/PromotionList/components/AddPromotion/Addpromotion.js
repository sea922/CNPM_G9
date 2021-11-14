import React from "react";
import PropTypes from "prop-types";
import { Form, Formik } from "formik";
import styles from "./styles";
import {
  Button,
  Divider,
  MenuItem,
  TextField,
  withStyles,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { useDispatch, useSelector } from "react-redux";
import FileUpload from "../../../../../components/FileUpload/FileUpload";
import {
  addPromotion,
  removePromotion,
} from "../../../../../redux/actions/promotion";
Addpromotion.propTypes = {};

function Addpromotion(props) {
  const { classes } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const cinemas = useSelector((state) => state.cinemaState.cinemas);
  const selectedPromotion = useSelector(
    (state) => state.promotionState.selectedPromotion
  );
  const handleDeletePromotion = (id) => {
    if (window.confirm(t("admin.promotion.delete"))) {
      dispatch(removePromotion(id));
    }
  };
  return (
    <div>
      <Formik
        enableReinitialize={true}
        initialValues={{
          title: selectedPromotion ? selectedPromotion.title : "",
          discount: selectedPromotion ? selectedPromotion.discount : "",
          description: selectedPromotion ? selectedPromotion.description : "",
          startDate: selectedPromotion
            ? selectedPromotion.startDate
            : new Date(),
          endDate: selectedPromotion ? selectedPromotion.endDate : new Date(),
          cinemaId: selectedPromotion ? selectedPromotion.cinemaId._id : "",
          image: null,
          code: selectedPromotion ? selectedPromotion.code : "",
        }}
        validationSchema={Yup.object().shape({
          title: Yup.string().required(`${t("admin.promotion.requiredTitle")}`),
          discount: Yup.string().required(
            `${t("admin.promotion.requiredDiscount")}`
          ),
          description: Yup.string().required(t("admin.promotion.requiredDesc")),
          code: Yup.string().required(t("admin.promotion.requiredCode")),
        })}
        onSubmit={(values) => {
          const { image, ...rest } = values;
          const promotion = { ...rest };
          dispatch(addPromotion(image, promotion));
        }}
      >
        {(props) => {
          return (
            <Form>
              <div className={classes.field}>
                <TextField
                  className={classes.textField}
                  error={
                    props.errors.title && props.touched.title ? true : false
                  }
                  helperText={
                    props.errors.title && props.touched.title
                      ? props.errors.title
                      : ""
                  }
                  label={t("admin.promotion.title")}
                  margin="dense"
                  name="title"
                  required
                  value={props.values.title}
                  variant="outlined"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                />

                <TextField
                  fullWidth
                  type="number"
                  error={
                    props.errors.discount && props.touched.discount
                      ? true
                      : false
                  }
                  helperText={
                    props.errors.discount && props.touched.discount
                      ? props.errors.discount
                      : ""
                  }
                  className={classes.textField}
                  label={t("admin.promotion.discount")}
                  name="discount"
                  margin="dense"
                  required
                  variant="outlined"
                  value={props.values.discount}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                />
              </div>
              <div className={classes.field}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  error={
                    props.errors.description && props.touched.description
                      ? true
                      : false
                  }
                  helperText={
                    props.errors.description && props.touched.description
                      ? props.errors.description
                      : ""
                  }
                  className={classes.textField}
                  label={t("admin.promotion.description")}
                  name="description"
                  margin="dense"
                  required
                  variant="outlined"
                  value={props.values.description}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                />
              </div>
              <div className={classes.field}>
                <TextField
                  fullWidth
                  error={props.errors.code && props.touched.code ? true : false}
                  helperText={
                    props.errors.code && props.touched.code
                      ? props.errors.code
                      : ""
                  }
                  className={classes.textField}
                  label={t("admin.promotion.code")}
                  name="code"
                  margin="dense"
                  required
                  variant="outlined"
                  value={props.values.code}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                />
                <TextField
                  fullWidth
                  select
                  className={classes.textField}
                  label={t("admin.showtimes.cinema")}
                  margin="dense"
                  name="cinemaId"
                  required
                  value={props.values.cinemaId}
                  variant="outlined"
                  onChange={(event) =>
                    props.setFieldValue("cinemaId", event.target.value)
                  }
                >
                  {cinemas.map((cinema) => (
                    <MenuItem key={cinema._id} value={cinema._id}>
                      {cinema.name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className={classes.field}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <KeyboardDatePicker
                    className={classes.textField}
                    inputVariant="outlined"
                    margin="normal"
                    name="startDate"
                    id="start-date"
                    label={t("admin.showtimes.startDate")}
                    value={props.values.startDate}
                    onChange={(date) =>
                      props.setFieldValue("startDate", date._d)
                    }
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />

                  <KeyboardDatePicker
                    className={classes.textField}
                    inputVariant="outlined"
                    margin="normal"
                    id="end-date"
                    label={t("admin.showtimes.endDate")}
                    name="endDate"
                    value={props.values.endDate}
                    onChange={(date) => props.setFieldValue("endDate", date._d)}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </div>
              <div className={classes.field}>
                <FileUpload
                  className={classes.textField}
                  file={props.values.image}
                  onUpload={(event) => {
                    const file = event.target.files[0];
                    props.setFieldValue("image", file);
                  }}
                />
              </div>
              <Divider></Divider>
              <div className={classes.field}>
                {selectedPromotion ? (
                  <Button
                    onClick={() => handleDeletePromotion(selectedPromotion._id)}
                    variant="contained"
                    color="secondary"
                  >
                    {t("admin.promotion.delete")}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    disabled={!props.isValid}
                    type="submit"
                    color="primary"
                    onSubmit={props.handleSubmit}
                  >
                    {t("admin.promotion.add")}
                  </Button>
                )}
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default withStyles(styles)(Addpromotion);
